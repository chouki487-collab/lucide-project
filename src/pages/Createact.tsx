import  { useState, useRef } from 'react';
import { FileText, Users, Calendar, Search, Plus, Download, Eye, UserCheck, Clock, CheckCircle, AlertCircle, Hash, Shield } from 'lucide-react';

const Createact = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'عقد بيع عقار',
      type: 'عقد بيع',
      client: ' جدي الربيع ',
      date: '2024-12-15',
      status: 'مكتمل',
      hash: 'a1b2c3d4e5f6...',
      parties: ['حروز شوقي ', 'شواطرة جيهان ']
    },
    {
      id: 2,
      title: 'توكيل عام',
      type: 'توكيل',
      client: 'دريدي عبدالغاني',
      date: '2024-12-14',
      status: 'قيد المراجعة',
      hash: 'b2c3d4e5f6g7...',
      parties: ['عاشور ميلود', 'بوقرة ملود']
    },
    {
      id: 3,
      title: 'إقرار شخصي',
      type: 'إقرار',
      client: 'زواوي عيسى',
      date: '2024-12-13',
      status: 'مكتمل',
      hash: 'c3d4e5f6g7h8...',
      parties: ['قدوج الصالح']
    }
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      client: 'زهار فريد',
      type: 'توثيق عقد إيجار',
      date: '2024-12-16',
      time: '10:00',
      status: 'مؤكد'
    },
    {
      id: 2,
      client: 'بلفار السعيد',
      type: 'توكيل خاص',
      date: '2024-12-16',
      time: '14:30',
      status: 'مؤكد'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showNewDocumentForm, setShowNewDocumentForm] = useState(false);
  const fileInputRef = useRef(null);

  const filteredDocuments = documents.filter(doc =>
    doc.title.includes(searchTerm) ||
    doc.client.includes(searchTerm) ||
    doc.type.includes(searchTerm)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'مكتمل': return 'text-green-600 bg-green-100';
      case 'قيد المراجعة': return 'text-yellow-600 bg-yellow-100';
      case 'مرفوض': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // محاكاة رفع الملف
      console.log('تم رفع الملف:', file.name);
    }
  };

  const addNewDocument = (docData) => {
    const newDoc = {
      id: documents.length + 1,
      ...docData,
      date: new Date().toISOString().split('T')[0],
      status: 'قيد المراجعة',
      hash: Math.random().toString(36).substring(2, 15) + '...'
    };
    setDocuments([...documents, newDoc]);
    setShowNewDocumentForm(false);
  };

  const NewDocumentForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      type: '',
      client: '',
      parties: ['']
    });

    const handleSubmit = () => {
      if (formData.title && formData.type && formData.client) {
        addNewDocument(formData);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">إضافة وثيقة جديدة</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">عنوان الوثيقة</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">نوع الوثيقة</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">اختر نوع الوثيقة</option>
                <option value="عقد بيع">عقد بيع</option>
                <option value="عقد إيجار">عقد إيجار</option>
                <option value="توكيل">توكيل</option>
                <option value="إقرار">إقرار</option>
                <option value="شهادة">شهادة</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">العميل الرئيسي</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({...formData, client: e.target.value})}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الأطراف المعنية</label>
              {formData.parties.map((party, index) => (
                <input
                  key={index}
                  type="text"
                  value={party}
                  onChange={(e) => {
                    const newParties = [...formData.parties];
                    newParties[index] = e.target.value;
                    setFormData({...formData, parties: newParties});
                  }}
                  className="w-full p-2 border rounded-md mb-2"
                  placeholder={`الطرف ${index + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={() => setFormData({...formData, parties: [...formData.parties, '']})}
                className="text-blue-600 text-sm"
              >
                + إضافة طرف آخر
              </button>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                إضافة الوثيقة
              </button>
              <button
                type="button"
                onClick={() => setShowNewDocumentForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DocumentDetails = ({ document, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">تفاصيل الوثيقة</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">العنوان</label>
              <p className="text-lg">{document.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">النوع</label>
              <p>{document.type}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">العميل الرئيسي</label>
              <p>{document.client}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">التاريخ</label>
              <p>{document.date}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">الحالة</label>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(document.status)}`}>
                {document.status}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">الأطراف المعنية</label>
              <ul className="list-disc list-inside">
                {document.parties.map((party, index) => (
                  <li key={index}>{party}</li>
                ))}
              </ul>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">التوقيع الرقمي</label>
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-gray-500" />
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">{document.hash}</code>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
                <Download className="w-4 h-4" />
                تحميل
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                التحقق من الصحة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">الموثق الإلكتروني</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold text-gray-900">مرحباً، بالموثق جدي الربيع</span>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { id: 'dashboard', label: 'لوحة التحكم', icon: FileText },
            { id: 'documents', label: 'الوثائق', icon: FileText },
            { id: 'appointments', label: 'المواعيد', icon: Calendar },
            { id: 'clients', label: 'العملاء', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">إجمالي الوثائق</p>
                    <p className="text-2xl font-semibold">{documents.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">الوثائق المكتملة</p>
                    <p className="text-2xl font-semibold text-green-600">
                      {documents.filter(doc => doc.status === 'مكتمل').length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">قيد المراجعة</p>
                    <p className="text-2xl font-semibold text-yellow-600">
                      {documents.filter(doc => doc.status === 'قيد المراجعة').length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">المواعيد اليوم</p>
                    <p className="text-2xl font-semibold">{appointments.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Recent Documents */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">الوثائق الحديثة</h3>
              </div>
              <div className="divide-y">
                {documents.slice(0, 3).map(doc => (
                  <div key={doc.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">{doc.title}</h4>
                        <p className="text-sm text-gray-600">{doc.client} • {doc.date}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="البحث في الوثائق..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                />
              </div>
              <button
                onClick={() => setShowNewDocumentForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة وثيقة جديدة
              </button>
            </div>

            {/* Documents List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العنوان</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">النوع</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العميل</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredDocuments.map(doc => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{doc.title}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{doc.type}</td>
                        <td className="px-6 py-4 text-gray-600">{doc.client}</td>
                        <td className="px-6 py-4 text-gray-600">{doc.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedDocument(doc)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-800">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">المواعيد المقررة</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                موعد جديد
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="divide-y">
                {appointments.map(appointment => (
                  <div key={appointment.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium">{appointment.client}</h4>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                        <p className="text-sm text-gray-500">{appointment.date} في {appointment.time}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">قائمة العملاء</h2>
            <p className="text-gray-600">سيتم إضافة قائمة العملاء هنا...</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showNewDocumentForm && <NewDocumentForm />}
      {selectedDocument && (
        <DocumentDetails
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};

export default Createact;