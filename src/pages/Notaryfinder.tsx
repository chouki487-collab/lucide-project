import { useState } from 'react';
import { Search, MapPin, Phone, Clock, Star, Filter, Users } from 'lucide-react';

const Notaryfinder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const cities = [
    'الجزائر العاصمة', 'وهران', 'قسنطينة', 'عنابة', 'بلعباس', 'باتنة', 'جيجل', 'سطيف', 'بسكرة', 'ورقلة'
  ];

  const specialties = [
    'العقود التجارية',
    'العقود العقارية', 
    'الوصايا والمواريث',
    'التوكيلات',
    'عقود الزواج',
    'المصادقة على التوقيعات',
    'ترجمة الوثائق',
    'العقود المدنية'
  ];

  const notaries = [
    {
      id: 1,
      name: 'الأستاذ أحمد بن محمد',
      city: 'الجزائر العاصمة',
      address: 'شارع ديدوش مراد، الجزائر العاصمة',
      phone: '021-XX-XX-XX',
      rating: 4.8,
      reviews: 125,
      specialties: ['العقود العقارية', 'التوكيلات', 'الوصايا والمواريث'],
      workingHours: 'الأحد - الخميس: 8:00 - 16:00',
      experience: '15 سنة خبرة'
    },
    {
      id: 2,
      name: 'الأستاذة فاطمة الزهراء',
      city: 'وهران',
      address: 'حي السلام، وهران',
      phone: '041-XX-XX-XX',
      rating: 4.9,
      reviews: 89,
      specialties: ['العقود التجارية', 'عقود الزواج', 'المصادقة على التوقيعات'],
      workingHours: 'السبت - الأربعاء: 9:00 - 17:00',
      experience: '12 سنة خبرة'
    },
    {
      id: 3,
      name: 'الأستاذ محمد الأمين',
      city: 'قسنطينة',
      address: 'وسط المدينة، قسنطينة',
      phone: '031-XX-XX-XX',
      rating: 4.7,
      reviews: 156,
      specialties: ['ترجمة الوثائق', 'العقود المدنية', 'التوكيلات'],
      workingHours: 'الأحد - الخميس: 8:30 - 16:30',
      experience: '20 سنة خبرة'
    },
    {
      id: 4,
      name: 'الأستاذة زينب قادري',
      city: 'سطيف',
      address: 'شارع الاستقلال، سطيف',
      phone: '036-XX-XX-XX',
      rating: 4.6,
      reviews: 73,
      specialties: ['الوصايا والمواريث', 'العقود العقارية', 'عقود الزواج'],
      workingHours: 'السبت - الأربعاء: 9:00 - 16:00',
      experience: '8 سنوات خبرة'
    }
  ];

  const filteredNotaries = notaries.filter(notary => {
    const matchesSearch = notary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notary.specialties.some(specialty => specialty.includes(searchQuery));
    const matchesCity = !selectedCity || notary.city === selectedCity;
    const matchesSpecialty = !selectedSpecialty || notary.specialties.includes(selectedSpecialty);
    
    return matchesSearch && matchesCity && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            🏛️ البحث عن موثق
          </h1>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-4">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث عن موثق أو اختصاص..."
              className="w-full pr-12 pl-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters Toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Filter className="w-4 h-4 ml-2" />
              فلاتر البحث
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg text-right"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="">جميع المدن</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">التخصص</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg text-right"
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                  >
                    <option value="">جميع التخصصات</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            تم العثور على {filteredNotaries.length} موثق
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotaries.map(notary => (
            <div key={notary.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{notary.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="mr-1 text-sm text-gray-600">{notary.rating}</span>
                      <span className="text-xs text-gray-500">({notary.reviews} مراجعة)</span>
                    </div>
                    <span className="text-sm text-blue-600 font-medium">{notary.experience}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start mb-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1 ml-2" />
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">{notary.city}</div>
                    <div>{notary.address}</div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center mb-3">
                  <Phone className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-sm text-gray-600">{notary.phone}</span>
                </div>

                {/* Working Hours */}
                <div className="flex items-center mb-4">
                  <Clock className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-sm text-gray-600">{notary.workingHours}</span>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-800 mb-2">التخصصات:</h4>
                  <div className="flex flex-wrap gap-1">
                    {notary.specialties.map(specialty => (
                      <span
                        key={specialty}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    اتصل الآن
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotaries.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl text-gray-600 mb-2">لم يتم العثور على نتائج</h3>
            <p className="text-gray-500">جرب تغيير معايير البحث أو الفلاتر</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold mb-2">البحث عن موثق</h3>
          <p className="text-gray-400 text-sm">
            منصة موثوقة للعثور على أفضل الموثقين المعتمدين في الجزائر
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Notaryfinder;