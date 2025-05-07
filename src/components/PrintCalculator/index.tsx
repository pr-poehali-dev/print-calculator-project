
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { MOCK_DATA } from "./data";
import CalculatorResults from "../CalculatorResults";
import CalculatorForm from "./CalculatorForm";
import { CalculatorState } from "./types";

const PrintCalculator = () => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    productType: "",
    paperType: "",
    size: "",
    colorOption: "",
    finishingOption: "none",
    quantity: 100,
    uploadedFile: null,
    isUrgent: false,
    needDelivery: false,
  });

  const [availableSizes, setAvailableSizes] = useState(MOCK_DATA.sizes);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // Фильтрация доступных размеров в зависимости от выбранного типа продукции
  useEffect(() => {
    if (calculatorState.productType) {
      const filtered = MOCK_DATA.sizes.filter(s => s.productTypeId === calculatorState.productType);
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
  }, [calculatorState.productType]);

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

  const calculatePrice = () => {
    const { productType, paperType, size, colorOption, quantity, isUrgent, needDelivery, finishingOption } = calculatorState;
    
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <CalculatorForm 
        calculatorState={calculatorState}
        availableSizes={availableSizes}
        isCalculating={isCalculating}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        calculatePrice={calculatePrice}
      />
      
      <CalculatorResults 
        totalPrice={totalPrice} 
        pricePerUnit={pricePerUnit} 
        quantity={calculatorState.quantity}
        isUrgent={calculatorState.isUrgent}
        needDelivery={calculatorState.needDelivery}
      />
    </div>
  );
};

export default PrintCalculator;
