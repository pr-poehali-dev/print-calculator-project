
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calculator, Printer, Clock, Truck, ExternalLink } from "lucide-react";
import { MOCK_DATA } from "./data";
import { CalculatorFormProps, CalculatorState } from "./types";
import OptionSelectionSection from "./OptionSelectionSection";
import AdditionalOptionsSection from "./AdditionalOptionsSection";

const CalculatorForm: React.FC<CalculatorFormProps> = ({ 
  calculatorState,
  availableSizes,
  isCalculating,
  handleChange,
  handleFileChange,
  calculatePrice
}) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5" /> Параметры печати
        </CardTitle>
        <CardDescription>Выберите параметры для расчета стоимости печати</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <OptionSelectionSection 
          calculatorState={calculatorState}
          availableSizes={availableSizes}
          handleChange={handleChange}
        />
        
        <Separator className="my-4" />
        
        <AdditionalOptionsSection 
          calculatorState={calculatorState}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
        />
        
        <div className="mt-2 text-sm">
          <a 
            href="https://docs.google.com/spreadsheets/d/1dexHmpzx9z3cAXzxpqKXLdWS9CjpBF5QxZZpTpMTkAE/edit?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 inline-flex items-center"
          >
            Открыть таблицу с ценами <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={calculatePrice} disabled={isCalculating} className="w-full">
          {isCalculating ? "Расчет..." : "Рассчитать стоимость"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CalculatorForm;
