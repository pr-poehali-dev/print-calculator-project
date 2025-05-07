
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, FileText, Clock, Truck, Check, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface CalculatorResultsProps {
  totalPrice: number;
  pricePerUnit: number;
  quantity: number;
  isUrgent: boolean;
  urgencyPercent: number;
  needDelivery: boolean;
}

const CalculatorResults = ({ 
  totalPrice, 
  pricePerUnit, 
  quantity,
  isUrgent,
  urgencyPercent,
  needDelivery
}: CalculatorResultsProps) => {
  const handleOrderClick = () => {
    toast({
      title: "Заказ создан",
      description: "Ваш заказ успешно создан. Мы свяжемся с вами для подтверждения.",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { 
      style: 'currency', 
      currency: 'RUB',
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5" /> Результаты расчета
        </CardTitle>
        <CardDescription>Стоимость печати согласно выбранным параметрам</CardDescription>
      </CardHeader>
      <CardContent>
        {totalPrice > 0 ? (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Стоимость за единицу:</span>
                <span className="font-medium">{formatPrice(pricePerUnit)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Количество:</span>
                <span className="font-medium">{quantity} шт.</span>
              </div>
              
              {isUrgent && (
                <div className="flex justify-between mb-1 text-amber-600">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" /> Наценка за срочность:
                  </span>
                  <span>+{urgencyPercent}%</span>
                </div>
              )}
              
              {needDelivery && (
                <div className="flex justify-between mb-1 text-blue-600">
                  <span className="flex items-center">
                    <Truck className="w-4 h-4 mr-1" /> Доставка:
                  </span>
                  <span>+500 ₽</span>
                </div>
              )}
              
              <Separator className="my-3" />
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Итоговая стоимость:</span>
                <span className="text-xl font-bold text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Что включено:</h4>
              <ul className="space-y-1">
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 mr-2 text-green-500" /> Печать согласно выбранным параметрам
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 mr-2 text-green-500" /> Проверка макета перед печатью
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 mr-2 text-green-500" /> Упаковка готовой продукции
                </li>
                {needDelivery && (
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 mr-2 text-green-500" /> Доставка по указанному адресу
                  </li>
                )}
              </ul>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>Цены указаны с учетом НДС. Окончательная стоимость может быть уточнена после проверки макета.</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center text-gray-500">
            <Printer className="w-12 h-12 mb-3 opacity-20" />
            <p>Заполните параметры печати и нажмите "Рассчитать стоимость"</p>
          </div>
        )}
      </CardContent>
      {totalPrice > 0 && (
        <CardFooter>
          <Button variant="default" className="w-full" onClick={handleOrderClick}>
            Оформить заказ
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CalculatorResults;
