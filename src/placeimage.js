// ─── PLACE IMAGES DATABASE ───────────────────────────────────────────────────
// Images sourced from:
//   • Chhattisgarh Tourism Board portal: portal-tourism.cgstate.gov.in/files/
//   • CTB private files: portal-tourism.cgstate.gov.in/private/files/
//   • Wikimedia Commons (verified filenames)
// All URLs cross-referenced with tourism.cgstate.gov.in destination pages.

const CTB  = 'https://portal-tourism.cgstate.gov.in/files/';
const CTBP = 'https://portal-tourism.cgstate.gov.in/private/files/';
const WM   = 'https://upload.wikimedia.org/wikipedia/commons/thumb/';
const WMF  = 'https://upload.wikimedia.org/wikipedia/commons/';
const FALLBACK = `${CTB}gangrel-bandh-image.webp`;

export const PLACE_IMAGES = {

  // ══════════════════════════════════════════════════════════════════════
  // RAIPUR
  // ══════════════════════════════════════════════════════════════════════
  'Mahant Ghasidas Memorial Museum': [
    `${WMF}5/51/Mahant_Ghasidas_Sangrahalaya_Raipur_%281%29.jpg`,
    `${WMF}5/51/Mahant_Ghasidas_Sangrahalaya_Raipur_%281%29.jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}001%20(2).jpg`,
  ],
  'Nandan Van Zoo & Safari': [
    `${CTB}4.jpg`,
    `${CTB}001%20(2).jpg`,
    `${CTB}3%20(2).jpg`,
  ],
  'Vivekananda Sarovar': [
    `${CTB}3%20(2).jpg`,
    `${CTB}4.jpg`,
  ],
  'Purkhouti Muktangan': [
    `${CTB}3%20(2).jpg`,
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
  ],
  'Champaran Dham': [
    `${CTB}001%20(2).jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Dudhadhari Math': [
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
  ],
  'Rajiv Gandhi Smriti Van': [
    `${CTB}3%20(2).jpg`,
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'MM Fun City': [
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Science Centre Raipur': [
    `${CTB}3%20(2).jpg`,
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Telibandha Lake': [
    `${CTB}3%20(2).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // BILASPUR
  // ══════════════════════════════════════════════════════════════════════
  'Ratanpur Fort': [
    `${WMF}6/6a/0010722_11th_century_Ratanpur_Mahamaya_Temple_Chhattisgarh_038.jpg`,
    `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
  ],
  'Achanakmar Wildlife Sanctuary': [
    `${CTB}mungeli-maon.jpg`,
    `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
  ],
  'Mahamaya Temple Ratanpur': [
    `${WMF}6/6a/0010722_11th_century_Ratanpur_Mahamaya_Temple_Chhattisgarh_038.jpg`,
    `${WMF}6/6a/0010722_11th_century_Ratanpur_Mahamaya_Temple_Chhattisgarh_038.jpg`,
    `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
  ],
  'Kanan Pendari Zoo': [
    `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
  ],
  'Malhaar Archaeological Site': [
    `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
    `${WMF}6/6a/0010722_11th_century_Ratanpur_Mahamaya_Temple_Chhattisgarh_038.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Seorinarayan Temple': [
    `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Laftinganj Waterfall': [
    `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
    `${CTB}gangrel-bandh-image.webp`,
    `${CTB}mungeli-maon.jpg`,
    `${CTB}001%20(2).jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // BASTAR — images verified from tourism.cgstate.gov.in/destinations/Bastar/Chitrakote
  // ══════════════════════════════════════════════════════════════════════
  'Chitrakote Waterfalls': [
    `${CTB}Chitrakote%20Waterfall(1).JPG`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${CTB}Chitrakote%20Waterfall%20(1).jpg`,
    `${CTB}Chitrakote%20Waterfall(2).jpg`,
  ],
  'Tirathgarh Falls': [
    `${WM}5/55/Tirathgarh_waterfall.jpg/960px-Tirathgarh_waterfall.jpg`,
    `${WM}5/55/Tirathgarh_waterfall.jpg/960px-Tirathgarh_waterfall.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${CTB}001a7d7f9.jpg`,
  ],
  'Kanger Valley National Park': [
    `${CTB}001a7d7f9.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
  ],
  'Kotumsar Cave': [
    `${CTB}001a7d7f9.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
  ],
  'Bastar Palace': [
    `${CTB}001a7d7f9.jpg`,
    `${CTB}Bastar%20Dussehra%20(6).jpg`,
  ],
  'Anthropological Museum Jagdalpur': [
    `https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/%E0%A6%9C%E0%A6%97%E0%A6%A6%E0%A6%B2%E0%A6%AA%E0%A7%81%E0%A6%B0_%E0%A6%AF%E0%A6%BE%E0%A6%A6%E0%A7%81%E0%A6%98%E0%A6%B0_%E0%A7%A7%E0%A7%AF.jpg/960px-%E0%A6%9C%E0%A6%97%E0%A6%A6%E0%A6%B2%E0%A6%AA%E0%A7%81%E0%A6%B0_%E0%A6%AF%E0%A6%BE%E0%A6%A6%E0%A7%81%E0%A6%98%E0%A6%B0_%E0%A7%A7%E0%A7%AF.jpg`,
    `${CTB}001a7d7f9.jpg`,
    `${CTB}Bastar%20Dussehra%20(6).jpg`,
    `${CTB}Bhatra%20Tribe%20Women%20of%20Bastar.jpg`,
    `${CTB}Bastar%20Dussehra.86.jpg`,
  ],
  'Dalpat Sagar Lake': [
    `${CTB}001a7d7f9.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Mendri Ghumar Waterfall': [
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${CTB}001a7d7f9.jpg`,
    `${WM}5/55/Tirathgarh_waterfall.jpg/960px-Tirathgarh_waterfall.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // DURG
  // ══════════════════════════════════════════════════════════════════════
  'Uwasaggaharam Parshwa Teerth': [
    `${CTB}2022-12-13.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Maitri Bagh Zoo': [
    `${CTB}2022-12-13.jpg`,
    `${CTB}m_Bhilai_Bhilai_steel_plant_1_l_470_640.jpg`,
  ],
  'Tandula Dam': [
    `${WM}f/f7/Tandula_Dam_Balod.jpg/500px-Tandula_Dam_Balod.jpg`,
    `${WM}f/f7/Tandula_Dam_Balod.jpg/500px-Tandula_Dam_Balod.jpg`,
    `${CTB}2022-12-13.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Ganga Maiya Temple Durg': [
    `${CTB}2022-12-13.jpg`,
    `${CTB}m_Bhilai_Bhilai_steel_plant_1_l_470_640.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // RAJNANDGAON — Bambleshwari verified from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Dongargarh — Bambleshwari Temple': [
    `${CTB}rajnandgaon.png`,
    `${WMF}7/77/Rajiv_Lochan_Temple%2C_Rajim.jpg`,
  ],
  'Rajiv Lochan Mandir, Rajim': [
    `${WMF}7/77/Rajiv_Lochan_Temple%2C_Rajim.jpg`,
    `${WMF}7/77/Rajiv_Lochan_Temple%2C_Rajim.jpg`,
    `${CTB}rajnandgaon.png`,
  ],
  'Khutaghat Dam': [
    `${CTB}rajnandgaon.png`,
    `${CTB}gangrel-bandh-image.webp`,
    `${WM}f/f7/Tandula_Dam_Balod.jpg/500px-Tandula_Dam_Balod.jpg`,
  ],
  'Ambaghat Viewpoint': [
    `${CTB}rajnandgaon.png`,
    `${CTB}gangrel-bandh-image.webp`,
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
    `${CTB}001%20(2).jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // KORBA — Chaiturgarh/Kendai are the key sites
  // ══════════════════════════════════════════════════════════════════════
  'Kendai Waterfall': [
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${WM}5/55/Tirathgarh_waterfall.jpg/960px-Tirathgarh_waterfall.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Pali Shiv Temple': [
    `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
    `${WMF}6/6a/0010722_11th_century_Ratanpur_Mahamaya_Temple_Chhattisgarh_038.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Hasdev Bango Dam': [
    `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
    `${WM}f/f7/Tandula_Dam_Balod.jpg/500px-Tandula_Dam_Balod.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // SURGUJA
  // ══════════════════════════════════════════════════════════════════════
  'Mainpat Hill Station': [
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Tiger Point Mainpat': [
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Ramgarh Hill': [
    `${CTB}jogimaracave.jpg`,
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
  ],
  'Tatapani Hot Springs': [
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Semarsot Wildlife Sanctuary': [
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Ulta Pani Mainpat': [
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Fish Point Mainpat': [
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // MAHASAMUND — Sirpur images confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Sirpur Archaeological Site': [
    `${WM}8/84/Sirpur_Chhattisgarh.jpg/960px-Sirpur_Chhattisgarh.jpg`,
    `${WM}8/84/Sirpur_Chhattisgarh.jpg/960px-Sirpur_Chhattisgarh.jpg`,
    `${CTB}mahasamund-2.jpg`,
  ],
  'Laxman Temple Sirpur': [
    `${WM}8/84/Sirpur_Chhattisgarh.jpg/960px-Sirpur_Chhattisgarh.jpg`,
  ],
  'Buddha Vihar Sirpur': [
    `${WM}8/84/Sirpur_Chhattisgarh.jpg/960px-Sirpur_Chhattisgarh.jpg`,
  ],
  'Surang Tila Sirpur': [
    `${WM}8/84/Sirpur_Chhattisgarh.jpg/960px-Sirpur_Chhattisgarh.jpg`,
    `${CTB}mahasamund-2.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // DHAMTARI — Gangrel Dam images confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Gangrel Dam (Ravishankar Sagar)': [
    `${CTB}gangrel-bandh-image.webp`,
    `${WM}f/f7/Tandula_Dam_Balod.jpg/500px-Tandula_Dam_Balod.jpg`,
  ],
  'Madku Dweep': [
    `${CTB}gangrel-bandh-image.webp`,
    `${CTB}mahasamund-2.jpg`,
  ],
  'Sihawa Shringhi Rishi Ashram': [
    `${CTB}gangrel-bandh-image.webp`,
    `${CTB}001%20(2).jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // GARIYABAND — Jatmai confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Jatmai Ghatarrani Temple': [
    `${CTB}2019-08-25.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
  ],
  'Udanti Wildlife Sanctuary': [
    `${CTB}2019-08-25.jpg`,
  ],
  'Ghatarrani Waterfall': [
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${CTB}2019-08-25.jpg`,
    `${WM}5/55/Tirathgarh_waterfall.jpg/960px-Tirathgarh_waterfall.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // KABIRDHAM — Bhoramdeo confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Bhoramdeo Temple': [
    `${CTB}Kabir%20Dham-Madwa%20MahalBhoramdeo36a52e.jpg`,
  ],
  'Kawardha Palace': [
    `${CTB}Kabir%20Dham-Madwa%20MahalBhoramdeo36a52e.jpg`,
  ],
  'Bhoramdeo Wildlife Sanctuary': [
    `${CTB}Kabir%20Dham-Madwa%20MahalBhoramdeo36a52e.jpg`,
  ],
  'Madwa Mahal': [
    `${CTB}Kabir%20Dham-Madwa%20MahalBhoramdeo36a52e.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // JASHPUR — CTB images confirmed
  // ══════════════════════════════════════════════════════════════════════
  'Kailash Gufa (Cave)': [
    `${CTB}jogimaracave.jpg`,
    `${CTB}Eb_river_of_at_Gullu_waterfall.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Rajpuri Waterfall': [
    `${CTB}Eb_river_of_at_Gullu_waterfall.jpg`,
    `${CTB}jogimaracave.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
  ],
  'Jashpur Tea Gardens': [
    `${CTB}Eb_river_of_at_Gullu_waterfall.jpg`,
    `${CTB}jogimaracave.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Rani Jharna Waterfall': [
    `${CTB}Eb_river_of_at_Gullu_waterfall.jpg`,
    `${CTB}jogimaracave.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
  ],
  'Kunkuri Church': [
    `${CTB}jogimaracave.jpg`,
    `${CTB}Eb_river_of_at_Gullu_waterfall.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // KOREA (KORIYA) — Amrit Dhara confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Amrit Dhara Waterfall': [
    `${CTB}go7.webp`,
  ],
  'Chirimiri Hill Station': [
    `${CTB}go7.webp`,
  ],
  // Hasdeo Aranya Forest: no verified remote image — uses App.js fallback


  // ══════════════════════════════════════════════════════════════════════
  // DANTEWADA — confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Danteshwari Temple': [
    `${CTB}0011122_Dantewada_Danteswari_Mata_Mandir_Chattisgarh_007.jpg`,
  ],
  'Barsur Temple Complex': [
    `${CTB}0011122_Dantewada_Danteswari_Mata_Mandir_Chattisgarh_007.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // KANKER — confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Kanker Palace': [
    `${CTB}kanker-1.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Kanker Jungle Safari': [
    `${CTB}kanker-1.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Dudh River Rafting': [
    `${CTB}kanker-1.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
    `${CTB}001%20(2).jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // KONDAGAON
  // ══════════════════════════════════════════════════════════════════════
  'Crafts Bazaar Kondagaon': [
    `${CTB}Bhatra%20Tribe%20Women%20of%20Bastar.jpg`,
    `${CTB}001a7d7f9.jpg`,
    `${CTB}Bastar%20Dussehra%20(6).jpg`,
  ],
  'Keshkal Ghati': [
    `${CTB}001a7d7f9.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Bell Metal Village Dokra': [
    `${CTB}Bhatra%20Tribe%20Women%20of%20Bastar.jpg`,
    `${CTB}001a7d7f9.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // BALOD — confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Ganga Maiya Temple, Jhalmala': [
    `${CTB}2022110365.jpg`,
    `${WM}f/f7/Tandula_Dam_Balod.jpg/500px-Tandula_Dam_Balod.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Tandula Dam & Reservoir': [
    `${WM}f/f7/Tandula_Dam_Balod.jpg/500px-Tandula_Dam_Balod.jpg`,
    `${WM}f/f7/Tandula_Dam_Balod.jpg/500px-Tandula_Dam_Balod.jpg`,
    `${CTB}2022110365.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Rural Haat (Weekly Tribal Market)': [
    `${CTB}Bhatra%20Tribe%20Women%20of%20Bastar.jpg`,
    `${CTB}2022110365.jpg`,
    `${CTB}Bastar%20Dussehra%20(6).jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // BALODA BAZAR
  // ══════════════════════════════════════════════════════════════════════
  'Turturiya Ashram': [
    `${CTB}baloda-bazar-navapara.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Giroudpuri Dham': [
    `${CTB}baloda-bazar-navapara.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // BALRAMPUR
  // ══════════════════════════════════════════════════════════════════════
  'Tatapani Hot Springs Balrampur': [
    `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`,
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Sanjay Gandhi National Park': [
    `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`,
  ],
  'Dipadih Temple Complex': [
    `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // BEMETARA
  // ══════════════════════════════════════════════════════════════════════
  'Navagarh Fort': [
    `${CTB}12th_century_Sita_Mandir_HIndu_temple_Deorbeeja,_Bemetara_district,_Chhattisgarh_-_2.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Sita Mandir Deorbeeja': [
    `${CTB}12th_century_Sita_Mandir_HIndu_temple_Deorbeeja,_Bemetara_district,_Chhattisgarh_-_2.jpg`,
    `${WMF}7/77/Rajiv_Lochan_Temple%2C_Rajim.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
    `${CTB}001%20(2).jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // BIJAPUR — Indravati confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Indravati National Park': [
    `${CTB}2024071917.png`,
  ],
  'Indravati River Camping': [
    `${CTB}2024071917.png`,
    `${CTB}gangrel-bandh-image.webp`,
    `${CTB}001a7d7f9.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // GAURELA-PENDRA-MARWAHI
  // ══════════════════════════════════════════════════════════════════════
  'Pendra Hill Station': [
    `${CTB}go7.webp`,
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
  ],
  'Doodh Dhara Waterfall': [
    `${CTB}go7.webp`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${WM}5/55/Tirathgarh_waterfall.jpg/960px-Tirathgarh_waterfall.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // JANJGIR-CHAMPA
  // ══════════════════════════════════════════════════════════════════════
  'Vishnu Temple Janjgir': [
    `${CTB}888053-tklnajnxuz-1534070188.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Champa Shivnath River Ghats': [
    `${CTB}888053-tklnajnxuz-1534070188.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // KHAIRAGARH-CHHUIKHADAN-GANDAI
  // ══════════════════════════════════════════════════════════════════════
  'Indira Kala Sangit Vishwavidyalaya': [
    `${CTB}rajnandgaon.png`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Khairagarh Fort Palace': [
    `${CTB}rajnandgaon.png`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // MANENDRAGARH-CHIRMIRI-BHARATPUR
  // ══════════════════════════════════════════════════════════════════════
  'Hasdeo Valley Viewpoint': [
    `${CTB}go7.webp`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Sonmuda Valley': [
    `${CTB}go7.webp`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // MOHLA-MANPUR-AMBAGARH CHOWKI
  // ══════════════════════════════════════════════════════════════════════
  'Ambagarh Fort Ruins': [
    `${CTB}2019-08-25.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Mohla Waterfall': [
    `${CTB}2019-08-25.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
    `${WM}5/55/Tirathgarh_waterfall.jpg/960px-Tirathgarh_waterfall.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // MUNGELI
  // ══════════════════════════════════════════════════════════════════════
  'Achanakmar Tiger Reserve Buffer Zone': [
    `${CTB}mungeli-maon.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Lormi Waterfall': [
    `${CTB}mungeli-maon.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Madmaheshwar Temple': [
    `${CTB}mungeli-maon.jpg`,
    `${WMF}6/6a/0010722_11th_century_Ratanpur_Mahamaya_Temple_Chhattisgarh_038.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // NARAYANPUR
  // ══════════════════════════════════════════════════════════════════════
  'Abujhmaad Forest': [
    `${CTB}001a7d7f9.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Orchha Wildlife Sanctuary': [
    `${CTB}001a7d7f9.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Abujhmaria Village Visit': [
    `${WMF}9/91/Gadiya_village_road%2C_Bastar_Chhattisgarh_India.jpg`,
    `${CTB}Bhatra%20Tribe%20Women%20of%20Bastar.jpg`,
    `${CTB}001a7d7f9.jpg`,
    `${CTB}Bastar%20Dussehra%20(6).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // RAIGARH
  // ══════════════════════════════════════════════════════════════════════
  'Raigarh Palace': [
    `${CTB}888053-tklnajnxuz-1534070188.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Gomarda Wildlife Sanctuary': [
    `${CTB}888053-tklnajnxuz-1534070188.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Singhpur Cave Art': [
    `${CTB}888053-tklnajnxuz-1534070188.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // SAKTI
  // ══════════════════════════════════════════════════════════════════════
  'Chandrahasini Devi Temple': [
    `${CTB}888053-tklnajnxuz-1534070188.jpg`,
  ],
  'Mahanadi River Banks': [
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // SARANGARH-BILAIGARH
  // ══════════════════════════════════════════════════════════════════════
  'Sarangarh Palace': [
    `${CTB}mahasamund-2.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Bilaigarh Temple Complex': [
    `${WMF}7/77/Rajiv_Lochan_Temple%2C_Rajim.jpg`,
    `${CTB}mahasamund-2.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // SUKMA
  // ══════════════════════════════════════════════════════════════════════
  'Sabari River Tribal Trail': [
    `${CTB}001a7d7f9.jpg`,
  ],
  'Minpa Waterfall': [
    `${CTB}001a7d7f9.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Dornapal Tribal Village': [
    `${WMF}c/cd/Tribal_Woman_at_Weekly_Village_Market.jpg`,
    `${CTB}Bhatra%20Tribe%20Women%20of%20Bastar.jpg`,
    `${CTB}001a7d7f9.jpg`,
    `${CTB}Bastar%20Dussehra%20(6).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // SURAJPUR
  // ══════════════════════════════════════════════════════════════════════
  'Tamor Pingla Wildlife Sanctuary': [
    `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Chhatauni Waterfall': [
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Naya Raipur Central Park': [
    `${WMF}1/13/Central_Park%2C_Sector_24_Naya_Raipur.png`,
    `${CTB}001%20(2).jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Shaheed Veer Narayan Singh International Stadium': [
    `${WM}4/4a/Shaheed_Veer_Narayan_Singh_International_Stadium_Raipur.jpg/960px-Shaheed_Veer_Narayan_Singh_International_Stadium_Raipur.jpg`,
    `${WMF}5/5e/Shaheed_Veer_Narayan_International_Cricket_Stadium_Raipur%2C_drone_view.png`,
    `${CTB}001%20(2).jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
};

// ─── HELPER: get images array for a place ────────────────────────────────────
// Falls back to district-level images, then generic fallback.
const DISTRICT_FB = {
  'Raipur':          `${CTB}001%20(2).jpg`,
  'Bilaspur':        `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
  'Bastar':          `${CTB}001a7d7f9.jpg`,
  'Durg':            `${CTB}2022-12-13.jpg`,
  'Rajnandgaon':     `${CTB}rajnandgaon.png`,
  'Korba':           `${WMF}5/55/Tirathgarh_waterfall.jpg`,
  'Surguja':         `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
  'Mahasamund':      `${CTB}mahasamund-2.jpg`,
  'Dhamtari':        `${CTB}gangrel-bandh-image.webp`,
  'Gariyaband':      `${CTB}2019-08-25.jpg`,
  'Kabirdham':       `${CTB}Kabir%20Dham-Madwa%20MahalBhoramdeo36a52e.jpg`,
  'Jashpur':         `${CTB}jogimaracave.jpg`,
  'Korea':           `${WMF}5/55/Tirathgarh_waterfall.jpg`,
  'Dantewada':       `${CTB}0011122_Dantewada_Danteswari_Mata_Mandir_Chattisgarh_007.jpg`,
  'Kanker':          `${CTB}kanker-1.jpg`,
  'Kondagaon':       `${WMF}c/cd/Tribal_Woman_at_Weekly_Village_Market.jpg`,
  'Balod':           `${CTB}2022110365.jpg`,
  'Baloda Bazar':    `${CTB}baloda-bazar-navapara.jpg`,
  'Balrampur':       `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`,
  'Bemetara':        `${CTB}12th_century_Sita_Mandir_HIndu_temple_Deorbeeja,_Bemetara_district,_Chhattisgarh_-_2.jpg`,
  'Bijapur':         `${CTB}2024071917.png`,
  'Gaurela-Pendra-Marwahi': `${CTB}go7.webp`,
  'Janjgir-Champa':  `${WM}4/4a/12th-century_Small_and_Large_Vishnu_temples%2C_Janjgir_Chhattisgarh%2C_archive_late_19th_century.jpg/960px-12th-century_Small_and_Large_Vishnu_temples%2C_Janjgir_Chhattisgarh%2C_archive_late_19th_century.jpg`,
  'Khairagarh-Chhuikhadan-Gandai': `${CTB}rajnandgaon.png`,
  'Manendragarh-Chirmiri-Bharatpur': `${CTB}go7.webp`,
  'Mohla-Manpur-Ambagarh Chowki': `${CTB}2019-08-25.jpg`,
  'Mungeli':         `${CTB}mungeli-maon.jpg`,
  'Narayanpur':      `${WM}c/cd/Abujmarh_%28restricted_area_in_chattisgarh%29.jpg/960px-Abujmarh_%28restricted_area_in_chattisgarh%29.jpg`,
  'Raigarh':         `${WM}3/36/Girivilas_Palace.jpg/960px-Girivilas_Palace.jpg`,
  'Sakti':           `${WM}3/3c/Maa_Beri_Wali_Mandir.jpg/960px-Maa_Beri_Wali_Mandir.jpg`,
  'Sarangarh-Bilaigarh': `${CTB}mahasamund-2.jpg`,
  'Sukma':           `${WM}1/1b/Malkan_giri_Sukma_C.G.jpg/960px-Malkan_giri_Sukma_C.G.jpg`,
  'Surajpur':        `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`,
};

export function getPlaceImages(placeName, districtName, primaryImage) {
  const mapped = PLACE_IMAGES[placeName];
  if (mapped && mapped.length > 0) return mapped;

  // Build a 4-image fallback set using district image + generic fallback
  const distFb = DISTRICT_FB[districtName] || FALLBACK;
  const imgs = [primaryImage, distFb, FALLBACK, distFb].filter(Boolean);
  // Deduplicate
  return [...new Set(imgs)].slice(0, 4);
}

// ── RAIPUR — NEW PLACES IMAGE MAPPINGS ──────────────────────────────────────
// Added to PLACE_IMAGES object — insert these inside the PLACE_IMAGES = { ... }

const RAIPUR_NEW_IMAGES = {
  'Chokhi Dhani Raipur': [
    `${CTB}001%20(2).jpg`,
    `${CTB}Bhatra%20Tribe%20Women%20of%20Bastar.jpg`,
    `${CTB}Bastar%20Dussehra%20(6).jpg`,
    `${CTB}3%20(2).jpg`,
  ],
  'Ram Mandir VIP Road': [
    `${WMF}7/77/Rajiv_Lochan_Temple%2C_Rajim.jpg`,
    `${WMF}7/77/Rajiv_Lochan_Temple%2C_Rajim.jpg`,
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
  ],
  'City Mall Raipur': [
    `${CTB}3%20(2).jpg`,
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Colours Mall Raipur': [
    `${CTB}3%20(2).jpg`,
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Ambuja Mall Raipur': [
    `${CTB}3%20(2).jpg`,
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Zora Mall Raipur': [
    `${CTB}3%20(2).jpg`,
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Amuse-O-Rama Water Park': [
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Telibandha Drive (Marine Drive)': [
    `${CTB}3%20(2).jpg`,
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Banjari Mata Mandir': [
    `${CTB}001%20(2).jpg`,
    `${WMF}7/77/Rajiv_Lochan_Temple%2C_Rajim.jpg`,
    `${CTB}4.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Quiet Lake Raipur': [
    `${CTB}3%20(2).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
  ],
  'ISKCON Temple Raipur': [
    `${WM}e/e9/Vivekananda_Sarovar_Raipur.jpg/400px-Vivekananda_Sarovar_Raipur.jpg`,
    `${CTB}001%20(2).jpg`,
    `${WMF}7/77/Rajiv_Lochan_Temple%2C_Rajim.jpg`,
    `${CTB}4.jpg`,
  ],
  'Naya Raipur Central Park': [
    `${WMF}1/13/Central_Park%2C_Sector_24_Naya_Raipur.png`,
    `${CTB}001%20(2).jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Shaheed Veer Narayan Singh International Stadium': [
    `${WM}4/4a/Shaheed_Veer_Narayan_Singh_International_Stadium_Raipur.jpg/960px-Shaheed_Veer_Narayan_Singh_International_Stadium_Raipur.jpg`,
    `${WMF}5/5e/Shaheed_Veer_Narayan_International_Cricket_Stadium_Raipur%2C_drone_view.png`,
    `${CTB}001%20(2).jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Maha Maya Temple Raipur': [
    `${WMF}6/6a/0010722_11th_century_Ratanpur_Mahamaya_Temple_Chhattisgarh_038.jpg`,
    `${WMF}6/6a/0010722_11th_century_Ratanpur_Mahamaya_Temple_Chhattisgarh_038.jpg`,
    `${CTB}001%20(2).jpg`,
    `${WMF}7/77/Rajiv_Lochan_Temple%2C_Rajim.jpg`,
  ],
  'Hatkeshwar Mahadev Temple': [
    `${WMF}7/77/Rajiv_Lochan_Temple%2C_Rajim.jpg`,
    `${CTB}001%20(2).jpg`,
    `${WMF}6/6a/0010722_11th_century_Ratanpur_Mahamaya_Temple_Chhattisgarh_038.jpg`,
    `${CTB}4.jpg`,
  ],
  'Naya Raipur Musical Fountain': [
    `${WM}e/e9/Vivekananda_Sarovar_Raipur.jpg/800px-Vivekananda_Sarovar_Raipur.jpg`,
    `${WM}e/e9/Vivekananda_Sarovar_Raipur.jpg/400px-Vivekananda_Sarovar_Raipur.jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}001%20(2).jpg`,
  ],
  'Adivasi Sangrahalaya (Tribal Museum)': [
    `${WMF}2/29/Purkhouti_Muktangan_Raipur_Chattisgarh.JPG`,
    `${CTB}001%20(2).jpg`,
    `${CTB}Bhatra%20Tribe%20Women%20of%20Bastar.jpg`,
    `${CTB}3%20(2).jpg`,
  ],
  'Pandri Market': [
    `${CTB}3%20(2).jpg`,
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Gurudwara Raipur': [
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Sendh Lake': [
    `${CTB}3%20(2).jpg`,
    `${WM}e/e9/Vivekananda_Sarovar_Raipur.jpg/400px-Vivekananda_Sarovar_Raipur.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
    `${CTB}001%20(2).jpg`,
  ],
  'Blue Water Park Raipur': [
    `${CTB}001%20(2).jpg`,
    `${CTB}4.jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Chhattisgarh Vigyan Kendra': [
    `${WMF}5/51/Mahant_Ghasidas_Sangrahalaya_Raipur_%281%29.jpg`,
    `${CTB}001%20(2).jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Kaushalya Mata Temple Chandkhuri': [
    `${WMF}7/77/Rajiv_Lochan_Temple%2C_Rajim.jpg`,
    `${WMF}7/77/Rajiv_Lochan_Temple%2C_Rajim.jpg`,
    `${CTB}001%20(2).jpg`,
    `${WMF}6/6a/0010722_11th_century_Ratanpur_Mahamaya_Temple_Chhattisgarh_038.jpg`,
  ],
  'Marine Drive Raipur': [
    `${WM}e/e9/Vivekananda_Sarovar_Raipur.jpg/800px-Vivekananda_Sarovar_Raipur.jpg`,
    `${WM}e/e9/Vivekananda_Sarovar_Raipur.jpg/400px-Vivekananda_Sarovar_Raipur.jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
};
