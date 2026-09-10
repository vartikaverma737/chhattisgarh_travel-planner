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
    `${WM}b/b7/Mahant_Ghasidas_Memorial_Museum%2C_Raipur.jpg/800px-Mahant_Ghasidas_Memorial_Museum%2C_Raipur.jpg`,
    `${WM}b/b7/Mahant_Ghasidas_Memorial_Museum%2C_Raipur.jpg/400px-Mahant_Ghasidas_Memorial_Museum%2C_Raipur.jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}001%20(2).jpg`,
  ],
  'Nandan Van Zoo & Safari': [
    `${WMF}4/47/Nandan_Van_zoo_Raipur.jpg`,
    `${CTB}4.jpg`,
    `${CTB}001%20(2).jpg`,
    `${CTB}3%20(2).jpg`,
  ],
  'Vivekananda Sarovar': [
    `${WM}e/e9/Vivekananda_Sarovar_Raipur.jpg/800px-Vivekananda_Sarovar_Raipur.jpg`,
    `${WM}e/e9/Vivekananda_Sarovar_Raipur.jpg/400px-Vivekananda_Sarovar_Raipur.jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}4.jpg`,
  ],
  'Purkhouti Muktangan': [
    `${WMF}2/29/Purkhouti_Muktangan_Raipur_Chattisgarh.JPG`,
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
    `${WM}f/f2/Dudhadhari_math_Raipur.jpg/800px-Dudhadhari_math_Raipur.jpg`,
    `${WM}f/f2/Dudhadhari_math_Raipur.jpg/400px-Dudhadhari_math_Raipur.jpg`,
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
    `${WM}a/a5/Ratanpur_fort_chhattisgarh.jpg/800px-Ratanpur_fort_chhattisgarh.jpg`,
    `${WM}a/a5/Ratanpur_fort_chhattisgarh.jpg/400px-Ratanpur_fort_chhattisgarh.jpg`,
    `${WM}0/0e/Mahamaya_Temple%2C_Ratanpur.jpg/400px-Mahamaya_Temple%2C_Ratanpur.jpg`,
    `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
  ],
  'Achanakmar Wildlife Sanctuary': [
    `${WM}6/6e/Achanakmar_Wildlife_Sanctuary.jpg/800px-Achanakmar_Wildlife_Sanctuary.jpg`,
    `${WM}6/6e/Achanakmar_Wildlife_Sanctuary.jpg/400px-Achanakmar_Wildlife_Sanctuary.jpg`,
    `${CTB}mungeli-maon.jpg`,
    `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
  ],
  'Mahamaya Temple Ratanpur': [
    `${WM}0/0e/Mahamaya_Temple%2C_Ratanpur.jpg/800px-Mahamaya_Temple%2C_Ratanpur.jpg`,
    `${WM}0/0e/Mahamaya_Temple%2C_Ratanpur.jpg/400px-Mahamaya_Temple%2C_Ratanpur.jpg`,
    `${WM}a/a5/Ratanpur_fort_chhattisgarh.jpg/400px-Ratanpur_fort_chhattisgarh.jpg`,
    `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
  ],
  'Kanan Pendari Zoo': [
    `${WM}c/c4/Kanan_Pendari_Zoo_Bilaspur.jpg/800px-Kanan_Pendari_Zoo_Bilaspur.jpg`,
    `${WM}c/c4/Kanan_Pendari_Zoo_Bilaspur.jpg/400px-Kanan_Pendari_Zoo_Bilaspur.jpg`,
    `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
    `${WM}6/6e/Achanakmar_Wildlife_Sanctuary.jpg/400px-Achanakmar_Wildlife_Sanctuary.jpg`,
  ],
  'Malhaar Archaeological Site': [
    `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
    `${WM}a/a5/Ratanpur_fort_chhattisgarh.jpg/400px-Ratanpur_fort_chhattisgarh.jpg`,
    `${WM}0/0e/Mahamaya_Temple%2C_Ratanpur.jpg/400px-Mahamaya_Temple%2C_Ratanpur.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Seorinarayan Temple': [
    `${WM}8/8a/Seorinarayan_temple.jpg/800px-Seorinarayan_temple.jpg`,
    `${WM}8/8a/Seorinarayan_temple.jpg/400px-Seorinarayan_temple.jpg`,
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
    `${WM}7/74/Tirathgarh_waterfall.jpg/800px-Tirathgarh_waterfall.jpg`,
    `${WM}7/74/Tirathgarh_waterfall.jpg/400px-Tirathgarh_waterfall.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${CTB}001a7d7f9.jpg`,
  ],
  'Kanger Valley National Park': [
    `${WM}8/83/Kanger_ghati.jpg/800px-Kanger_ghati.jpg`,
    `${WM}8/83/Kanger_ghati.jpg/400px-Kanger_ghati.jpg`,
    `${CTB}001a7d7f9.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
  ],
  'Kotumsar Cave': [
    `${WM}b/b9/Kotumsar_Cave_Bastar.jpg/800px-Kotumsar_Cave_Bastar.jpg`,
    `${WM}b/b9/Kotumsar_Cave_Bastar.jpg/400px-Kotumsar_Cave_Bastar.jpg`,
    `${CTB}001a7d7f9.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
  ],
  'Bastar Palace': [
    `${WM}9/9a/Bastar_Palace_Jagdalpur.jpg/800px-Bastar_Palace_Jagdalpur.jpg`,
    `${WM}9/9a/Bastar_Palace_Jagdalpur.jpg/400px-Bastar_Palace_Jagdalpur.jpg`,
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
    `${WM}f/f5/Dalpat_Sagar_Lake_Jagdalpur.jpg/800px-Dalpat_Sagar_Lake_Jagdalpur.jpg`,
    `${WM}f/f5/Dalpat_Sagar_Lake_Jagdalpur.jpg/400px-Dalpat_Sagar_Lake_Jagdalpur.jpg`,
    `${CTB}001a7d7f9.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Mendri Ghumar Waterfall': [
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${CTB}001a7d7f9.jpg`,
    `${WM}7/74/Tirathgarh_waterfall.jpg/400px-Tirathgarh_waterfall.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // DURG
  // ══════════════════════════════════════════════════════════════════════
  'Uwasaggaharam Parshwa Teerth': [
    `${WMF}3/37/Uwasaggaharam_Parshwa_Teerth_Durg.jpg`,
    `${CTB}2022-12-13.jpg`,
    `${WM}5/5e/Maitri_Bagh_Bhilai.jpg/400px-Maitri_Bagh_Bhilai.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Maitri Bagh Zoo': [
    `${WM}5/5e/Maitri_Bagh_Bhilai.jpg/800px-Maitri_Bagh_Bhilai.jpg`,
    `${WM}5/5e/Maitri_Bagh_Bhilai.jpg/400px-Maitri_Bagh_Bhilai.jpg`,
    `${CTB}2022-12-13.jpg`,
    `${CTB}m_Bhilai_Bhilai_steel_plant_1_l_470_640.jpg`,
  ],
  'Tandula Dam': [
    `${WM}4/4c/Tandula_Dam_Balod.jpg/800px-Tandula_Dam_Balod.jpg`,
    `${WM}4/4c/Tandula_Dam_Balod.jpg/400px-Tandula_Dam_Balod.jpg`,
    `${CTB}2022-12-13.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Ganga Maiya Temple Durg': [
    `${CTB}2022-12-13.jpg`,
    `${CTB}m_Bhilai_Bhilai_steel_plant_1_l_470_640.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
    `${WM}5/5e/Maitri_Bagh_Bhilai.jpg/400px-Maitri_Bagh_Bhilai.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // RAJNANDGAON — Bambleshwari verified from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Dongargarh — Bambleshwari Temple': [
    `${WM}c/c3/Bambleshwari_temple_Dongargarh.jpg/800px-Bambleshwari_temple_Dongargarh.jpg`,
    `${WM}c/c3/Bambleshwari_temple_Dongargarh.jpg/400px-Bambleshwari_temple_Dongargarh.jpg`,
    `${CTB}rajnandgaon.png`,
    `${WM}9/93/Rajiv_Lochan_temple%2C_Rajim.jpg/400px-Rajiv_Lochan_temple%2C_Rajim.jpg`,
  ],
  'Rajiv Lochan Mandir, Rajim': [
    `${WM}9/93/Rajiv_Lochan_temple%2C_Rajim.jpg/800px-Rajiv_Lochan_temple%2C_Rajim.jpg`,
    `${WM}9/93/Rajiv_Lochan_temple%2C_Rajim.jpg/400px-Rajiv_Lochan_temple%2C_Rajim.jpg`,
    `${WM}c/c3/Bambleshwari_temple_Dongargarh.jpg/400px-Bambleshwari_temple_Dongargarh.jpg`,
    `${CTB}rajnandgaon.png`,
  ],
  'Khutaghat Dam': [
    `${WMF}5/55/Khutaghat_Dam_Chhattisgarh.jpg`,
    `${CTB}rajnandgaon.png`,
    `${CTB}gangrel-bandh-image.webp`,
    `${WM}4/4c/Tandula_Dam_Balod.jpg/400px-Tandula_Dam_Balod.jpg`,
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
    `${CTBP}Kendai%20Waterfall%20Korba.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${WM}7/74/Tirathgarh_waterfall.jpg/400px-Tirathgarh_waterfall.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Pali Shiv Temple': [
    `${WMF}9/98/Pali_shiv_mandir_korba.jpg`,
    `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
    `${WM}0/0e/Mahamaya_Temple%2C_Ratanpur.jpg/400px-Mahamaya_Temple%2C_Ratanpur.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Hasdev Bango Dam': [
    `${CTBP}%28%E0%A4%AE%E0%A4%B9%E0%A4%BF%E0%A4%B7%E0%A4%BE%E0%A4%B8%E0%A5%81%E0%A4%B0_%E0%A4%AE%E0%A4%B0%E0%A5%8D%E0%A4%A6%E0%A4%BF%E0%A4%A8%E0%A5%80_%E0%A4%AE%E0%A4%82%E0%A4%A6%E0%A4%BF%E0%A4%B0%2C_%E0%A4%9A%E0%A5%88%E0%A4%A4%E0%A5%81%E0%A4%B0%E0%A4%97%E0%A4%A2%2C_%E0%A4%95%E0%A5%8B%E0%A4%B0%E0%A4%AC%E0%A4%BE%29_Mahishasur_Mardini_temple_Chaiturgarh_Korba%2C_Chhattisgarh.jpg`,
    `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
    `${WM}4/4c/Tandula_Dam_Balod.jpg/400px-Tandula_Dam_Balod.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // SURGUJA
  // ══════════════════════════════════════════════════════════════════════
  'Mainpat Hill Station': [
    `${WM}1/1d/Mainpat_Chhattisgarh.jpg/800px-Mainpat_Chhattisgarh.jpg`,
    `${WM}1/1d/Mainpat_Chhattisgarh.jpg/400px-Mainpat_Chhattisgarh.jpg`,
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Tiger Point Mainpat': [
    `${WMF}6/67/Tiger_Point_Mainpat.jpg`,
    `${WM}1/1d/Mainpat_Chhattisgarh.jpg/400px-Mainpat_Chhattisgarh.jpg`,
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Ramgarh Hill': [
    `${WM}d/d8/Jogimarha_Cave_Ramgarh.jpg/800px-Jogimarha_Cave_Ramgarh.jpg`,
    `${WM}d/d8/Jogimarha_Cave_Ramgarh.jpg/400px-Jogimarha_Cave_Ramgarh.jpg`,
    `${CTB}jogimaracave.jpg`,
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
  ],
  'Tatapani Hot Springs': [
    `${WMF}8/8b/Tatapani_hot_spring_Surguja.jpg`,
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
    `${WM}1/1d/Mainpat_Chhattisgarh.jpg/400px-Mainpat_Chhattisgarh.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Semarsot Wildlife Sanctuary': [
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
    `${WM}6/6e/Achanakmar_Wildlife_Sanctuary.jpg/400px-Achanakmar_Wildlife_Sanctuary.jpg`,
    `${WM}1/1d/Mainpat_Chhattisgarh.jpg/400px-Mainpat_Chhattisgarh.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Ulta Pani Mainpat': [
    `${WM}1/1d/Mainpat_Chhattisgarh.jpg/800px-Mainpat_Chhattisgarh.jpg`,
    `${WM}1/1d/Mainpat_Chhattisgarh.jpg/400px-Mainpat_Chhattisgarh.jpg`,
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Fish Point Mainpat': [
    `${WM}1/1d/Mainpat_Chhattisgarh.jpg/400px-Mainpat_Chhattisgarh.jpg`,
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
    `${CTB}gangrel-bandh-image.webp`,
    `${WM}1/1d/Mainpat_Chhattisgarh.jpg/800px-Mainpat_Chhattisgarh.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // MAHASAMUND — Sirpur images confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Sirpur Archaeological Site': [
    `${WM}5/5c/Sirpur_Chhattisgarh.jpg/800px-Sirpur_Chhattisgarh.jpg`,
    `${WM}5/5c/Sirpur_Chhattisgarh.jpg/400px-Sirpur_Chhattisgarh.jpg`,
    `${WM}a/a3/Laxman_Temple_Sirpur_Chhattisgarh.jpg/400px-Laxman_Temple_Sirpur_Chhattisgarh.jpg`,
    `${CTB}mahasamund-2.jpg`,
  ],
  'Laxman Temple Sirpur': [
    `${WM}a/a3/Laxman_Temple_Sirpur_Chhattisgarh.jpg/800px-Laxman_Temple_Sirpur_Chhattisgarh.jpg`,
    `${WM}a/a3/Laxman_Temple_Sirpur_Chhattisgarh.jpg/400px-Laxman_Temple_Sirpur_Chhattisgarh.jpg`,
    `${WM}5/5c/Sirpur_Chhattisgarh.jpg/400px-Sirpur_Chhattisgarh.jpg`,
    `${WM}3/38/Buddhist_monastery_Sirpur.jpg/400px-Buddhist_monastery_Sirpur.jpg`,
  ],
  'Buddha Vihar Sirpur': [
    `${WM}3/38/Buddhist_monastery_Sirpur.jpg/800px-Buddhist_monastery_Sirpur.jpg`,
    `${WM}3/38/Buddhist_monastery_Sirpur.jpg/400px-Buddhist_monastery_Sirpur.jpg`,
    `${WM}a/a3/Laxman_Temple_Sirpur_Chhattisgarh.jpg/400px-Laxman_Temple_Sirpur_Chhattisgarh.jpg`,
    `${WM}5/5c/Sirpur_Chhattisgarh.jpg/400px-Sirpur_Chhattisgarh.jpg`,
  ],
  'Surang Tila Sirpur': [
    `${WM}5/5c/Sirpur_Chhattisgarh.jpg/400px-Sirpur_Chhattisgarh.jpg`,
    `${WM}a/a3/Laxman_Temple_Sirpur_Chhattisgarh.jpg/400px-Laxman_Temple_Sirpur_Chhattisgarh.jpg`,
    `${WM}3/38/Buddhist_monastery_Sirpur.jpg/400px-Buddhist_monastery_Sirpur.jpg`,
    `${CTB}mahasamund-2.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // DHAMTARI — Gangrel Dam images confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Gangrel Dam (Ravishankar Sagar)': [
    `${CTB}gangrel-bandh-image.webp`,
    `${WM}5/53/Gangrel_Dam_Dhamtari.jpg/800px-Gangrel_Dam_Dhamtari.jpg`,
    `${WM}5/53/Gangrel_Dam_Dhamtari.jpg/400px-Gangrel_Dam_Dhamtari.jpg`,
    `${WM}4/4c/Tandula_Dam_Balod.jpg/400px-Tandula_Dam_Balod.jpg`,
  ],
  'Madku Dweep': [
    `${WMF}7/7c/Madku_Dweep_Chhattisgarh.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
    `${WM}5/53/Gangrel_Dam_Dhamtari.jpg/400px-Gangrel_Dam_Dhamtari.jpg`,
    `${CTB}mahasamund-2.jpg`,
  ],
  'Sihawa Shringhi Rishi Ashram': [
    `${WMF}c/c9/Sihawa_Shringhi_Rishi_Ashram.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
    `${WM}5/53/Gangrel_Dam_Dhamtari.jpg/400px-Gangrel_Dam_Dhamtari.jpg`,
    `${CTB}001%20(2).jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // GARIYABAND — Jatmai confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Jatmai Ghatarrani Temple': [
    `${WM}f/f3/Jatmai_Ghatarani_Temple.jpg/800px-Jatmai_Ghatarani_Temple.jpg`,
    `${WM}f/f3/Jatmai_Ghatarani_Temple.jpg/400px-Jatmai_Ghatarani_Temple.jpg`,
    `${CTB}2019-08-25.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
  ],
  'Udanti Wildlife Sanctuary': [
    `${WM}0/0c/Udanti_Wildlife_Sanctuary_Chhattisgarh.jpg/800px-Udanti_Wildlife_Sanctuary_Chhattisgarh.jpg`,
    `${WM}0/0c/Udanti_Wildlife_Sanctuary_Chhattisgarh.jpg/400px-Udanti_Wildlife_Sanctuary_Chhattisgarh.jpg`,
    `${CTB}2019-08-25.jpg`,
    `${WM}6/6e/Achanakmar_Wildlife_Sanctuary.jpg/400px-Achanakmar_Wildlife_Sanctuary.jpg`,
  ],
  'Ghatarrani Waterfall': [
    `${WM}f/f3/Jatmai_Ghatarani_Temple.jpg/400px-Jatmai_Ghatarani_Temple.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${CTB}2019-08-25.jpg`,
    `${WM}7/74/Tirathgarh_waterfall.jpg/400px-Tirathgarh_waterfall.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // KABIRDHAM — Bhoramdeo confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Bhoramdeo Temple': [
    `${WM}e/e0/Bhoramdeo_temple_Kabirdham.jpg/800px-Bhoramdeo_temple_Kabirdham.jpg`,
    `${WM}e/e0/Bhoramdeo_temple_Kabirdham.jpg/400px-Bhoramdeo_temple_Kabirdham.jpg`,
    `${CTB}Kabir%20Dham-Madwa%20MahalBhoramdeo36a52e.jpg`,
    `${WM}3/33/Kawardha_Palace_Chhattisgarh.jpg/400px-Kawardha_Palace_Chhattisgarh.jpg`,
  ],
  'Kawardha Palace': [
    `${WM}3/33/Kawardha_Palace_Chhattisgarh.jpg/800px-Kawardha_Palace_Chhattisgarh.jpg`,
    `${WM}3/33/Kawardha_Palace_Chhattisgarh.jpg/400px-Kawardha_Palace_Chhattisgarh.jpg`,
    `${WM}e/e0/Bhoramdeo_temple_Kabirdham.jpg/400px-Bhoramdeo_temple_Kabirdham.jpg`,
    `${CTB}Kabir%20Dham-Madwa%20MahalBhoramdeo36a52e.jpg`,
  ],
  'Bhoramdeo Wildlife Sanctuary': [
    `${WM}1/1d/Bhoramdeo_Sanctuary_Forest.jpg/800px-Bhoramdeo_Sanctuary_Forest.jpg`,
    `${WM}1/1d/Bhoramdeo_Sanctuary_Forest.jpg/400px-Bhoramdeo_Sanctuary_Forest.jpg`,
    `${WM}e/e0/Bhoramdeo_temple_Kabirdham.jpg/400px-Bhoramdeo_temple_Kabirdham.jpg`,
    `${CTB}Kabir%20Dham-Madwa%20MahalBhoramdeo36a52e.jpg`,
  ],
  'Madwa Mahal': [
    `${CTB}Kabir%20Dham-Madwa%20MahalBhoramdeo36a52e.jpg`,
    `${WM}e/e0/Bhoramdeo_temple_Kabirdham.jpg/400px-Bhoramdeo_temple_Kabirdham.jpg`,
    `${WM}3/33/Kawardha_Palace_Chhattisgarh.jpg/400px-Kawardha_Palace_Chhattisgarh.jpg`,
    `${WM}1/1d/Bhoramdeo_Sanctuary_Forest.jpg/400px-Bhoramdeo_Sanctuary_Forest.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // JASHPUR — CTB images confirmed
  // ══════════════════════════════════════════════════════════════════════
  'Kailash Gufa (Cave)': [
    `${WMF}8/8c/Kailash_Gufa_Jashpur_Chhattisgarh.jpg`,
    `${CTB}jogimaracave.jpg`,
    `${CTB}Eb_river_of_at_Gullu_waterfall.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Rajpuri Waterfall': [
    `${WMF}b/b4/Rajpuri_Waterfalls_Jashpur.jpg`,
    `${CTB}Eb_river_of_at_Gullu_waterfall.jpg`,
    `${CTB}jogimaracave.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
  ],
  'Jashpur Tea Gardens': [
    `${WMF}e/e7/Jashpur_Tea_Garden_Chhattisgarh.jpg`,
    `${CTB}Eb_river_of_at_Gullu_waterfall.jpg`,
    `${CTB}jogimaracave.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Rani Jharna Waterfall': [
    `${WMF}3/35/Rani_Jharna_Jashpur.jpg`,
    `${CTB}Eb_river_of_at_Gullu_waterfall.jpg`,
    `${CTB}jogimaracave.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
  ],
  'Kunkuri Church': [
    `${WM}a/a2/Kunkuri_Catholic_Church.jpg/800px-Kunkuri_Catholic_Church.jpg`,
    `${WM}a/a2/Kunkuri_Catholic_Church.jpg/400px-Kunkuri_Catholic_Church.jpg`,
    `${CTB}jogimaracave.jpg`,
    `${CTB}Eb_river_of_at_Gullu_waterfall.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // KOREA (KORIYA) — Amrit Dhara confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Amrit Dhara Waterfall': [
    `${WM}4/41/Amrit_Dhara_Waterfall_Korea.jpg/800px-Amrit_Dhara_Waterfall_Korea.jpg`,
    `${WM}4/41/Amrit_Dhara_Waterfall_Korea.jpg/400px-Amrit_Dhara_Waterfall_Korea.jpg`,
    `${CTBP}Koriya_palace_04.jpg`,
    `${CTB}go7.webp`,
  ],
  'Chirimiri Hill Station': [
    `${CTBP}Koriya_palace_04.jpg`,
    `${WM}4/41/Amrit_Dhara_Waterfall_Korea.jpg/400px-Amrit_Dhara_Waterfall_Korea.jpg`,
    `${WM}1/1d/Mainpat_Chhattisgarh.jpg/400px-Mainpat_Chhattisgarh.jpg`,
    `${CTB}go7.webp`,
  ],
  'Hasdeo Aranya Forest': [
    `${WM}b/b7/Hasdeo_Aranya_forest_Chhattisgarh.jpg/800px-Hasdeo_Aranya_forest_Chhattisgarh.jpg`,
    `${WM}b/b7/Hasdeo_Aranya_forest_Chhattisgarh.jpg/400px-Hasdeo_Aranya_forest_Chhattisgarh.jpg`,
    `${WM}4/41/Amrit_Dhara_Waterfall_Korea.jpg/400px-Amrit_Dhara_Waterfall_Korea.jpg`,
    `${CTBP}Koriya_palace_04.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // DANTEWADA — confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Danteshwari Temple': [
    `${WM}d/d9/Danteshwari_temple_Dantewada.jpg/800px-Danteshwari_temple_Dantewada.jpg`,
    `${WM}d/d9/Danteshwari_temple_Dantewada.jpg/400px-Danteshwari_temple_Dantewada.jpg`,
    `${CTB}0011122_Dantewada_Danteswari_Mata_Mandir_Chattisgarh_007.jpg`,
    `${WM}1/1a/Barsur_Ganesh_Temple_Dantewada.jpg/400px-Barsur_Ganesh_Temple_Dantewada.jpg`,
  ],
  'Barsur Temple Complex': [
    `${WM}1/1a/Barsur_Ganesh_Temple_Dantewada.jpg/800px-Barsur_Ganesh_Temple_Dantewada.jpg`,
    `${WM}1/1a/Barsur_Ganesh_Temple_Dantewada.jpg/400px-Barsur_Ganesh_Temple_Dantewada.jpg`,
    `${WM}d/d9/Danteshwari_temple_Dantewada.jpg/400px-Danteshwari_temple_Dantewada.jpg`,
    `${CTB}0011122_Dantewada_Danteswari_Mata_Mandir_Chattisgarh_007.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // KANKER — confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Kanker Palace': [
    `${WM}2/22/Kanker_Palace_Chhattisgarh.jpg/800px-Kanker_Palace_Chhattisgarh.jpg`,
    `${WM}2/22/Kanker_Palace_Chhattisgarh.jpg/400px-Kanker_Palace_Chhattisgarh.jpg`,
    `${CTB}kanker-1.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Kanker Jungle Safari': [
    `${CTB}kanker-1.jpg`,
    `${WM}2/22/Kanker_Palace_Chhattisgarh.jpg/400px-Kanker_Palace_Chhattisgarh.jpg`,
    `${WMF}4/48/Kanker_jungle_chhattisgarh.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Dudh River Rafting': [
    `${CTB}kanker-1.jpg`,
    `${WM}2/22/Kanker_Palace_Chhattisgarh.jpg/400px-Kanker_Palace_Chhattisgarh.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
    `${CTB}001%20(2).jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // KONDAGAON
  // ══════════════════════════════════════════════════════════════════════
  'Crafts Bazaar Kondagaon': [
    `${WMF}5/5d/Dhokra_craft_Kondagaon_Bastar.jpg`,
    `${CTB}Bhatra%20Tribe%20Women%20of%20Bastar.jpg`,
    `${CTB}001a7d7f9.jpg`,
    `${CTB}Bastar%20Dussehra%20(6).jpg`,
  ],
  'Keshkal Ghati': [
    `${WM}8/83/Keshkal_Valley_Kondagaon.jpg/800px-Keshkal_Valley_Kondagaon.jpg`,
    `${WM}8/83/Keshkal_Valley_Kondagaon.jpg/400px-Keshkal_Valley_Kondagaon.jpg`,
    `${CTB}001a7d7f9.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Bell Metal Village Dokra': [
    `${WMF}5/5d/Dhokra_craft_Kondagaon_Bastar.jpg`,
    `${CTB}Bhatra%20Tribe%20Women%20of%20Bastar.jpg`,
    `${CTB}001a7d7f9.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // BALOD — confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Ganga Maiya Temple, Jhalmala': [
    `${WMF}4/45/Ganga_Maiya_Temple_Jhalmala_Balod.jpg`,
    `${CTB}2022110365.jpg`,
    `${WM}4/4c/Tandula_Dam_Balod.jpg/400px-Tandula_Dam_Balod.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Tandula Dam & Reservoir': [
    `${WM}4/4c/Tandula_Dam_Balod.jpg/800px-Tandula_Dam_Balod.jpg`,
    `${WM}4/4c/Tandula_Dam_Balod.jpg/400px-Tandula_Dam_Balod.jpg`,
    `${CTB}2022110365.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Rural Haat (Weekly Tribal Market)': [
    `${WMF}6/69/Weekly_haat_Chhattisgarh_tribal.jpg`,
    `${CTB}Bhatra%20Tribe%20Women%20of%20Bastar.jpg`,
    `${CTB}2022110365.jpg`,
    `${CTB}Bastar%20Dussehra%20(6).jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // BALODA BAZAR
  // ══════════════════════════════════════════════════════════════════════
  'Turturiya Ashram': [
    `${WMF}a/a4/Turturiya_Ashram_Balodabazar.jpg`,
    `${CTB}baloda-bazar-navapara.jpg`,
    `${WM}8/88/Giroudpuri_Dham_Chhattisgarh.jpg/400px-Giroudpuri_Dham_Chhattisgarh.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Giroudpuri Dham': [
    `${WM}8/88/Giroudpuri_Dham_Chhattisgarh.jpg/800px-Giroudpuri_Dham_Chhattisgarh.jpg`,
    `${WM}8/88/Giroudpuri_Dham_Chhattisgarh.jpg/400px-Giroudpuri_Dham_Chhattisgarh.jpg`,
    `${CTB}baloda-bazar-navapara.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // BALRAMPUR
  // ══════════════════════════════════════════════════════════════════════
  'Tatapani Hot Springs Balrampur': [
    `${WMF}3/3d/Tatapani_hot_springs_Balrampur_Chhattisgarh.jpg`,
    `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`,
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Sanjay Gandhi National Park': [
    `${WM}b/b3/Sanjay_National_Park_tiger.jpg/800px-Sanjay_National_Park_tiger.jpg`,
    `${WM}b/b3/Sanjay_National_Park_tiger.jpg/400px-Sanjay_National_Park_tiger.jpg`,
    `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`,
    `${WM}6/6e/Achanakmar_Wildlife_Sanctuary.jpg/400px-Achanakmar_Wildlife_Sanctuary.jpg`,
  ],
  'Dipadih Temple Complex': [
    `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`,
    `${WM}1/1a/Barsur_Ganesh_Temple_Dantewada.jpg/400px-Barsur_Ganesh_Temple_Dantewada.jpg`,
    `${WM}a/a3/Laxman_Temple_Sirpur_Chhattisgarh.jpg/400px-Laxman_Temple_Sirpur_Chhattisgarh.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // BEMETARA
  // ══════════════════════════════════════════════════════════════════════
  'Navagarh Fort': [
    `${WMF}d/d2/Navagarh_Fort_Bemetara_Chhattisgarh.jpg`,
    `${CTB}12th_century_Sita_Mandir_HIndu_temple_Deorbeeja,_Bemetara_district,_Chhattisgarh_-_2.jpg`,
    `${WM}a/a5/Ratanpur_fort_chhattisgarh.jpg/400px-Ratanpur_fort_chhattisgarh.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Sita Mandir Deorbeeja': [
    `${CTB}12th_century_Sita_Mandir_HIndu_temple_Deorbeeja,_Bemetara_district,_Chhattisgarh_-_2.jpg`,
    `${WM}9/93/Rajiv_Lochan_temple%2C_Rajim.jpg/400px-Rajiv_Lochan_temple%2C_Rajim.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
    `${CTB}001%20(2).jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // BIJAPUR — Indravati confirmed from CTB
  // ══════════════════════════════════════════════════════════════════════
  'Indravati National Park': [
    `${WM}d/d8/Indravati_river_Bijapur.jpg/800px-Indravati_river_Bijapur.jpg`,
    `${WM}d/d8/Indravati_river_Bijapur.jpg/400px-Indravati_river_Bijapur.jpg`,
    `${CTB}2024071917.png`,
    `${WM}6/6e/Achanakmar_Wildlife_Sanctuary.jpg/400px-Achanakmar_Wildlife_Sanctuary.jpg`,
  ],
  'Indravati River Camping': [
    `${WM}d/d8/Indravati_river_Bijapur.jpg/400px-Indravati_river_Bijapur.jpg`,
    `${CTB}2024071917.png`,
    `${CTB}gangrel-bandh-image.webp`,
    `${CTB}001a7d7f9.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // GAURELA-PENDRA-MARWAHI
  // ══════════════════════════════════════════════════════════════════════
  'Pendra Hill Station': [
    `${WMF}9/97/Pendra_Hills_Chhattisgarh.jpg`,
    `${CTB}go7.webp`,
    `${WM}1/1d/Mainpat_Chhattisgarh.jpg/400px-Mainpat_Chhattisgarh.jpg`,
    `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
  ],
  'Doodh Dhara Waterfall': [
    `${WMF}e/e3/Doodh_Dhara_Waterfall_Chhattisgarh.jpg`,
    `${CTB}go7.webp`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${WM}7/74/Tirathgarh_waterfall.jpg/400px-Tirathgarh_waterfall.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // JANJGIR-CHAMPA
  // ══════════════════════════════════════════════════════════════════════
  'Vishnu Temple Janjgir': [
    `${WM}a/ab/Janjgir_Vishnu_temple_Chhattisgarh.jpg/800px-Janjgir_Vishnu_temple_Chhattisgarh.jpg`,
    `${WM}a/ab/Janjgir_Vishnu_temple_Chhattisgarh.jpg/400px-Janjgir_Vishnu_temple_Chhattisgarh.jpg`,
    `${CTB}888053-tklnajnxuz-1534070188.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Champa Shivnath River Ghats': [
    `${WMF}7/7c/Shivnath_river_ghat_Champa.jpg`,
    `${CTB}888053-tklnajnxuz-1534070188.jpg`,
    `${WM}a/ab/Janjgir_Vishnu_temple_Chhattisgarh.jpg/400px-Janjgir_Vishnu_temple_Chhattisgarh.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // KHAIRAGARH-CHHUIKHADAN-GANDAI
  // ══════════════════════════════════════════════════════════════════════
  'Indira Kala Sangit Vishwavidyalaya': [
    `${WM}a/a8/Indira_Kala_Sangit_Vishwavidyalaya_Khairagarh.jpg/800px-Indira_Kala_Sangit_Vishwavidyalaya_Khairagarh.jpg`,
    `${WM}a/a8/Indira_Kala_Sangit_Vishwavidyalaya_Khairagarh.jpg/400px-Indira_Kala_Sangit_Vishwavidyalaya_Khairagarh.jpg`,
    `${CTB}rajnandgaon.png`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Khairagarh Fort Palace': [
    `${WMF}6/6f/Khairagarh_Palace_Chhattisgarh.jpg`,
    `${WM}a/a8/Indira_Kala_Sangit_Vishwavidyalaya_Khairagarh.jpg/400px-Indira_Kala_Sangit_Vishwavidyalaya_Khairagarh.jpg`,
    `${CTB}rajnandgaon.png`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // MANENDRAGARH-CHIRMIRI-BHARATPUR
  // ══════════════════════════════════════════════════════════════════════
  'Hasdeo Valley Viewpoint': [
    `${WMF}b/b2/Hasdeo_Valley_Chhattisgarh.jpg`,
    `${WM}b/b7/Hasdeo_Aranya_forest_Chhattisgarh.jpg/400px-Hasdeo_Aranya_forest_Chhattisgarh.jpg`,
    `${CTB}go7.webp`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Sonmuda Valley': [
    `${WMF}7/72/Son_river_origin_Sonmuda_Chhattisgarh.jpg`,
    `${CTB}go7.webp`,
    `${CTB}gangrel-bandh-image.webp`,
    `${WM}b/b7/Hasdeo_Aranya_forest_Chhattisgarh.jpg/400px-Hasdeo_Aranya_forest_Chhattisgarh.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // MOHLA-MANPUR-AMBAGARH CHOWKI
  // ══════════════════════════════════════════════════════════════════════
  'Ambagarh Fort Ruins': [
    `${WMF}c/ca/Ambagarh_Fort_Chhattisgarh.jpg`,
    `${WM}a/a5/Ratanpur_fort_chhattisgarh.jpg/400px-Ratanpur_fort_chhattisgarh.jpg`,
    `${CTB}2019-08-25.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Mohla Waterfall': [
    `${CTB}2019-08-25.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
    `${WM}7/74/Tirathgarh_waterfall.jpg/400px-Tirathgarh_waterfall.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // MUNGELI
  // ══════════════════════════════════════════════════════════════════════
  'Achanakmar Tiger Reserve Buffer Zone': [
    `${WM}6/6e/Achanakmar_Wildlife_Sanctuary.jpg/800px-Achanakmar_Wildlife_Sanctuary.jpg`,
    `${WM}6/6e/Achanakmar_Wildlife_Sanctuary.jpg/400px-Achanakmar_Wildlife_Sanctuary.jpg`,
    `${CTB}mungeli-maon.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Lormi Waterfall': [
    `${WMF}2/29/Lormi_waterfall_Mungeli.jpg`,
    `${CTB}mungeli-maon.jpg`,
    `${CTB}Chitrakote%20Waterfall%20(7).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Madmaheshwar Temple': [
    `${WMF}6/6a/Madmaheshwar_temple_Mungeli_Chhattisgarh.jpg`,
    `${CTB}mungeli-maon.jpg`,
    `${WM}0/0e/Mahamaya_Temple%2C_Ratanpur.jpg/400px-Mahamaya_Temple%2C_Ratanpur.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // NARAYANPUR
  // ══════════════════════════════════════════════════════════════════════
  'Abujhmaad Forest': [
    `${WMF}0/07/Abujhmaad_forest_Chhattisgarh_tribal.jpg`,
    `${CTB}001a7d7f9.jpg`,
    `${WM}6/6e/Achanakmar_Wildlife_Sanctuary.jpg/400px-Achanakmar_Wildlife_Sanctuary.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Orchha Wildlife Sanctuary': [
    `${WMF}1/1c/Orchha_Wildlife_Sanctuary_Narayanpur.jpg`,
    `${CTB}001a7d7f9.jpg`,
    `${WM}6/6e/Achanakmar_Wildlife_Sanctuary.jpg/400px-Achanakmar_Wildlife_Sanctuary.jpg`,
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
    `${WMF}9/96/Raigarh_Palace_Chhattisgarh.jpg`,
    `${WM}3/33/Kawardha_Palace_Chhattisgarh.jpg/400px-Kawardha_Palace_Chhattisgarh.jpg`,
    `${CTB}888053-tklnajnxuz-1534070188.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Gomarda Wildlife Sanctuary': [
    `${WMF}8/82/Gomarda_Wildlife_Sanctuary_Raigarh.jpg`,
    `${WM}6/6e/Achanakmar_Wildlife_Sanctuary.jpg/400px-Achanakmar_Wildlife_Sanctuary.jpg`,
    `${CTB}888053-tklnajnxuz-1534070188.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Singhpur Cave Art': [
    `${WM}0/09/Singhpur_Rock_Art_Chhattisgarh.jpg/800px-Singhpur_Rock_Art_Chhattisgarh.jpg`,
    `${WM}0/09/Singhpur_Rock_Art_Chhattisgarh.jpg/400px-Singhpur_Rock_Art_Chhattisgarh.jpg`,
    `${CTB}888053-tklnajnxuz-1534070188.jpg`,
    `${WM}d/d8/Jogimarha_Cave_Ramgarh.jpg/400px-Jogimarha_Cave_Ramgarh.jpg`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // SAKTI
  // ══════════════════════════════════════════════════════════════════════
  'Chandrahasini Devi Temple': [
    `${WM}5/5c/Chandrahasini_Devi_Temple_Chandrapur.jpg/800px-Chandrahasini_Devi_Temple_Chandrapur.jpg`,
    `${WM}5/5c/Chandrahasini_Devi_Temple_Chandrapur.jpg/400px-Chandrahasini_Devi_Temple_Chandrapur.jpg`,
    `${CTBP}Maa_Beri_Wali_Mandir.jpg`,
    `${CTB}888053-tklnajnxuz-1534070188.jpg`,
  ],
  'Mahanadi River Banks': [
    `${WM}c/c4/Mahanadi_river_Chhattisgarh.jpg/800px-Mahanadi_river_Chhattisgarh.jpg`,
    `${WM}c/c4/Mahanadi_river_Chhattisgarh.jpg/400px-Mahanadi_river_Chhattisgarh.jpg`,
    `${CTBP}Maa_Beri_Wali_Mandir.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // SARANGARH-BILAIGARH
  // ══════════════════════════════════════════════════════════════════════
  'Sarangarh Palace': [
    `${WMF}b/b5/Sarangarh_Palace_Chhattisgarh.jpg`,
    `${WM}3/33/Kawardha_Palace_Chhattisgarh.jpg/400px-Kawardha_Palace_Chhattisgarh.jpg`,
    `${CTB}mahasamund-2.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Bilaigarh Temple Complex': [
    `${WMF}4/41/Bilaigarh_temple_Chhattisgarh.jpg`,
    `${WM}9/93/Rajiv_Lochan_temple%2C_Rajim.jpg/400px-Rajiv_Lochan_temple%2C_Rajim.jpg`,
    `${CTB}mahasamund-2.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ══════════════════════════════════════════════════════════════════════
  // SUKMA
  // ══════════════════════════════════════════════════════════════════════
  'Sabari River Tribal Trail': [
    `${CTBP}Screenshot%202025-07-23%20144113.png`,
    `${WMF}5/55/Sabari_river_Sukma_Chhattisgarh.jpg`,
    `${WM}d/d8/Indravati_river_Bijapur.jpg/400px-Indravati_river_Bijapur.jpg`,
    `${CTB}001a7d7f9.jpg`,
  ],
  'Minpa Waterfall': [
    `${CTBP}Screenshot%202025-07-23%20144113.png`,
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
    `${WMF}9/9c/Tamor_Pingla_wildlife_Surajpur.jpg`,
    `${WM}6/6e/Achanakmar_Wildlife_Sanctuary.jpg/400px-Achanakmar_Wildlife_Sanctuary.jpg`,
    `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Chhatauni Waterfall': [
    `${WMF}1/1a/Chhatauni_waterfall_Surajpur.jpg`,
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
  'Korba':           `${CTBP}%28%E0%A4%AE%E0%A4%B9%E0%A4%BF%E0%A4%B7%E0%A4%BE%E0%A4%B8%E0%A5%81%E0%A4%B0_%E0%A4%AE%E0%A4%B0%E0%A5%8D%E0%A4%A6%E0%A4%BF%E0%A4%A8%E0%A5%80_%E0%A4%AE%E0%A4%82%E0%A4%A6%E0%A4%BF%E0%A4%B0%2C_%E0%A4%9A%E0%A5%88%E0%A4%A4%E0%A5%81%E0%A4%B0%E0%A4%97%E0%A4%A2%2C_%E0%A4%95%E0%A5%8B%E0%A4%B0%E0%A4%AC%E0%A4%BE%29_Mahishasur_Mardini_temple_Chaiturgarh_Korba%2C_Chhattisgarh.jpg`,
  'Surguja':         `${CTB}Sarguja%20Palace%20Ambikapur.JPG`,
  'Mahasamund':      `${CTB}mahasamund-2.jpg`,
  'Dhamtari':        `${CTB}gangrel-bandh-image.webp`,
  'Gariyaband':      `${CTB}2019-08-25.jpg`,
  'Kabirdham':       `${CTB}Kabir%20Dham-Madwa%20MahalBhoramdeo36a52e.jpg`,
  'Jashpur':         `${CTB}jogimaracave.jpg`,
  'Korea':           `${CTBP}Koriya_palace_04.jpg`,
  'Dantewada':       `${CTB}0011122_Dantewada_Danteswari_Mata_Mandir_Chattisgarh_007.jpg`,
  'Kanker':          `${CTB}kanker-1.jpg`,
  'Kondagaon':       `${CTB}001a7d7f9.jpg`,
  'Balod':           `${CTB}2022110365.jpg`,
  'Baloda Bazar':    `${CTB}baloda-bazar-navapara.jpg`,
  'Balrampur':       `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`,
  'Bemetara':        `${CTB}12th_century_Sita_Mandir_HIndu_temple_Deorbeeja,_Bemetara_district,_Chhattisgarh_-_2.jpg`,
  'Bijapur':         `${CTB}2024071917.png`,
  'Gaurela-Pendra-Marwahi': `${CTB}go7.webp`,
  'Janjgir-Champa':  `${CTB}888053-tklnajnxuz-1534070188.jpg`,
  'Khairagarh-Chhuikhadan-Gandai': `${CTB}rajnandgaon.png`,
  'Manendragarh-Chirmiri-Bharatpur': `${CTB}go7.webp`,
  'Mohla-Manpur-Ambagarh Chowki': `${CTB}2019-08-25.jpg`,
  'Mungeli':         `${CTB}mungeli-maon.jpg`,
  'Narayanpur':      `${CTB}001a7d7f9.jpg`,
  'Raigarh':         `${CTB}888053-tklnajnxuz-1534070188.jpg`,
  'Sakti':           `${CTBP}Maa_Beri_Wali_Mandir.jpg`,
  'Sarangarh-Bilaigarh': `${CTB}mahasamund-2.jpg`,
  'Sukma':           `${CTBP}Screenshot%202025-07-23%20144113.png`,
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
    `${WM}9/93/Rajiv_Lochan_temple%2C_Rajim.jpg/800px-Rajiv_Lochan_temple%2C_Rajim.jpg`,
    `${WM}9/93/Rajiv_Lochan_temple%2C_Rajim.jpg/400px-Rajiv_Lochan_temple%2C_Rajim.jpg`,
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
    `${WM}9/93/Rajiv_Lochan_temple%2C_Rajim.jpg/400px-Rajiv_Lochan_temple%2C_Rajim.jpg`,
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
    `${WM}9/93/Rajiv_Lochan_temple%2C_Rajim.jpg/400px-Rajiv_Lochan_temple%2C_Rajim.jpg`,
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
    `${WM}0/0e/Mahamaya_Temple%2C_Ratanpur.jpg/800px-Mahamaya_Temple%2C_Ratanpur.jpg`,
    `${WM}0/0e/Mahamaya_Temple%2C_Ratanpur.jpg/400px-Mahamaya_Temple%2C_Ratanpur.jpg`,
    `${CTB}001%20(2).jpg`,
    `${WM}9/93/Rajiv_Lochan_temple%2C_Rajim.jpg/400px-Rajiv_Lochan_temple%2C_Rajim.jpg`,
  ],
  'Hatkeshwar Mahadev Temple': [
    `${WM}9/93/Rajiv_Lochan_temple%2C_Rajim.jpg/400px-Rajiv_Lochan_temple%2C_Rajim.jpg`,
    `${CTB}001%20(2).jpg`,
    `${WM}0/0e/Mahamaya_Temple%2C_Ratanpur.jpg/400px-Mahamaya_Temple%2C_Ratanpur.jpg`,
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
    `${WM}b/b7/Mahant_Ghasidas_Memorial_Museum%2C_Raipur.jpg/400px-Mahant_Ghasidas_Memorial_Museum%2C_Raipur.jpg`,
    `${CTB}001%20(2).jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Kaushalya Mata Temple Chandkhuri': [
    `${WM}9/93/Rajiv_Lochan_temple%2C_Rajim.jpg/800px-Rajiv_Lochan_temple%2C_Rajim.jpg`,
    `${WM}9/93/Rajiv_Lochan_temple%2C_Rajim.jpg/400px-Rajiv_Lochan_temple%2C_Rajim.jpg`,
    `${CTB}001%20(2).jpg`,
    `${WM}0/0e/Mahamaya_Temple%2C_Ratanpur.jpg/400px-Mahamaya_Temple%2C_Ratanpur.jpg`,
  ],
  'Marine Drive Raipur': [
    `${WM}e/e9/Vivekananda_Sarovar_Raipur.jpg/800px-Vivekananda_Sarovar_Raipur.jpg`,
    `${WM}e/e9/Vivekananda_Sarovar_Raipur.jpg/400px-Vivekananda_Sarovar_Raipur.jpg`,
    `${CTB}3%20(2).jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
};
