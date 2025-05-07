
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
  calculatePrice,
  handleExcelUpload
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
          handleExcelUpload={handleExcelUpload}
        />
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
