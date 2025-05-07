
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import PrintCalculator from "@/components/PrintCalculator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
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
      
      <Footer />
    </div>
  );
};

export default Index;
