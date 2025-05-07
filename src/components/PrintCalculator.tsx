
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Calculator, Printer, FileText, Clock, Truck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CalculatorResults from "./CalculatorResults";

// Примерные данные для демонстрации (в реальном проекте будут загружаться из Google Таблиц)
const MOCK_DATA = {
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
    }
    // другие типы продукции...
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

const PrintCalculator = () => {
  const [productType, setProductType] = useState("");
  const [paperType, setPaperType] = useState("");
  const [size, setSize] = useState("");
  const [colorOption, setColorOption] = useState("");
  const [finishingOption, setFinishingOption] = useState("none");
  const [quantity, setQuantity] = useState(100);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUrgent, setIsUrgent] = useState(false);
  const [needDelivery, setNeedDelivery] = useState(false);
  
  const [availableSizes, setAvailableSizes] = useState(MOCK_DATA.sizes);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Фильтрация доступных размеров в зависимости от выбранного типа продукции
  useEffect(() => {
    if (productType) {
      const filtered = MOCK_DATA.sizes.filter(s => s.productTypeId === productType);
      setAvailableSizes(filtered);
      setSize(filtered.length > 0 ? filtered[0].id : "");
    } else {
      setAvailableSizes([]);
      setSize("");
    }
  }, [productType]);
  
  const calculatePrice = () => {
    if (!productType || !paperType || !size || !colorOption || quantity <= 0) {
      toast({
        title: "Ошибка расчета",
        description: "Пожалуйста, заполните все необходимые поля",
        variant: "destructive"
      });
      return;
    }
    
    setIsCalculating(true);
    
    // Имитация задержки для демонстрации
    setTimeout(() => {
      try {
        // В реальном проекте здесь будет обращение к данным из Google Таблицы
        const productData = MOCK_DATA.prices[productType as keyof typeof MOCK_DATA.prices];
        
        if (!productData) {
          throw new Error("Данные для расчета не найдены");
        }
        
        // Базовая цена за единицу
        let unitPrice = productData.basePrice;
        
        // Применяем коэффициенты бумаги
        unitPrice *= productData.paperMultipliers[paperType as keyof typeof productData.paperMultipliers] || 1;
        
        // Применяем коэффициенты цветности
        unitPrice *= productData.colorMultipliers[colorOption as keyof typeof productData.colorMultipliers] || 1;
        
        // Добавляем стоимость отделки
        unitPrice += productData.finishingPrices[finishingOption as keyof typeof productData.finishingPrices] || 0;
        
        // Определяем скидку по тиражу
        const discountLevel = MOCK_DATA.quantityDiscounts.find(
          d => quantity >= d.min && quantity <= d.max
        );
        const quantityMultiplier = discountLevel ? discountLevel.multiplier : 1;
        
        // Умножители для срочности и доставки
        const urgencyMultiplier = isUrgent ? 1.3 : 1;
        const deliveryCost = needDelivery ? 500 : 0;
        
        // Окончательный расчет
        const finalUnitPrice = unitPrice * quantityMultiplier * urgencyMultiplier;
        const finalTotalPrice = (finalUnitPrice * quantity) + deliveryCost;
        
        setPricePerUnit(parseFloat(finalUnitPrice.toFixed(2)));
        setTotalPrice(parseFloat(finalTotalPrice.toFixed(2)));
        
        toast({
          title: "Расчет выполнен",
          description: "Стоимость рассчитана на основе выбранных параметров",
        });
      } catch (error) {
        toast({
          title: "Ошибка расчета",
          description: error instanceof Error ? error.message : "Неизвестная ошибка при расчете",
          variant: "destructive"
        });
        setPricePerUnit(0);
        setTotalPrice(0);
      } finally {
        setIsCalculating(false);
      }
    }, 800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      toast({
        title: "Файл загружен",
        description: `Файл "${e.target.files[0].name}" успешно загружен`
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center"><Calculator className="mr-2 h-5 w-5" /> Параметры печати</CardTitle>
          <CardDescription>Выберите параметры для расчета стоимости печати</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productType">Тип продукции</Label>
              <Select value={productType} onValueChange={setProductType}>
                <SelectTrigger id="productType">
                  <SelectValue placeholder="Выберите тип продукции" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_DATA.productTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paperType">Тип бумаги</Label>
              <Select value={paperType} onValueChange={setPaperType}>
                <SelectTrigger id="paperType">
                  <SelectValue placeholder="Выберите тип бумаги" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_DATA.paperTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size">Размер</Label>
              <Select value={size} onValueChange={setSize} disabled={!productType}>
                <SelectTrigger id="size">
                  <SelectValue placeholder={productType ? "Выберите размер" : "Сначала выберите тип продукции"} />
                </SelectTrigger>
                <SelectContent>
                  {availableSizes.map(sizeOption => (
                    <SelectItem key={sizeOption.id} value={sizeOption.id}>{sizeOption.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="colorOption">Цветность</Label>
              <Select value={colorOption} onValueChange={setColorOption}>
                <SelectTrigger id="colorOption">
                  <SelectValue placeholder="Выберите вариант печати" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_DATA.colorOptions.map(option => (
                    <SelectItem key={option.id} value={option.id}>{option.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="finishingOption">Отделка</Label>
              <Select value={finishingOption} onValueChange={setFinishingOption}>
                <SelectTrigger id="finishingOption">
                  <SelectValue placeholder="Выберите тип отделки" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_DATA.finishingOptions.map(option => (
                    <SelectItem key={option.id} value={option.id}>{option.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Тираж (шт.)</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                className="w-full"
              />
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="fileUpload" className="mb-2 block">Загрузите файл для печати (опционально)</Label>
              <Input id="fileUpload" type="file" onChange={handleFileChange} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isUrgent"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded"
                />
                <Label htmlFor="isUrgent" className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Срочный заказ (+30%)
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="needDelivery"
                  checked={needDelivery}
                  onChange={(e) => setNeedDelivery(e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded"
                />
                <Label htmlFor="needDelivery" className="flex items-center">
                  <Truck className="w-4 h-4 mr-2" />
                  Нужна доставка (+500 руб.)
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={calculatePrice} disabled={isCalculating} className="w-full">
            {isCalculating ? "Расчет..." : "Рассчитать стоимость"}
          </Button>
        </CardFooter>
      </Card>
      
      <CalculatorResults 
        totalPrice={totalPrice} 
        pricePerUnit={pricePerUnit} 
        quantity={quantity}
        isUrgent={isUrgent}
        needDelivery={needDelivery}
      />
    </div>
  );
};

export default PrintCalculator;
