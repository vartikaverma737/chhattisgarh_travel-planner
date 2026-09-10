import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Sun, Cloud, Menu, X, Search, Heart, Share2, Droplet, Mountain, Camera, TreePine, Map, Navigation, Phone, Clock, Info } from 'lucide-react';

export default function IncredibleIndiaInspired() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  const heroImages = [
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&h=900&fit=crop"
  ];

  const destinations = [
    {
      name: 'Bilaspur',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop',
      desc: 'Ancient heritage & natural beauty',
      highlights: 'Rice bowl of India',
      coordinates: { lat: 22.0797, lng: 82.1409 },
      detailedInfo: {
        overview: 'Bilaspur, known as the "Rice Bowl of India," is a city rich in cultural heritage and natural beauty. Located in the heart of Chhattisgarh, it offers a perfect blend of historical monuments, temples, and scenic landscapes.',
        attractions: ['Ratanpur Fort', 'Achanakmar Wildlife Sanctuary', 'Khutaghat Dam', 'Malhar Archaeological Site', 'Tala Village'],
        bestTime: 'October to March',
        howToReach: 'Well connected by rail and road. Bilaspur Junction is a major railway hub. Nearest airport is Swami Vivekananda Airport, Raipur (110 km).',
        specialties: ['Bell Metal Craft', 'Kosa Silk', 'Traditional Rice Varieties'],
        activities: ['Temple visits', 'Wildlife safari', 'Historical exploration', 'Shopping for handicrafts'],
        distance: ''
      }
    },
    {
      name: 'Jagdalpur',
      image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&h=400&fit=crop',
      desc: 'Waterfalls & tribal culture',
      highlights: 'Gateway to Bastar',
      coordinates: { lat: 19.0728, lng: 82.0149 },
      detailedInfo: {
        overview: 'Jagdalpur is the headquarters of Bastar district and serves as the gateway to the tribal heartland of Chhattisgarh. Famous for its stunning waterfalls, dense forests, and rich tribal culture, it offers an authentic experience of indigenous traditions.',
        attractions: ['Chitrakote Falls', 'Tirathgarh Falls', 'Kanger Valley National Park', 'Bastar Palace', 'Anthropological Museum', 'Danteshwari Temple'],
        bestTime: 'October to March',
        howToReach: 'Maa Danteshwari Airport connects to major cities. Well connected by road from Raipur (300 km). Regular bus services available.',
        specialties: ['Dhokra Metal Craft', 'Wrought Iron Work', 'Tribal Art', 'Bastar Dussehra Festival'],
        activities: ['Waterfall exploration', 'Tribal village visits', 'Wildlife spotting', 'Shopping for tribal handicrafts', 'Attending local festivals'],
        distance: '300 km from Raipur'
      }
    },
    {
      name: 'Raipur',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop',
      desc: 'Capital city vibrancy',
      highlights: 'Modern urban center',
      coordinates: { lat: 21.2514, lng: 81.6296 },
      detailedInfo: {
        overview: 'Raipur, the capital city of Chhattisgarh, is a rapidly developing urban center that beautifully balances modernity with tradition. Known for its steel plants and growing IT sector, it also preserves ancient temples and cultural heritage.',
        attractions: ['Mahant Ghasidas Memorial Museum', 'Nandan Van Zoo', 'Vivekananda Sarovar', 'Purkhouti Muktangan', 'Champaran', 'Marine Drive'],
        bestTime: 'October to February',
        howToReach: 'Swami Vivekananda Airport has excellent connectivity. Major railway junction with trains to all parts of India. Well-connected national highways.',
        specialties: ['Kosa Silk Sarees', 'Steel Industry', 'Educational Hub', 'Modern Shopping Complexes'],
        activities: ['City tours', 'Shopping', 'Temple visits', 'Lake boating', 'Cultural events', 'Fine dining'],
        distance: 'State Capital'
      }
    },
    {
      name: 'Mainpat',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      desc: 'Mini Tibet of India',
      highlights: 'Hill station paradise',
      coordinates: { lat: 23.0061, lng: 83.1475 },
      detailedInfo: {
        overview: 'Mainpat, often called the "Mini Tibet of India," is a serene hill station at 3,700 feet elevation. Home to a Tibetan refugee settlement since the 1960s, it offers stunning valley views, pleasant weather, and a unique cultural experience.',
        attractions: ['Tiger Point', 'Fish Point', 'Jaljali', 'Mehta Point', 'Tibetan Monasteries', 'Ulta Pani (reverse flowing water)'],
        bestTime: 'October to March (avoid monsoons)',
        howToReach: 'Nearest town is Ambikapur (60 km). Road journey from Ambikapur takes 2-3 hours. Nearest railway station: Ambikapur. Nearest airport: Raipur (350 km).',
        specialties: ['Tibetan Handicrafts', 'Momos', 'Thukpa', 'Organic Vegetables', 'Tibetan Butter Tea'],
        activities: ['Valley viewpoints', 'Tibetan monastery visits', 'Photography', 'Trekking', 'Camping', 'Trying Tibetan cuisine'],
        distance: '350 km from Raipur'
      }
    },
    {
      name: 'Sirpur',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop',
      desc: 'Ancient archaeological site',
      highlights: 'Buddhist heritage',
      coordinates: { lat: 21.1991, lng: 82.9544 },
      detailedInfo: {
        overview: 'Sirpur is one of the most significant archaeological sites in India, dating back to the 5th-8th centuries. Once the capital of South Kosala, it showcases remarkable Buddhist monasteries, Hindu temples, and Jain monuments.',
        attractions: ['Laxman Temple', 'Buddhist Viharas', 'Surang Tila', 'Gandhi Sagar Dam', 'Anand Prabhu Kuti Vihar'],
        bestTime: 'October to March',
        howToReach: 'Located 78 km from Raipur. Well connected by road. Regular buses from Raipur and Mahasamund. Nearest railway station: Mahasamund (35 km).',
        specialties: ['5th Century Architecture', 'Brick Temple Art', 'Archaeological Excavations', 'Ancient Sculptures'],
        activities: ['Archaeological site exploration', 'Temple visits', 'Photography', 'Historical study', 'River activities at Mahanadi'],
        distance: '78 km from Raipur'
      }
    },
    {
      name: 'Dongargarh',
      image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=600&h=400&fit=crop',
      desc: 'Spiritual hilltop temple',
      highlights: 'Bamleshwari Devi Temple',
      coordinates: { lat: 21.1892, lng: 80.7542 },
      detailedInfo: {
        overview: 'Dongargarh is a sacred pilgrimage town famous for the Bamleshwari Temple situated atop a 1,600-foot hill. Dedicated to Goddess Bamleshwari (a form of Durga), it attracts millions of devotees annually and offers panoramic views.',
        attractions: ['Bambleshwari Temple (Badi Bamblai)', 'Chhote Bamblai Temple', 'Ropeway', 'Sunset Point'],
        bestTime: 'October to March (Navratri is peak season)',
        howToReach: 'Located on National Highway 130, well connected to Raipur (95 km) and Rajnandgaon (40 km). Nearest railway station: Dongargarh on Howrah-Mumbai line. Nearest airport: Raipur (95 km).',
        specialties: ['Navratri Festival', 'Religious Significance', 'Hilltop Temple', 'Cable Car Ride', 'Local Prasad'],
        activities: ['Temple darshan', 'Ropeway ride', 'Climbing 1,100 steps', 'Attending aarti', 'Panoramic photography', 'Spiritual retreat'],
        distance: '95 km from Raipur'
      }
    }
  ];

  const attractions = [
    {
      title: 'Chitrakote Waterfalls',
      location: 'Jagdalpur, Bastar',
      image: 'https://images.unsplash.com/photo-1603794067602-9feaa4f70e0c?w=500&h=350&fit=crop',
      type: 'Waterfall',
      category: 'nature',
      description: 'Niagara Falls of India - 90 feet high horseshoe waterfall',
      bestTime: 'Jul-Oct',
      coordinates: { lat: 19.1963, lng: 81.7906 },
      detailedDescription: 'Chitrakote Falls is the widest waterfall in India, spanning 300 meters. Known as the "Niagara Falls of India," it cascades down from a height of 90 feet on the Indravati River. During monsoons, the falls transform into a spectacular horseshoe-shaped cascade.',
      timings: '8:00 AM - 6:00 PM',
      entryFee: '₹25 per person',
      distance: '38 km from Jagdalpur',
      nearbyAttractions: ['Tirathgarh Falls', 'Kanger Valley', 'Mendri Ghumar Falls']
    },
    {
      title: 'Danteshwari Temple',
      location: 'Dantewada, Bastar',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=350&fit=crop',
      type: 'Temple',
      category: 'spiritual',
      description: '52 Shakti Peethas - ancient shrine of Goddess Danteshwari',
      bestTime: 'Oct-Mar',
      coordinates: { lat: 18.8932, lng: 81.3489 },
      detailedDescription: 'One of the 52 Shakti Peethas, Danteshwari Temple is dedicated to Goddess Danteshwari, the presiding deity of Bastar. According to legend, the tooth (dant) of Goddess Sati fell here. The temple showcases beautiful South Indian architecture.',
      timings: '5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM',
      entryFee: 'Free',
      distance: '80 km from Jagdalpur',
      nearbyAttractions: ['Bailadila Iron Ore Mines', 'Barsur Temples']
    },
    {
      title: 'Kanger Valley National Park',
      location: 'Jagdalpur',
      image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=500&h=350&fit=crop',
      type: 'Wildlife',
      category: 'wildlife',
      description: 'Biosphere reserve with caves, wildlife & waterfalls',
      bestTime: 'Nov-Jun',
      coordinates: { lat: 18.8100, lng: 81.9600 },
      detailedDescription: 'A biodiversity hotspot spanning 200 sq km, Kanger Valley is home to tigers, leopards, wild boars, and over 120 bird species. The park features stunning limestone caves including Kotumsar, Kailash, and Dandak caves, along with the beautiful Tirathgarh Falls.',
      timings: '7:00 AM - 5:00 PM (Closed during monsoons)',
      entryFee: '₹50 Indians, ₹500 Foreigners',
      distance: '35 km from Jagdalpur',
      nearbyAttractions: ['Kotumsar Cave', 'Tirathgarh Falls', 'Kailash Cave']
    },
    {
      title: 'Bastar Palace',
      location: 'Jagdalpur',
      image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=500&h=350&fit=crop',
      type: 'Heritage',
      category: 'heritage',
      description: 'Royal residence of Bastar kings with unique architecture',
      bestTime: 'Oct-Mar',
      coordinates: { lat: 19.0788, lng: 82.0298 },
      detailedDescription: 'Built in the early 17th century, Bastar Palace showcases a unique blend of tribal and colonial architecture. The palace complex includes ancient structures, royal artifacts, and offers insights into the rich history of the Bastar dynasty.',
      timings: '10:00 AM - 5:00 PM',
      entryFee: '₹20 per person',
      distance: 'In Jagdalpur city',
      nearbyAttractions: ['Anthropological Museum', 'Dalpat Sagar Lake']
    },
    {
      title: 'Mainpat Hill Station',
      location: 'Surguja',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=350&fit=crop',
      type: 'Hill Station',
      category: 'nature',
      description: 'Tibetan settlement at 3700 ft with stunning valleys',
      bestTime: 'Oct-Mar',
      coordinates: { lat: 23.0061, lng: 83.1475 },
      detailedDescription: 'Mainpat is a picturesque plateau at 3,781 feet elevation, home to seven Tibetan settlements. Known for its lush green meadows, waterfalls, and panoramic valley views. The area maintains a cool climate year-round and offers unique Tibetan cultural experiences.',
      timings: 'Open 24/7',
      entryFee: 'Free',
      distance: '60 km from Ambikapur',
      nearbyAttractions: ['Tiger Point', 'Fish Point', 'Jaljali', 'Mehta Point']
    },
    {
      title: 'Dhudmaras Village',
      location: 'Bastar',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=350&fit=crop',
      type: 'Cultural',
      category: 'heritage',
      description: 'Traditional tribal village showcasing authentic Bastar culture',
      bestTime: 'Oct-Mar',
      coordinates: { lat: 19.2500, lng: 81.8500 },
      detailedDescription: 'Dhudmaras is an authentic tribal village where you can experience traditional Gond and Maria tribal culture. Witness traditional dance forms, tribal art, handicrafts, and the simple lifestyle that has remained unchanged for centuries.',
      timings: 'Daylight hours (Village visits)',
      entryFee: 'Free (Guide recommended)',
      distance: '50 km from Jagdalpur',
      nearbyAttractions: ['Chitrakote Falls', 'Tribal markets']
    },
    {
      title: 'Jatmai Mata Temple',
      location: 'Gariaband',
      image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=500&h=350&fit=crop',
      type: 'Temple',
      category: 'spiritual',
      description: 'Ancient temple atop hill surrounded by forests',
      bestTime: 'Oct-Apr',
      coordinates: { lat: 20.6367, lng: 82.0623 },
      detailedDescription: 'Perched on a hilltop amidst dense forests, Jatmai Temple is dedicated to Goddess Jatmai (Durga). The temple offers panoramic views of surrounding valleys and is a popular pilgrimage site, especially during Navratri when a major fair is held.',
      timings: '6:00 AM - 7:00 PM',
      entryFee: 'Free',
      distance: '100 km from Raipur',
      nearbyAttractions: ['Udanti Wildlife Sanctuary', 'Turturiya Waterfalls']
    },
    {
      title: 'Sirpur Archaeological Site',
      location: 'Mahasamund',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=500&h=350&fit=crop',
      type: 'Heritage',
      category: 'heritage',
      description: 'Buddhist monasteries & ancient temples from 5th century',
      bestTime: 'Oct-Mar',
      coordinates: { lat: 21.1991, lng: 82.9544 },
      detailedDescription: 'Sirpur was the capital of South Kosala from 5th-8th century CE. The site features remarkable brick temples including the UNESCO-nominated Laxman Temple, Buddhist monasteries, and over 100 archaeological structures discovered through excavations.',
      timings: '8:00 AM - 6:00 PM',
      entryFee: '₹15 per person',
      distance: '78 km from Raipur',
      nearbyAttractions: ['Laxman Temple', 'Buddha Vihar', 'Surang Tila']
    },
    {
      title: 'Bamleshwari Temple',
      location: 'Dongargarh',
      image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=500&h=350&fit=crop',
      type: 'Temple',
      category: 'spiritual',
      description: 'Hilltop temple with 1600 ft elevation & panoramic views',
      bestTime: 'Oct-Mar',
      coordinates: { lat: 21.1892, lng: 80.7542 },
      detailedDescription: 'The Bamleshwari Temple sits majestically at 1,600 feet atop Dongar Hill. Devotees can either climb 1,100 steps or take the ropeway. The temple complex includes both Badi Bamblai (main temple) and Chhoti Bamblai (base temple). Navratri sees massive crowds.',
      timings: '5:00 AM - 10:00 PM',
      entryFee: 'Free (Ropeway: ₹80)',
      distance: '95 km from Raipur',
      nearbyAttractions: ['Sunset Point', 'Chhoti Bamblai Temple']
    },
    {
      title: 'Barnawapara Wildlife Sanctuary',
      location: 'Raipur',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=500&h=350&fit=crop',
      type: 'Wildlife',
      category: 'wildlife',
      description: 'Home to leopards, sloth bears & diverse bird species',
      bestTime: 'Nov-Jun',
      coordinates: { lat: 21.3500, lng: 82.2833 },
      detailedDescription: 'Spanning 245 sq km, Barnawapara is a haven for wildlife enthusiasts. The sanctuary hosts leopards, sloth bears, wild buffaloes, chitals, and over 150 bird species. The landscape features mixed deciduous forests and bamboo groves.',
      timings: '6:00 AM - 5:00 PM (Closed monsoons)',
      entryFee: '₹40 Indians, ₹400 Foreigners',
      distance: '100 km from Raipur',
      nearbyAttractions: ['Turturiya Falls', 'Mahadev Ghat']
    },
    {
      title: 'Kotumsar Cave',
      location: 'Kanger Valley',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=350&fit=crop',
      type: 'Cave',
      category: 'nature',
      description: 'Stalactite & stalagmite formations in underground wonder',
      bestTime: 'Nov-May',
      coordinates: { lat: 18.8694, lng: 81.9258 },
      detailedDescription: 'Kotumsar is one of the longest natural caves in India, extending about 1 km underground. Discovered in 1993, it features stunning stalactite and stalagmite formations, underground streams, and unique blind cave fish found nowhere else in the world.',
      timings: '10:00 AM - 4:00 PM (Entry limited)',
      entryFee: '₹50 per person (Limited daily entry)',
      distance: '35 km from Jagdalpur',
      nearbyAttractions: ['Kanger Valley National Park', 'Tirathgarh Falls']
    },
    {
      title: 'Mendri Ghumar Falls',
      location: 'Rajnandgaon',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=350&fit=crop',
      type: 'Waterfall',
      category: 'nature',
      description: 'Scenic waterfall surrounded by dense forests',
      bestTime: 'Jul-Feb',
      coordinates: { lat: 20.9500, lng: 81.0333 },
      detailedDescription: 'Mendri Ghumar is a beautiful cascade surrounded by lush green forests and rocky terrain. The waterfall plunges from a considerable height creating a misty atmosphere. The area is perfect for nature walks and photography.',
      timings: '8:00 AM - 6:00 PM',
      entryFee: '₹10 per person',
      distance: '70 km from Raipur',
      nearbyAttractions: ['Dongargarh Temple', 'Kherkatta Dam']
    },
    {
      title: 'Tamda Ghumar Falls',
      location: 'Sarguja',
      image: 'https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?w=500&h=350&fit=crop',
      type: 'Waterfall',
      category: 'nature',
      description: 'Hidden gem waterfall with pristine natural beauty',
      bestTime: 'Jul-Oct',
      coordinates: { lat: 23.2833, lng: 83.0167 },
      detailedDescription: 'Tamda Ghumar is a secluded waterfall nestled in dense forests near the Jharkhand border. The falls cascade over multiple tiers creating natural pools perfect for a refreshing dip. The surrounding area offers excellent trekking opportunities.',
      timings: 'Daylight hours',
      entryFee: 'Free',
      distance: '45 km from Ambikapur',
      nearbyAttractions: ['Mainpat', 'Semarsot Wildlife Sanctuary']
    },
    {
      title: 'Amritdhara Falls',
      location: 'Koriya',
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=500&h=350&fit=crop',
      type: 'Waterfall',
      category: 'nature',
      description: 'Milk-white waterfall cascading through rocky terrain',
      bestTime: 'Aug-Feb',
      coordinates: { lat: 23.6000, lng: 82.0000 },
      detailedDescription: 'Amritdhara, meaning "stream of nectar," is a stunning waterfall where water cascades over smooth rocks creating a milky-white appearance. Located in dense Sal forests, the falls create a serene atmosphere perfect for meditation and nature appreciation.',
      timings: '7:00 AM - 5:00 PM',
      entryFee: '₹20 per person',
      distance: '18 km from Manendragarh',
      nearbyAttractions: ['Hasdeo River', 'Tattapani Hot Springs']
    }
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const temperatures = ['18-31°C', '17-34°C', '22-36°C', '24-39°C', '24-39°C', '23-36°C', '21-30°C', '24-33°C', '24-34°C', '22-34°C', '19-30°C', '17-28°C'];

  const categories = [
    { id: 'all', label: 'All', icon: Camera },
    { id: 'nature', label: 'Nature', icon: Mountain },
    { id: 'spiritual', label: 'Spiritual', icon: Sun },
    { id: 'heritage', label: 'Heritage', icon: MapPin },
    { id: 'wildlife', label: 'Wildlife', icon: TreePine }
  ];

  const filteredAttractions = selectedCategory === 'all' 
    ? attractions 
    : attractions.filter(attr => attr.category === selectedCategory);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .gradient-text {
          background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <MapPin className="text-white" size={24} />
            </div>
            <span className={`font-bold text-xl ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              Incredible India
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['Destinations', 'Experiences', 'Plan Trip', 'Contact'].map((item, i) => (
              <a 
                key={i} 
                href="#" 
                className={`font-medium hover:text-orange-500 transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}
              >
                {item}
              </a>
            ))}
          </div>

          <button className={`hidden md:block p-2 rounded-full ${scrolled ? 'bg-gray-100 text-gray-800' : 'bg-white/20 text-white'} hover:bg-orange-500 hover:text-white transition-all`}>
            <Search size={20} />
          </button>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-gray-800' : 'text-white'}`}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg mt-2 py-4 px-4 space-y-3">
            {['Destinations', 'Experiences', 'Plan Trip', 'Contact'].map(item => (
              <a 
                key={item} 
                href="#" 
                className="block py-2 text-gray-700 hover:text-orange-500 font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Carousel */}
      <div className="relative h-screen overflow-hidden">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="text-white px-4 fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Chhattisgarh</h1>
            <p className="text-2xl md:text-4xl mb-8 font-light">Unravel the mesmerising beauty</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all">
                Explore Destinations
              </button>
              <button className="px-8 py-4 bg-white/20 backdrop-blur-md rounded-full font-semibold hover:bg-white/30 transition-all">
                Plan Your Trip
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={() => setCurrentSlide((currentSlide - 1 + heroImages.length) % heroImages.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="text-white" size={28} />
        </button>

        <button
          onClick={() => setCurrentSlide((currentSlide + 1) % heroImages.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all"
        >
          <ChevronRight className="text-white" size={28} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'bg-white w-12' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Weather Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Monthly Weather</span>
          </h2>
          <p className="text-gray-600 text-lg">Plan your visit with confidence</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {months.map((month, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMonth(idx)}
              className={`p-4 rounded-xl transition-all duration-300 text-center card-hover ${
                selectedMonth === idx
                  ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg scale-105'
                  : 'bg-white hover:bg-orange-50'
              }`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="text-sm font-semibold mb-2">{month}</div>
              <div className="text-xs mb-2">{temperatures[idx]}</div>
              {selectedMonth === idx ? <Sun size={20} className="mx-auto" /> : <Cloud size={20} className="mx-auto text-gray-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Section */}
      <div className="bg-gradient-to-b from-orange-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Destinations</span>
            </h2>
            <p className="text-gray-600 text-lg">For every bucket list</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-orange-600">
                    {dest.highlights}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{dest.name}</h3>
                  <p className="text-gray-600 mb-4">{dest.desc}</p>
                  <button 
                    onClick={() => setSelectedDestination(dest)}
                    className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-2 group"
                  >
                    Discover more
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attractions Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Attractions</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8">Worth a thousand stories</p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 hover:bg-orange-50'
                    }`}
                  >
                    <Icon size={18} />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAttractions.map((attr, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover fade-in"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={attr.image} alt={attr.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {attr.type}
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all">
                      <Heart size={18} className="text-red-500" />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all">
                      <Share2 size={18} className="text-gray-700" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{attr.title}</h3>
                  <div className="flex items-center gap-2 text-gray-500 mb-3">
                    <MapPin size={16} />
                    <span className="text-sm">{attr.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{attr.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-orange-600 text-sm">
                      <Calendar size={16} />
                      <span>Best: {attr.bestTime}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedAttraction(attr)}
                      className="text-orange-600 font-semibold hover:text-orange-700 text-sm flex items-center gap-1 group"
                    >
                      Explore
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Destination Detail Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative h-72 md:h-96">
              <img 
                src={selectedDestination.image} 
                alt={selectedDestination.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button
                onClick={() => setSelectedDestination(null)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition-all"
              >
                <X className="text-white" size={24} />
              </button>
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-2">{selectedDestination.name}</h2>
                <p className="text-xl">{selectedDestination.desc}</p>
                {selectedDestination.detailedInfo.distance && (
                  <div className="flex items-center gap-2 mt-2 text-white/90">
                    <Navigation size={18} />
                    <span>{selectedDestination.detailedInfo.distance}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* Location & Map */}
              <div className="mb-8 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Map className="text-blue-600" size={28} />
                  <span className="gradient-text">Location & Map</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
                    <MapPin className="text-orange-500 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-800">Coordinates</p>
                      <p className="text-sm text-gray-600">
                        {selectedDestination.coordinates.lat.toFixed(4)}°N, {selectedDestination.coordinates.lng.toFixed(4)}°E
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
                    <Navigation className="text-green-500 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-800">Distance</p>
                      <p className="text-sm text-gray-600">
                        {selectedDestination.detailedInfo.distance || 'Check map below'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${selectedDestination.coordinates.lat},${selectedDestination.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    <Map size={20} />
                    Open in Google Maps
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedDestination.coordinates.lat},${selectedDestination.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    <Navigation size={20} />
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 gradient-text">Overview</h3>
                <p className="text-gray-700 leading-relaxed">{selectedDestination.detailedInfo.overview}</p>
              </div>

              {/* Key Attractions */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-2">
                  <MapPin size={24} />
                  Key Attractions
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedDestination.detailedInfo.attractions.map((attraction, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <span className="text-gray-700">{attraction}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-2">
                  <Camera size={24} />
                  Things to Do
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDestination.detailedInfo.activities.map((activity, idx) => (
                    <span 
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full text-sm font-medium"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 gradient-text">Local Specialties</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedDestination.detailedInfo.specialties.map((specialty, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-red-50 p-3 rounded-lg">
                      <Heart size={18} className="text-red-500" />
                      <span className="text-gray-700 font-medium">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Time & How to Reach */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="text-blue-600" size={24} />
                    <h4 className="text-xl font-bold text-blue-900">Best Time to Visit</h4>
                  </div>
                  <p className="text-gray-700">{selectedDestination.detailedInfo.bestTime}</p>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="text-green-600" size={24} />
                    <h4 className="text-xl font-bold text-green-900">How to Reach</h4>
                  </div>
                  <p className="text-gray-700 text-sm">{selectedDestination.detailedInfo.howToReach}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:shadow-lg transition-all">
                  Plan Your Visit
                </button>
                <button 
                  onClick={() => setSelectedDestination(null)}
                  className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attraction Detail Modal */}
      {selectedAttraction && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative h-64 md:h-80">
              <img 
                src={selectedAttraction.image} 
                alt={selectedAttraction.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button
                onClick={() => setSelectedAttraction(null)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition-all"
              >
                <X className="text-white" size={24} />
              </button>
              <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                {selectedAttraction.type}
              </div>
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{selectedAttraction.title}</h2>
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span className="text-lg">{selectedAttraction.location}</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* About */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-3 gradient-text">About</h3>
                <p className="text-gray-700 leading-relaxed text-lg mb-2">{selectedAttraction.detailedDescription}</p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-blue-600" size={20} />
                    <h4 className="font-bold text-gray-800">Timings</h4>
                  </div>
                  <p className="text-sm text-gray-700">{selectedAttraction.timings}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="text-green-600" size={20} />
                    <h4 className="font-bold text-gray-800">Entry Fee</h4>
                  </div>
                  <p className="text-sm text-gray-700">{selectedAttraction.entryFee}</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Navigation className="text-purple-600" size={20} />
                    <h4 className="font-bold text-gray-800">Distance</h4>
                  </div>
                  <p className="text-sm text-gray-700">{selectedAttraction.distance}</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="text-orange-600" size={20} />
                    <h4 className="font-bold text-gray-800">Best Time</h4>
                  </div>
                  <p className="text-sm text-gray-700">{selectedAttraction.bestTime}</p>
                </div>
              </div>

              {/* Nearby Attractions */}
              <div className="mb-6 bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <MapPin className="text-orange-500" size={20} />
                  Nearby Attractions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAttraction.nearbyAttractions.map((nearby, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm border border-gray-200"
                    >
                      {nearby}
                    </span>
                  ))}
                </div>
              </div>

              {/* Location & Map */}
              <div className="mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Map className="text-blue-600" size={20} />
                  Location
                </h4>
                <div className="text-sm text-gray-700 mb-3">
                  <p className="font-medium">Coordinates: {selectedAttraction.coordinates.lat.toFixed(4)}°N, {selectedAttraction.coordinates.lng.toFixed(4)}°E</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${selectedAttraction.coordinates.lat},${selectedAttraction.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                  >
                    <Map size={18} />
                    View on Map
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedAttraction.coordinates.lat},${selectedAttraction.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                  >
                    <Navigation size={18} />
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  <Heart size={20} />
                  Save to Wishlist
                </button>
                <button 
                  onClick={() => setSelectedAttraction(null)}
                  className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <span className="font-bold text-xl">Incredible India</span>
              </div>
              <p className="text-gray-400 text-sm">
                Discover the rich heritage, vibrant culture, and breathtaking beauty of India's incredible destinations.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Destinations', 'Experiences', 'Plan Trip', 'Festivals', 'Contact Us'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Travel Guide', 'Visa Information', 'FAQs', 'Privacy Policy', 'Terms of Use'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe for travel updates and exclusive offers
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-orange-500 text-sm"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg font-semibold hover:shadow-lg transition-all text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            © 2026 Ministry of Tourism, Government of India. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}