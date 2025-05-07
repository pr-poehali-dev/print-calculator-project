
// Данные будут загружаться из Google Таблицы в реальном проекте
// URL таблицы: https://docs.google.com/spreadsheets/d/1dexHmpzx9z3cAXzxpqKXLdWS9CjpBF5QxZZpTpMTkAE/edit#gid=0
export const MOCK_DATA = {
  productTypes: [
    { id: 'business_card', name: 'Визитки' },
    { id: 'flyer', name: 'Листовки/Флаеры' },
    { id: 'booklet', name: 'Буклеты' },
    { id: 'brochure', name: 'Брошюры' },
    { id: 'poster', name: 'Плакаты/Афиши' }
  ],
  
  paperTypes: [
    { id: 'offset_80', name: 'Офсетная 80 г/м²' },
    { id: 'coated_115', name: 'Мелованная 115 г/м²' },
    { id: 'coated_170', name: 'Мелованная 170 г/м²' },
    { id: 'coated_300', name: 'Мелованная 300 г/м²' }
  ],
  
  sizes: [
    { id: '90x50', name: '90×50 мм', productTypeId: 'business_card' },
    { id: 'a6', name: 'A6 (105×148 мм)', productTypeId: 'flyer' },
    { id: 'a5', name: 'A5 (148×210 мм)', productTypeId: 'flyer' },
    { id: 'a4', name: 'A4 (210×297 мм)', productTypeId: 'flyer' },
    { id: 'a4_folded', name: 'A4 в развороте (A5 в готовом виде)', productTypeId: 'booklet' },
    { id: 'a3_folded', name: 'A3 в развороте (A4 в готовом виде)', productTypeId: 'booklet' },
    { id: 'a3', name: 'A3 (297×420 мм)', productTypeId: 'poster' },
    { id: 'a2', name: 'A2 (420×594 мм)', productTypeId: 'poster' }
  ],
  
  colorOptions: [
    { id: '4+0', name: '4+0 (цветная односторонняя)' },
    { id: '4+4', name: '4+4 (цветная двухсторонняя)' },
    { id: '1+0', name: '1+0 (ч/б односторонняя)' },
    { id: '1+1', name: '1+1 (ч/б двухсторонняя)' }
  ],
  
  finishingOptions: [
    { id: 'none', name: 'Без отделки' },
    { id: 'glossy_lamination', name: 'Ламинация глянцевая' },
    { id: 'matte_lamination', name: 'Ламинация матовая' },
    { id: 'uv_varnish', name: 'УФ-лак' },
    { id: 'soft_touch', name: 'Soft-touch ламинация' }
  ],
  
  // Базовые расценки для примера
  prices: {
    'business_card': {
      basePrice: 2.5,
      paperMultipliers: {
        'offset_80': 1,
        'coated_115': 1.2,
        'coated_170': 1.4,
        'coated_300': 1.8
      },
      colorMultipliers: {
        '4+0': 1,
        '4+4': 1.8,
        '1+0': 0.7,
        '1+1': 1.2
      },
      finishingPrices: {
        'none': 0,
        'glossy_lamination': 1.5,
        'matte_lamination': 1.8,
        'uv_varnish': 2.5,
        'soft_touch': 3
      }
    },
    'flyer': {
      basePrice: 4,
      paperMultipliers: {
        'offset_80': 1,
        'coated_115': 1.3,
        'coated_170': 1.5,
        'coated_300': 1.9
      },
      colorMultipliers: {
        '4+0': 1,
        '4+4': 1.7,
        '1+0': 0.8,
        '1+1': 1.4
      },
      finishingPrices: {
        'none': 0,
        'glossy_lamination': 2,
        'matte_lamination': 2.5,
        'uv_varnish': 3,
        'soft_touch': 3.5
      }
    },
    'booklet': {
      basePrice: 8,
      paperMultipliers: {
        'offset_80': 1,
        'coated_115': 1.3,
        'coated_170': 1.5,
        'coated_300': 2
      },
      colorMultipliers: {
        '4+0': 1,
        '4+4': 1.8,
        '1+0': 0.7,
        '1+1': 1.3
      },
      finishingPrices: {
        'none': 0,
        'glossy_lamination': 2.5,
        'matte_lamination': 3,
        'uv_varnish': 4,
        'soft_touch': 4.5
      }
    },
    'brochure': {
      basePrice: 12,
      paperMultipliers: {
        'offset_80': 1,
        'coated_115': 1.4,
        'coated_170': 1.6,
        'coated_300': 2.2
      },
      colorMultipliers: {
        '4+0': 1,
        '4+4': 1.9,
        '1+0': 0.7,
        '1+1': 1.3
      },
      finishingPrices: {
        'none': 0,
        'glossy_lamination': 3,
        'matte_lamination': 3.5,
        'uv_varnish': 4.5,
        'soft_touch': 5
      }
    },
    'poster': {
      basePrice: 15,
      paperMultipliers: {
        'offset_80': 1,
        'coated_115': 1.2,
        'coated_170': 1.5,
        'coated_300': 1.8
      },
      colorMultipliers: {
        '4+0': 1,
        '4+4': 1.7,
        '1+0': 0.6,
        '1+1': 1.1
      },
      finishingPrices: {
        'none': 0,
        'glossy_lamination': 3.5,
        'matte_lamination': 4,
        'uv_varnish': 5,
        'soft_touch': 5.5
      }
    }
  },
  
  // Множители скидок в зависимости от тиража
  quantityDiscounts: [
    { min: 1, max: 99, multiplier: 1 },
    { min: 100, max: 499, multiplier: 0.9 },
    { min: 500, max: 999, multiplier: 0.75 },
    { min: 1000, max: 4999, multiplier: 0.6 },
    { min: 5000, max: 9999, multiplier: 0.5 },
    { min: 10000, max: Infinity, multiplier: 0.4 }
  ]
};
