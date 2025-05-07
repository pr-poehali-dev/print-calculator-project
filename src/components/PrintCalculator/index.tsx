
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { MOCK_DATA } from "./data";
import CalculatorResults from "../CalculatorResults";
import CalculatorForm from "./CalculatorForm";
import { CalculatorState, SizeOption, DataFormat } from "./types";
import { read, utils } from "xlsx";

const PrintCalculator = () => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    productType: "",
    paperType: "",
    size: "",
    colorOption: "",
    finishingOption: "none",
    quantity: 100,
    uploadedFile: null,
    urgencyPercent: 0,
    needDelivery: false,
    priceData: null,
  });

  const [availableSizes, setAvailableSizes] = useState<SizeOption[]>(MOCK_DATA.sizes);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatorData, setCalculatorData] = useState<DataFormat>(MOCK_DATA);

  // Фильтрация доступных размеров в зависимости от выбранного типа продукции
  useEffect(() => {
    if (calculatorState.productType) {
      const filtered = calculatorData.sizes.filter(s => s.productTypeId === calculatorState.productType);
      setAvailableSizes(filtered);
      
      // Если текущий выбранный размер не доступен для нового типа продукции,
      // установим первый доступный размер
      if (!filtered.some(s => s.id === calculatorState.size)) {
        setCalculatorState(prev => ({
          ...prev,
          size: filtered.length > 0 ? filtered[0].id : ""
        }));
      }
    } else {
      setAvailableSizes([]);
      setCalculatorState(prev => ({
        ...prev,
        size: ""
      }));
    }
  }, [calculatorState.productType, calculatorData.sizes]);

  const handleChange = (name: keyof CalculatorState, value: any) => {
    setCalculatorState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCalculatorState(prev => ({
        ...prev,
        uploadedFile: e.target.files![0]
      }));
      
      toast({
        title: "Файл загружен",
        description: `Файл "${e.target.files[0].name}" успешно загружен`
      });
    }
  };

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = read(data);
        
        const newData: Partial<DataFormat> = {};
        
        // Обработка каждого листа таблицы
        if (workbook.SheetNames.includes('ProductTypes')) {
          const sheet = workbook.Sheets['ProductTypes'];
          newData.productTypes = utils.sheet_to_json(sheet);
        }
        
        if (workbook.SheetNames.includes('PaperTypes')) {
          const sheet = workbook.Sheets['PaperTypes'];
          newData.paperTypes = utils.sheet_to_json(sheet);
        }
        
        if (workbook.SheetNames.includes('Sizes')) {
          const sheet = workbook.Sheets['Sizes'];
          newData.sizes = utils.sheet_to_json(sheet);
        }
        
        if (workbook.SheetNames.includes('ColorOptions')) {
          const sheet = workbook.Sheets['ColorOptions'];
          newData.colorOptions = utils.sheet_to_json(sheet);
        }
        
        if (workbook.SheetNames.includes('FinishingOptions')) {
          const sheet = workbook.Sheets['FinishingOptions'];
          newData.finishingOptions = utils.sheet_to_json(sheet);
        }
        
        if (workbook.SheetNames.includes('QuantityDiscounts')) {
          const sheet = workbook.Sheets['QuantityDiscounts'];
          newData.quantityDiscounts = utils.sheet_to_json(sheet);
        }
        
        if (workbook.SheetNames.includes('Prices')) {
          const sheet = workbook.Sheets['Prices'];
          const pricesData = utils.sheet_to_json(sheet);
          
          // Преобразуем данные в формат, который ожидает калькулятор
          const prices: Record<string, any> = {};
          pricesData.forEach((item: any) => {
            if (item.productTypeId) {
              prices[item.productTypeId] = {
                basePrice: parseFloat(item.basePrice) || 0,
                paperMultipliers: JSON.parse(item.paperMultipliers || '{}'),
                colorMultipliers: JSON.parse(item.colorMultipliers || '{}'),
                finishingPrices: JSON.parse(item.finishingPrices || '{}')
              };
            }
          });
          
          newData.prices = prices;
        }
        
        // Обновляем данные калькулятора
        setCalculatorData(prevData => ({
          ...prevData,
          ...newData as DataFormat
        }));
        
        toast({
          title: "Таблица загружена",
          description: "Данные калькулятора обновлены из Excel-таблицы"
        });
        
      } catch (error) {
        toast({
          title: "Ошибка при загрузке таблицы",
          description: "Произошла ошибка при чтении Excel-файла. Проверьте формат таблицы.",
          variant: "destructive"
        });
        console.error("Error parsing Excel file:", error);
      }
    }
  };

  const calculatePrice = () => {
    const { productType, paperType, size, colorOption, quantity, urgencyPercent, needDelivery, finishingOption } = calculatorState;
    
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
        // Используем данные из загруженной таблицы или MOCK_DATA
        const productData = calculatorData.prices[productType];
        
        if (!productData) {
          throw new Error("Данные для расчета не найдены");
        }
        
        // Базовая цена за единицу
        let unitPrice = productData.basePrice;
        
        // Применяем коэффициенты бумаги
        unitPrice *= productData.paperMultipliers[paperType] || 1;
        
        // Применяем коэффициенты цветности
        unitPrice *= productData.colorMultipliers[colorOption] || 1;
        
        // Добавляем стоимость отделки
        unitPrice += productData.finishingPrices[finishingOption] || 0;
        
        // Определяем скидку по тиражу
        const discountLevel = calculatorData.quantityDiscounts.find(
          d => quantity >= d.min && quantity <= d.max
        );
        const quantityMultiplier = discountLevel ? discountLevel.multiplier : 1;
        
        // Умножители для срочности и доставки
        const urgencyMultiplier = 1 + (urgencyPercent / 100);
        const deliveryCost = needDelivery ? 500 : 0;
        
        // Окончательный расчет
        const finalUnitPrice = unitPrice * quantityMultiplier;
        const finalTotalPrice = (finalUnitPrice * quantity * urgencyMultiplier) + deliveryCost;
        
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <CalculatorForm 
        calculatorState={calculatorState}
        availableSizes={availableSizes}
        isCalculating={isCalculating}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleExcelUpload={handleExcelUpload}
        calculatePrice={calculatePrice}
      />
      
      <CalculatorResults 
        totalPrice={totalPrice} 
        pricePerUnit={pricePerUnit} 
        quantity={calculatorState.quantity}
        isUrgent={calculatorState.urgencyPercent > 0}
        urgencyPercent={calculatorState.urgencyPercent}
        needDelivery={calculatorState.needDelivery}
      />
    </div>
  );
};

export default PrintCalculator;
