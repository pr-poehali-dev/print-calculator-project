
import { useState, useEffect } from "react";
import PrintCalculator from "@/components/PrintCalculator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Онлайн калькулятор печатной продукции</h1>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              Рассчитайте стоимость печати вашей продукции онлайн. Выберите параметры, укажите тираж, 
              и получите моментальный расчет стоимости.
            </p>
          </div>
          
          <PrintCalculator />
        </div>
      </main>
    </div>
  );
};

export default Index;
