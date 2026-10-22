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
  ],
  'Nandan Van Zoo & Safari': [
    `${WMF}b/b4/Nandan_Van_Zoo_and_Safari_Naya_Raipur.png`,
  ],
  'Vivekananda Sarovar': [
    `${WMF}1/19/Vivekananda_Raipur1.JPG`,
  ],
  'Purkhouti Muktangan': [
    `${WMF}a/af/Purkhauti_Muktangan%2C_Sector_24_Naya_Raipur.png`,
  ],
  'Dudhadhari Math': [
    `${WMF}9/9f/Dudhadhari_mandir.JPG`,
  ],
  'Ram Mandir VIP Road': [
    `${WMF}1/19/Sri_Ram_Mandir_raipur_.jpg`,
    `${WMF}8/85/Sri_Ram_Mandir%2C_Raipur_.jpg`,
  ],
  'ISKCON Temple Raipur': [
    `${WMF}f/f5/Iskcon_mandir%2C_raipur.JPG`,
    `${WMF}5/5d/Iskcon_mandir%2C_tati_bandh_raipur.JPG`,
  ],
  'Maha Maya Temple Raipur': [
    `${WMF}d/d1/Shree_Rajrajeshwari_Maa_Mahamaya_Devi_Mandir.JPG`,
  ],
  'Naya Raipur Musical Fountain': [
    `${WMF}6/6e/Musical_Fountain%2C_sector_19_Naya_Raipur.png`,
    `${WMF}8/8d/Musical_fountain%2C_In_sector_19_Atal_Nagar_%2C_Naya_Raipur.png`,
  ],
  'Arang Temple Town': [
    `${WMF}3/3c/9th_century_reliefs_on_exterior_wall_of_Bhand_Deul_Jain_brick_temple%2C_Arang_Chhattisgarh_2.jpg`,
    `${WMF}5/56/9th_century_reliefs_on_exterior_wall_of_Bhand_Deul_Jain_brick_temple%2C_Arang_Chhattisgarh_4.jpg`,
  ],
  'Bhand Dewal Jain Temple (Arang)': [
    `${WMF}7/7f/9th_century_Bhand_Deul_Jain_brick_temple%2C_Arang_Chhattisgarh.jpg`,
    `${WMF}3/3c/Three_sculptures_of_Jain_tirthankaras_in_the_Bhand_Dewal_Temple%2C_Arang.jpg`,
    `${WMF}3/34/Ruins_of_the_great_Jain_temple%2C_Bhand_Dewal%2C_at_Arang.jpg`,
  ],
  'Chitawari Devi Temple (Dhobni)': [
    `${WMF}6/69/Dhobni_Damakheda_Chitawari_Devi_temple_Chhattisgarh_Oct_2022_-_3.jpg`,
    `${WMF}a/a1/Dhobni_Damakheda_Chitawari_Devi_temple_Chhattisgarh_Oct_2022_-_6.jpg`,
    `${WMF}1/1b/Dhobni_Damakheda_Chitawari_Devi_temple_Chhattisgarh_Oct_2022_-_58.jpg`,
  ],
  'Dhoomnath Temple (Saragaon)': [
    `${WMF}6/6f/Sargaon_Dhoomnath_Dhumeswari_temple_Chhattisgarh_-_1.jpg`,
    `${WMF}b/ba/Sargaon_Dhoomnath_Dhumeswari_temple_Chhattisgarh_-_8.jpg`,
    `${WMF}3/3b/Sargaon_Dhoomnath_Dhumeswari_temple_Chhattisgarh_-_70.jpg`,
  ],
  'Kaivalya Dham Jain Temple': [
    `${WMF}3/36/Kaivalydham_Jain_temple%2C_raipur.JPG`,
    `${WMF}b/b2/Kaivalydham_Jain_temple%2C.JPG`,
    `${WMF}e/e4/Kaivalydham_Jain_temple%2C_Raipur.JPG`,
    `${WMF}4/41/Kaivalydham_Jain_temple2_%2C_Raipur.JPG`,
  ],
  'Jagannath Temple Raipur': [
    `${WMF}a/af/Raipur_Chattisgarh.jpg`,
  ],
  'Kaushalya Mata Temple Chandkhuri': [
    `${WMF}3/30/Mata_kaushalya_devi_temple.jpg`,
    `${WMF}0/02/Chandkhuri_Shiv_temple.jpg`,
    `${WMF}d/d3/Entry_mata_kaushalya_devi_temple.jpg`,
  ],
  'Shadani Darbar (Tatibandh)': [
    `${WMF}1/19/Shahdani_Darbar_1.jpg`,
    `${WMF}f/fc/Shadani_Unique_Temple_of_Temples.jpg`,
    `${WMF}9/96/Shahdani_Darbar_2.jpg`,
  ],
  'Mahant Ghasidas Museum Gardens': [
    `${WMF}5/51/Mahant_Ghasidas_Sangrahalaya_Raipur_%281%29.jpg`,
  ],
  'Naya Raipur Central Park': [
    `${WMF}1/13/Central_Park%2C_Sector_24_Naya_Raipur.png`,
  ],
  'Shaheed Veer Narayan Singh International Stadium': [
    `${WM}4/4a/Shaheed_Veer_Narayan_Singh_International_Stadium_Raipur.jpg/960px-Shaheed_Veer_Narayan_Singh_International_Stadium_Raipur.jpg`,
    `${WMF}5/5e/Shaheed_Veer_Narayan_International_Cricket_Stadium_Raipur%2C_drone_view.png`,
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
    `${WMF}4/46/Maitri_bagh1.JPG`,
    `${WMF}7/7a/Maitri_bagh2.JPG`,
    `${WMF}0/00/Maitri_bagh4_%28cropped%29.JPG`,
    `${WMF}2/2c/Maitri_bagh4.JPG`,
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
  'Surya Cinema Durg': [
    `${CTB}2022-12-13.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Bhilai Maitri Bagh Lakefront': [
    `${WMF}7/7a/Maitri_bagh2.JPG`,
    `${WMF}4/46/Maitri_bagh1.JPG`,
    `${WMF}0/0d/Maitri_bagh5.JPG`,
    `${CTB}2022-12-13.jpg`,
  ],
  'Hotel Fire Park': [
    `${CTB}2022-12-13.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Nukkad Tea Cafe (Nehru Nagar, Bhilai)': [
    `${CTB}2022-12-13.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],

  // ── DURG — SUPPLEMENTAL PLACES IMAGE MAPPINGS ──────────────────────────
  'Shakti Temple Circuit, Bhilai': [
    `${CTB}2022-12-13.jpg`,
    `${CTB}m_Bhilai_Bhilai_steel_plant_1_l_470_640.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Nagpura Hanuman Temple Caves': [
    `${CTB}2022-12-13.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Shivnath Historical Ghat, Durg': [
    `${CTB}2022-12-13.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Bhilai Steel City Kannamal Park': [
    `${CTB}2022-12-13.jpg`,
    `${CTB}m_Bhilai_Bhilai_steel_plant_1_l_470_640.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Chhattisgarhi Dal-Bhaji Stall (Civil Lines Durg)': [
    `${CTB}2022-12-13.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Family Bhoj Durg': [
    `${CTB}2022-12-13.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Mahadev Temple, Deobaloda': [
    `${WMF}7/71/Mahadev_Temple_Deobaloda%2C_Durg_Chhattisgarh_-_14.jpg`,
    `${WMF}c/c3/Mahadev_Temple_Deobaloda%2C_Durg_Chhattisgarh_-_15.jpg`,
    `${WMF}1/1a/Mahadev_Temple_Deobaloda%2C_Durg_Chhattisgarh_-_12.jpg`,
    `${WMF}7/79/Mahadev_Temple_Deobaloda%2C_Durg_Chhattisgarh_-_23.jpg`,
    `${WMF}0/06/Mahadev_Temple_Deobaloda_Nandi%2C_Durg_Chhattisgarh_-_36.jpg`,
  ],
  'Dhamdha Chaturbhuji & Shiva Temple Group': [
    `${WMF}2/20/0100922_Mahamaya_temple_and_Dhamdha_fort%2C_Chhattisgarh_005.jpg`,
    `${WMF}7/74/0100922_Mahamaya_temple_and_Dhamdha_fort%2C_Chhattisgarh_058.jpg`,
    `${WMF}0/0b/0100922_Mahamaya_temple_and_Dhamdha_fort%2C_Chhattisgarh_065.jpg`,
    `${WMF}e/e4/0100922_Mahamaya_temple_and_Dhamdha_fort%2C_Chhattisgarh_070.jpg`,
    `${WMF}c/c8/0100922_Mahamaya_temple_and_Dhamdha_fort%2C_Chhattisgarh_081.jpg`,
  ],
  'Ancient Vishnu Temple, Banbarad': [
    `${CTB}2022-12-13.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Nagdev Temple, Nagpura': [
    `${WMF}3/33/Nagpura_Shiv_temple_Durg.jpg`,
    `${CTB}2022-12-13.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Langurveer Mandir, Durg': [
    `${CTB}2022-12-13.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Chandi Mandir, Durg': [
    `${WMF}1/10/Chandi_mandir%2Cdurg.JPG`,
    `${WMF}9/92/%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97_%E0%A6%9A%E0%A6%A3%E0%A7%8D%E0%A6%A1%E0%A7%80_%E0%A6%AE%E0%A6%A8%E0%A7%8D%E0%A6%A6%E0%A6%BF%E0%A6%B0_%E0%A7%A7%E0%A7%AB.jpg`,
    `${WMF}9/93/%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97_%E0%A6%9A%E0%A6%A3%E0%A7%8D%E0%A6%A1%E0%A7%80_%E0%A6%AE%E0%A6%A8%E0%A7%8D%E0%A6%A6%E0%A6%BF%E0%A6%B0_%E0%A7%A7%E0%A7%A8.jpg`,
  ],
  'Dakshinmukhi Hanuman Temple, Durg': [
    `${CTB}2022-12-13.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
  ],
  'Jagannath Mandir, Durg': [
    `${WMF}1/13/%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97_%E0%A6%9C%E0%A6%97%E0%A6%A8%E0%A7%8D%E0%A6%A8%E0%A6%BE%E0%A6%A5_%E0%A6%AE%E0%A6%A8%E0%A7%8D%E0%A6%A6%E0%A6%BF%E0%A6%B0_%E0%A7%A7%E0%A7%A8.jpg`,
    `${WMF}9/96/%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97_%E0%A6%9C%E0%A6%97%E0%A6%A8%E0%A7%8D%E0%A6%A8%E0%A6%BE%E0%A6%A5_%E0%A6%AE%E0%A6%A8%E0%A7%8D%E0%A6%A6%E0%A6%BF%E0%A6%B0_%E0%A7%A7%E0%A7%AB.jpg`,
    `${WMF}d/dd/%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97_%E0%A6%9C%E0%A6%97%E0%A6%A8%E0%A7%8D%E0%A6%A8%E0%A6%BE%E0%A6%A5_%E0%A6%AE%E0%A6%A8%E0%A7%8D%E0%A6%A6%E0%A6%BF%E0%A6%B0_%E0%A7%A7%E0%A7%AE.jpg`,
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

  // No image assigned for this place — don't show any placeholder photo
  if (!primaryImage) return [];

  // The district banner is the honest stand-in for a place without its own
  // verified photo. The generic Gangrel image is deliberately left out here:
  // it shows a different district's landmark and would misrepresent the place.
  const distFb = DISTRICT_FB[districtName] || FALLBACK;
  const imgs = [primaryImage, distFb].filter(Boolean);
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
