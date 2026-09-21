const hi = {
  'Raipur': { name: 'रायपुर', highlights: 'राज्य की राजधानी', desc: 'आधुनिक सुविधाओं और जीवंत संस्कृति वाला राजधानी शहर' },
  'Bilaspur': { name: 'बिलासपुर', highlights: 'विरासत और संस्कृति', desc: 'समृद्ध विरासत वाला छत्तीसगढ़ का चावल का कटोरा' },
  'Bastar': { name: 'बस्तर', highlights: 'आदिवासी विरासत', desc: 'झरनों, आदिवासी संस्कृति और घने जंगलों की भूमि' },
  'Durg': { name: 'दुर्ग', highlights: 'इस्पात नगरी', desc: 'मंदिरों और सांस्कृतिक समृद्धि वाला औद्योगिक केंद्र' },
  'Rajnandgaon': { name: 'राजनांदगांव', highlights: 'मंदिर नगरी', desc: 'प्रसिद्ध पहाड़ी मंदिरों वाला सांस्कृतिक और धार्मिक केंद्र' },
  'Korba': { name: 'कोरबा', highlights: 'ऊर्जा नगरी', desc: 'मनमोहक प्राकृतिक झरनों वाली ऊर्जा नगरी' },
  'Surguja': { name: 'सरगुजा', highlights: 'मैनपाट – मिनी तिब्बत', desc: 'पहाड़ी स्टेशन, मिनी तिब्बत और प्राचीन गुफाएँ' },
  'Mahasamund': { name: 'महासमुंद', highlights: 'सिरपुर विरासत', desc: 'प्राचीन पुरातात्विक खजाने और विरासत स्थल' },
  'Dhamtari': { name: 'धमतरी', highlights: 'सिहावा पर्वतमाला', desc: 'प्रकृति, वन्यजीव और जल क्रीड़ा का स्वर्ग' },
  'Gariyaband': { name: 'गरियाबंद', highlights: 'जटमाई मंदिर', desc: 'वनांचल में धार्मिक और प्राकृतिक आश्चर्य' },
  'Kabirdham': { name: 'कबीरधाम', highlights: 'भोरमदेव मंदिर', desc: 'प्राचीन मंदिरों वाला छत्तीसगढ़ का खजुराहो' },
  'Jashpur': { name: 'जशपुर', highlights: 'कैलाश गुफाएँ', desc: 'चाय बागान, आदिवासी संस्कृति और सुंदर झरने' },
  'Korea': { name: 'कोरिया', highlights: 'अमृत धारा झरना', desc: 'अमृत धारा झरना और घने हाथी वन' },
  'Dantewada': { name: 'दंतेवाड़ा', highlights: 'दंतेश्वरी मंदिर', desc: 'दंतेश्वरी शक्तिपीठ — बस्तर की आत्मा' },
  'Kanker': { name: 'कांकेर', highlights: 'कांकेर जंगल कैंप', desc: 'जंगल कैंप, विरासत महल और आदिवासी मार्ग' },
  'Kondagaon': { name: 'कोंडागांव', highlights: 'बस्तर शिल्प', desc: 'आदिवासी शिल्प राजधानी और बस्तर कला का प्रवेश द्वार' },
  'Balod': { name: 'बालोद', highlights: 'तांदुला घाटी और छिपे मंदिर', desc: 'छिपे खजाने — पवित्र मंदिर, वन झरने और शांत ग्रामीण दृश्य' },
  'Baloda Bazar': { name: 'बालोदा बाज़ार', highlights: 'तुरतुरिया आश्रम', desc: 'तुरतुरिया तीर्थ स्थल और प्राचीन विरासत' },
  'Balrampur': { name: 'बलरामपुर', highlights: 'तातापानी और झरने', desc: 'उत्तर छत्तीसगढ़ में झरने, जंगल और आदिवासी संस्कृति' },
  'Bemetara': { name: 'बेमेतरा', highlights: 'ग्रामीण विरासत', desc: 'मंदिरों और ग्रामीण विरासत वाला कृषि क्षेत्र' },
  'Bijapur': { name: 'बीजापुर', highlights: 'इंद्रावती राष्ट्रीय उद्यान', desc: 'बस्तर की सुदूर सीमा, स्वच्छ नदियाँ और आदिवासी जीवन' },
  'Gaurela-Pendra-Marwahi': { name: 'गौरेला-पेंड्रा-मरवाही', highlights: 'पेंड्रा पहाड़ियाँ', desc: 'वन पहाड़ियों और आदिवासी सौंदर्य वाला सबसे नया जिला' },
  'Janjgir-Champa': { name: 'जांजगीर-चांपा', highlights: 'शक्तिपीठ मंदिर', desc: 'प्राचीन शक्तिपीठ और महानदी तट की विरासत' },
  'Khairagarh-Chhuikhadan-Gandai': { name: 'खैरागढ़-छुईखदान-गंडई', highlights: 'संगीत विश्वविद्यालय', desc: 'संगीत विरासत, पहाड़ियाँ और वन परिदृश्य' },
  'Manendragarh-Chirmiri-Bharatpur': { name: 'मनेन्द्रगढ़-चिरमिरी-भरतपुर', highlights: 'हसदेव घाटी', desc: 'जंगलों और खूबसूरत घाटियों वाला कोयला खनन कस्बा' },
  'Mohla-Manpur-Ambagarh Chowki': { name: 'मोहला-मानपुर-अंबागढ़ चौकी', highlights: 'कांगेर वन', desc: 'जंगलों, झरनों और वन्यजीवों वाला आदिवासी क्षेत्र' },
  'Mungeli': { name: 'मुंगेली', highlights: 'टाइगर रिजर्व प्रवेश द्वार', desc: 'अचानकमार प्रवेश द्वार और प्राचीन मंदिर विरासत' },
  'Narayanpur': { name: 'नारायणपुर', highlights: 'अबूझमाड़ वन', desc: 'सुदूर अबूझमाड़ क्षेत्र, अछूते वन' },
  'Raigarh': { name: 'रायगढ़', highlights: 'कथक विरासत', desc: 'चक्रधर कला के साथ छत्तीसगढ़ की सांस्कृतिक राजधानी' },
  'Sakti': { name: 'सक्ती', highlights: 'जांजगीर मंदिर', desc: 'मंदिरों और ग्रामीण विरासत वाला नया जिला' },
  'Sarangarh-Bilaigarh': { name: 'सारंगढ़-बिलाईगढ़', highlights: 'सारंगढ़ महल', desc: 'राजसी विरासत महल और नदी तट के मंदिर' },
  'Sukma': { name: 'सुकमा', highlights: 'साबरी नदी', desc: 'साबरी नदी और आदिवासी विरासत वाला सुदूर बस्तर' },
  'Surajpur': { name: 'सूरजपुर', highlights: 'तमोर पिंगला', desc: 'उत्तर छत्तीसगढ़ के जंगल, नदियाँ और वन्यजीव' },
};

const cg = {
  'Raipur': { name: 'रायपुर', highlights: 'राज्य के राजधानी', desc: 'आधुनिक सुविधा अउ जिंदादिल संस्कृति वाले राजधानी शहर' },
  'Bilaspur': { name: 'बिलासपुर', highlights: 'विरासत अउ संस्कृति', desc: 'समृद्ध विरासत वाला छत्तीसगढ़ के चाउर के कटोरा' },
  'Bastar': { name: 'बस्तर', highlights: 'अनुसुआ विरासत', desc: 'झरना, अनुसुआ संस्कृति अउ घन बन-जंगल के भूमि' },
  'Durg': { name: 'दुर्ग', highlights: 'लोहा नगरी', desc: 'मंदिर अउ सांस्कृतिक समृद्धि वाला औद्योगिक केंद्र' },
  'Rajnandgaon': { name: 'राजनांदगांव', highlights: 'मंदिर नगरी', desc: 'मसहूर पहाड़ी मंदिर वाला सांस्कृतिक अउ धार्मिक केंद्र' },
  'Korba': { name: 'कोरबा', highlights: 'ऊर्जा नगरी', desc: 'मोहनी प्राकृतिक झरना वाला ऊर्जा नगरी' },
  'Surguja': { name: 'सरगुजा', highlights: 'मैनपाट – मिनी तिब्बत', desc: 'पहाड़ी स्टेशन, मिनी तिब्बत अउ पुराना गुफा' },
  'Mahasamund': { name: 'महासमुंद', highlights: 'सिरपुर विरासत', desc: 'पुराना पुरातात्विक खजाना अउ विरासत जगह' },
  'Dhamtari': { name: 'धमतरी', highlights: 'सिहावा पहाड़ी', desc: 'प्रकृति, वनजीव अउ पानी खेल के स्वर्ग' },
  'Gariyaband': { name: 'गरियाबंद', highlights: 'जटमाई मंदिर', desc: 'बन-जंगल म धार्मिक अउ प्राकृतिक अचरज' },
  'Kabirdham': { name: 'कबीरधाम', highlights: 'भोरमदेव मंदिर', desc: 'पुराना मंदिर वाला छत्तीसगढ़ के खजुराहो' },
  'Jashpur': { name: 'जशपुर', highlights: 'कैलाश गुफा', desc: 'चाय बगान, अनुसुआ संस्कृति अउ सुंदर झरना' },
  'Korea': { name: 'कोरिया', highlights: 'अमृत धारा झरना', desc: 'अमृत धारा झरना अउ घन हाथी जंगल' },
  'Dantewada': { name: 'दंतेवाड़ा', highlights: 'दंतेश्वरी मंदिर', desc: 'दंतेश्वरी शक्तिपीठ — बस्तर के आत्मा' },
  'Kanker': { name: 'कांकेर', highlights: 'कांकेर जंगल कैंप', desc: 'जंगल कैंप, विरासत महल अउ अनुसुआ रास्ता' },
  'Kondagaon': { name: 'कोंडागांव', highlights: 'बस्तर शिल्प', desc: 'अनुसुआ शिल्प के राजधानी अउ बस्तर कला के दुआरी' },
  'Balod': { name: 'बालोद', highlights: 'तांदुला घाटी अउ छिपे मंदिर', desc: 'छिपा खजाना — पवित्र मंदिर, जंगल झरना अउ शांत गांव' },
  'Baloda Bazar': { name: 'बालोदा बाज़ार', highlights: 'तुरतुरिया आश्रम', desc: 'तुरतुरिया तीर्थ जगह अउ पुराना विरासत' },
  'Balrampur': { name: 'बलरामपुर', highlights: 'तातापानी अउ झरना', desc: 'उत्तर छत्तीसगढ़ के झरना, जंगल अउ अनुसुआ संस्कृति' },
  'Bemetara': { name: 'बेमेतरा', highlights: 'गांव के विरासत', desc: 'मंदिर अउ गांव के विरासत वाला खेती इलाका' },
  'Bijapur': { name: 'बीजापुर', highlights: 'इंद्रावती राष्ट्रीय उद्यान', desc: 'बस्तर के दूर सीमा, साफ नदी अउ अनुसुआ जीवन' },
  'Gaurela-Pendra-Marwahi': { name: 'गौरेला-पेंड्रा-मरवाही', highlights: 'पेंड्रा पहाड़ी', desc: 'बन पहाड़ी अउ अनुसुआ सुंदरता वाला सबसे नवा जिला' },
  'Janjgir-Champa': { name: 'जांजगीर-चांपा', highlights: 'शक्तिपीठ मंदिर', desc: 'पुराना शक्तिपीठ अउ महानदी किनारे के विरासत' },
  'Khairagarh-Chhuikhadan-Gandai': { name: 'खैरागढ़-छुईखदान-गंडई', highlights: 'संगीत विश्वविद्यालय', desc: 'संगीत विरासत, पहाड़ी अउ बन जंगल' },
  'Manendragarh-Chirmiri-Bharatpur': { name: 'मनेन्द्रगढ़-चिरमिरी-भरतपुर', highlights: 'हसदेव घाटी', desc: 'जंगल अउ सुंदर घाटी वाला कोयला खदान कस्बा' },
  'Mohla-Manpur-Ambagarh Chowki': { name: 'मोहला-मानपुर-अंबागढ़ चौकी', highlights: 'कांगेर जंगल', desc: 'जंगल, झरना अउ वनजीव वाला अनुसुआ इलाका' },
  'Mungeli': { name: 'मुंगेली', highlights: 'टाइगर रिजर्व दुआरी', desc: 'अचानकमार दुआरी अउ पुराना मंदिर विरासत' },
  'Narayanpur': { name: 'नारायणपुर', highlights: 'अबूझमाड़ जंगल', desc: 'दूर अबूझमाड़ इलाका, अछूत जंगल' },
  'Raigarh': { name: 'रायगढ़', highlights: 'कथक विरासत', desc: 'चक्रधर कला संग छत्तीसगढ़ के सांस्कृतिक राजधानी' },
  'Sakti': { name: 'सक्ती', highlights: 'जांजगीर मंदिर', desc: 'मंदिर अउ गांव के विरासत वाला नवा जिला' },
  'Sarangarh-Bilaigarh': { name: 'सारंगढ़-बिलाईगढ़', highlights: 'सारंगढ़ महल', desc: 'राजसी विरासत महल अउ नदी किनारे के मंदिर' },
  'Sukma': { name: 'सुकमा', highlights: 'साबरी नदी', desc: 'साबरी नदी अउ अनुसुआ विरासत वाला दूर बस्तर' },
  'Surajpur': { name: 'सूरजपुर', highlights: 'तमोर पिंगला', desc: 'उत्तर छत्तीसगढ़ के जंगल, नदी अउ वनजीव' },
};

const data = { hi, cg };

export function localizeDistrict(lang, district) {
  if (lang !== 'hi' && lang !== 'cg') return district;
  const t = data[lang]?.[district.name];
  if (!t) return district;
  return {
    ...district,
    name: t.name || district.name,
    highlights: t.highlights || district.highlights,
    desc: t.desc || district.desc,
  };
}

export function districtName(lang, district) {
  return localizeDistrict(lang, district).name;
}