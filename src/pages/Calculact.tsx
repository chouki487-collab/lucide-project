import React, { useState, useEffect } from 'react';
import { Calculator, FileText, DollarSign, Info, BookOpen } from 'lucide-react';

const NotaryFeesCalculator = () => {
  const [contractType, setContractType] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [result, setResult] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // جدول التعريفة الرسمية وفقاً للمرسوم 08-243
  const feeStructure = {
    'بيع عقار': {
      base: 0.005, // 0.5%
      minimum: 5000,
      maximum: 150000,
      description: 'عقود بيع العقارات'
    },
    'هبة': {
      base: 0.003, // 0.3%
      minimum: 3000,
      maximum: 100000,
      description: 'عقود الهبة'
    },
    'إيجار': {
      base: 0.002, // 0.2%
      minimum: 2000,
      maximum: 50000,
      description: 'عقود الإيجار'
    },
    'شركة': {
      base: 0.004, // 0.4%
      minimum: 4000,
      maximum: 200000,
      description: 'عقود تأسيس الشركات'
    },
    'رهن': {
      base: 0.003, // 0.3%
      minimum: 3000,
      maximum: 80000,
      description: 'عقود الرهن'
    },
    'وكالة': {
      fixed: 5000,
      description: 'عقود الوكالة - مبلغ ثابت'
    },
    'وصية': {
      fixed: 8000,
      description: 'عقود الوصية - مبلغ ثابت'
    }
  };

  const calculateFees = () => {
    if (!contractType || (!propertyValue && !feeStructure[contractType].fixed)) {
      return;
    }

    const structure = feeStructure[contractType];
    let fees = 0;
    let details = {};

    if (structure.fixed) {
      fees = structure.fixed;
      details = {
        type: 'fixed',
        amount: fees,
        description: structure.description
      };
    } else {
      const value = parseFloat(propertyValue);
      const calculatedFee = value * structure.base;
      fees = Math.max(Math.min(calculatedFee, structure.maximum), structure.minimum);
      
      details = {
        type: 'percentage',
        baseValue: value,
        percentage: structure.base * 100,
        calculatedAmount: calculatedFee,
        finalAmount: fees,
        minimum: structure.minimum,
        maximum: structure.maximum,
        description: structure.description
      };
    }

    // إضافة الرسوم الإضافية
    const additionalFees = {
      tva: fees * 0.19, // TVA 19%
      timbre: 1000, // رسم الطابع
      registration: propertyValue ? parseFloat(propertyValue) * 0.005 : 0, // رسم التسجيل 0.5%
    };

    const totalFees = fees + additionalFees.tva + additionalFees.timbre + additionalFees.registration;

    setResult({
      notaryFees: fees,
      additionalFees,
      totalAmount: totalFees,
      details
    });
  };

  useEffect(() => {
    if (contractType && (propertyValue || feeStructure[contractType]?.fixed)) {
      calculateFees();
    }
  }, [contractType, propertyValue]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen" dir="rtl">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8" />
            <h1 className="text-2xl font-bold">حاسبة أتعاب الموثق</h1>
          </div>
          <p className="text-blue-100">وفقاً للمرسوم التنفيذي رقم 08-243 وأحدث قوانين المالية</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                معلومات العقد
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع العقد
                  </label>
                  <select
                    value={contractType}
                    onChange={(e) => setContractType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">اختر نوع العقد</option>
                    {Object.keys(feeStructure).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {contractType && !feeStructure[contractType]?.fixed && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      قيمة العقار (دج)
                    </label>
                    <input
                      type="number"
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(e.target.value)}
                      placeholder="أدخل قيمة العقار"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Legal Reference */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">المرجع القانوني</h3>
              </div>
              <p className="text-sm text-blue-700">
                المرسوم التنفيذي رقم 08-243 المؤرخ في 3 غشت 2008
                <br />
                المحدد للتعريفة الرسمية لأتعاب الموثق
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {result && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-800">
                  <DollarSign className="w-5 h-5" />
                  حساب الأتعاب
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded border">
                    <span className="font-medium">أتعاب الموثق الأساسية</span>
                    <span className="font-bold text-blue-600">
                      {formatCurrency(result.notaryFees)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white rounded border">
                    <span className="font-medium">الرسم على القيمة المضافة (19%)</span>
                    <span className="font-bold text-orange-600">
                      {formatCurrency(result.additionalFees.tva)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white rounded border">
                    <span className="font-medium">رسم الطابع</span>
                    <span className="font-bold text-purple-600">
                      {formatCurrency(result.additionalFees.timbre)}
                    </span>
                  </div>

                  {result.additionalFees.registration > 0 && (
                    <div className="flex justify-between items-center p-3 bg-white rounded border">
                      <span className="font-medium">رسم التسجيل (0.5%)</span>
                      <span className="font-bold text-red-600">
                        {formatCurrency(result.additionalFees.registration)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold text-lg">
                    <span>المجموع الإجمالي</span>
                    <span>{formatCurrency(result.totalAmount)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <Info className="w-4 h-4" />
                  {showDetails ? 'إخفاء التفاصيل' : 'عرض تفاصيل الحساب'}
                </button>

                {showDetails && result.details && (
                  <div className="mt-4 p-3 bg-gray-50 rounded border">
                    <h4 className="font-semibold mb-2">تفاصيل الحساب:</h4>
                    <p className="text-sm text-gray-700 mb-2">{result.details.description}</p>
                    
                    {result.details.type === 'percentage' ? (
                      <div className="text-sm space-y-1">
                        <p>• القيمة الأساسية: {formatCurrency(result.details.baseValue)}</p>
                        <p>• النسبة المطبقة: {result.details.percentage}%</p>
                        <p>• المبلغ المحسوب: {formatCurrency(result.details.calculatedAmount)}</p>
                        <p>• الحد الأدنى: {formatCurrency(result.details.minimum)}</p>
                        <p>• الحد الأقصى: {formatCurrency(result.details.maximum)}</p>
                        <p>• المبلغ النهائي: {formatCurrency(result.details.finalAmount)}</p>
                      </div>
                    ) : (
                      <p className="text-sm">مبلغ ثابت وفقاً للتعريفة الرسمية</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Information Panel */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">ملاحظات مهمة:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• يمكن للموثق طلب دفعة مسبقة من الأتعاب</li>
                <li>• الأتعاب قابلة للتفاوض في حدود التعريفة الرسمية</li>
                <li>• قد تطبق رسوم إضافية حسب تعقيد العقد</li>
                <li>• يجب الاطلاع على آخر التعديلات في قوانين المالية</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-600 border-t">
          <p>هذه الأداة للاستعلام والتقدير التقريبي. يُنصح بمراجعة الموثق للحصول على التكلفة الدقيقة</p>
        </div>
      </div>
    </div>
  );
};

export default NotaryFeesCalculator;