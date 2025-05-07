
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Truck, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorState } from "./types";
import { MOCK_DATA } from "./data";

interface AdditionalOptionsSectionProps {
  calculatorState: CalculatorState;
  handleChange: (name: keyof CalculatorState, value: any) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExcelUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdditionalOptionsSection: React.FC<AdditionalOptionsSectionProps> = ({
  calculatorState,
  handleChange,
  handleFileChange,
  handleExcelUpload
}) => {
  // Сгенерируем опции для процента срочности
  const urgencyOptions = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fileUpload" className="mb-2 block">Загрузите файл для печати (опционально)</Label>
        <Input id="fileUpload" type="file" onChange={handleFileChange} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="urgencyPercent" className="mb-2 block">Наценка за срочность</Label>
          <Select 
            value={String(calculatorState.urgencyPercent)} 
            onValueChange={(value) => handleChange("urgencyPercent", parseInt(value))}
          >
            <SelectTrigger id="urgencyPercent">
              <SelectValue placeholder="Выберите наценку" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Без наценки</SelectItem>
              {urgencyOptions.map(percent => (
                <SelectItem key={percent} value={String(percent)}>
                  +{percent}% к стоимости
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="needDelivery"
            checked={calculatorState.needDelivery}
            onChange={(e) => handleChange("needDelivery", e.target.checked)}
            className="w-4 h-4 text-primary border-gray-300 rounded"
          />
          <Label htmlFor="needDelivery" className="flex items-center">
            <Truck className="w-4 h-4 mr-2" />
            Нужна доставка (+500 руб.)
          </Label>
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <Label className="mb-2 block font-semibold">Настройка данных калькулятора</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="excelUpload" className="mb-2 block text-sm">Загрузить таблицу Excel с ценами</Label>
            <div className="flex items-center gap-2">
              <Input id="excelUpload" type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} />
              <div className="flex-shrink-0">
                <Upload className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
          
          <div>
            <Label className="mb-2 block text-sm">Скачать образец таблицы Excel</Label>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center gap-2"
              onClick={downloadExampleExcel}
            >
              <Download className="h-4 w-4" /> Скачать образец таблицы
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Функция для скачивания образца Excel-таблицы
const downloadExampleExcel = () => {
  // Создаем ссылку на файл
  const link = document.createElement('a');
  link.href = '/price-calculator-template.xlsx'; // Путь к файлу
  link.download = 'price-calculator-template.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default AdditionalOptionsSection;
