import fs from 'fs';
import path from 'path';

// Resolve the repository root regardless of the jest working directory.
// Candidates cover `npm test` run from the project root and CI checkouts.
function resolveFromRepo(relative) {
  const candidates = [
    path.join(process.cwd(), relative),
    path.join(process.cwd(), 'my-travel-app', 'my-app', relative),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return candidates[0];
}

function readRepo(relative) {
  return fs.readFileSync(resolveFromRepo(relative), 'utf8');
}

function readSrcTree() {
  const srcDir = path.dirname(resolveFromRepo('src/index.js'));
  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir)) {
      const full = path.join(dir, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) walk(full);
      else files.push(full);
    }
  };
  walk(srcDir);
  return files;
}

describe('Supabase schema / RLS policies', () => {
  const schema = readRepo('supabase-schema.sql');

  test('enables RLS on the itineraries table', () => {
    expect(schema).toMatch(/alter table public\.itineraries enable row level security/i);
  });

  test('does NOT allow anonymous deletion via USING (true)', () => {
    // Split statements and locate the DELETE policy body.
    const deleteBlock = schema.slice(schema.indexOf('for delete'), schema.indexOf('-- NOTE'));
    expect(deleteBlock).not.toMatch(/using \(true\)/i);
    expect(deleteBlock).not.toMatch(/using\s*\(\s*true\s*\)/i);
  });

  test('DELETE policy is ownership-gated on delete_token', () => {
    const deleteBlock = schema.slice(schema.indexOf('for delete'), schema.indexOf('-- NOTE'));
    expect(deleteBlock).toMatch(/delete_token/);
    expect(deleteBlock).toMatch(/request\.headers/);
    expect(deleteBlock).toMatch(/x-delete-token/);
  });

  test('introduces a delete_token column', () => {
    expect(schema).toMatch(/delete_token text/);
    expect(schema).toMatch(/add column if not exists delete_token text/);
  });

  test('keeps a check(true) INSERT policy only for the documented public alias', () => {
    // Public insert is intentional (anonymous share creation). Flag if it ever
    // expands to UPDATE or DELETE so a reviewer notices the scope change.
    expect(schema).toMatch(/for insert\s+with check \(true\)/i);
    expect(schema).not.toMatch(/for update/i);
  });
});

describe('Serverless API functions enforce validation & least privilege', () => {
  test('get-itinerary validates method, UUID, and never selects delete_token', () => {
    const src = readRepo('api/get-itinerary.js');
    expect(src).toMatch(/req\.method !== 'GET'/);
    expect(src).toMatch(/isValidUuid/);
    expect(src).toMatch(/PUBLIC_ITINERARY_COLUMNS/);
    // The select must not use "*" and must not expose the delete token.
    const selectLine = src.split('\n').find((l) => l.includes('select='));
    expect(selectLine).not.toMatch(/\*\s*&/);
    expect(selectLine).not.toMatch(/delete_token/);
  });

  test('list-itineraries uses a sanitized limit and explicit columns', () => {
    const src = readRepo('api/list-itineraries.js');
    expect(src).toMatch(/sanitizeLimit/);
    const selectLine = src.split('\n').find((l) => l.includes('select='));
    expect(selectLine).not.toMatch(/select=\*/);
    expect(selectLine).not.toMatch(/delete_token/);
  });

  test('delete-itinerary requires method DELETE, a valid UUID, and a delete token', () => {
    const src = readRepo('api/delete-itinerary.js');
    expect(src).toMatch(/req\.method !== 'DELETE'/);
    expect(src).toMatch(/isValidUuid/);
    expect(src).toMatch(/x-delete-token/);
    expect(src).toMatch(/delete_token=eq\./);
  });

  test('save-itinerary sanitizes the payload and generates the delete token server-side', () => {
    const src = readRepo('api/save-itinerary.js');
    expect(src).toMatch(/sanitizeItineraryPayload/);
    expect(src).toMatch(/createDeleteToken/);
    expect(src).toMatch(/req\.method !== 'POST'/);
  });
});

describe('Frontend does not use unsafe rendering patterns', () => {
  test('no dangerouslySetInnerHTML / raw innerHTML usage in src', () => {
    const offenders = [];
    for (const file of readSrcTree()) {
      if (file.includes('.test.')) continue; // skip test files (self-referencing)
      const content = fs.readFileSync(file, 'utf8');
      if (/dangerouslySetInnerHTML/.test(content) || /\b(document\.getElementById|doc\.querySelector).*\.innerHTML\s*=/.test(content)) {
        offenders.push(path.relative(process.cwd(), file));
      }
    }
    expect(offenders).toEqual([]);
  });

  test('delete requests carry the x-delete-token header', () => {
    const src = readRepo('src/supabaseClient.js');
    expect(src).toMatch(/x-delete-token/);
    expect(src).toMatch(/deleteItinerary\(id, deleteToken\)/);
  });

  test('env files are excluded from git tracking', () => {
    const ignore = readRepo('.gitignore');
    expect(ignore).toMatch(/^\.env/m);
    expect(ignore).not.toMatch(/!\.env$/m);
    expect(ignore).toMatch(/!\.env\.example/);
  });
});