
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Clock, Truck } from "lucide-react";
import { CalculatorState } from "./types";

interface AdditionalOptionsSectionProps {
  calculatorState: CalculatorState;
  handleChange: (name: keyof CalculatorState, value: any) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdditionalOptionsSection: React.FC<AdditionalOptionsSectionProps> = ({
  calculatorState,
  handleChange,
  handleFileChange
}) => {
  return (
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
            checked={calculatorState.isUrgent}
            onChange={(e) => handleChange("isUrgent", e.target.checked)}
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
    </div>
  );
};

export default AdditionalOptionsSection;
