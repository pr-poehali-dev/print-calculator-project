
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MOCK_DATA } from "./data";
import { CalculatorState, SizeOption } from "./types";

interface OptionSelectionSectionProps {
  calculatorState: CalculatorState;
  availableSizes: SizeOption[];
  handleChange: (name: keyof CalculatorState, value: any) => void;
}

const OptionSelectionSection: React.FC<OptionSelectionSectionProps> = ({
  calculatorState,
  availableSizes,
  handleChange
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="productType">Тип продукции</Label>
          <Select 
            value={calculatorState.productType} 
            onValueChange={(value) => handleChange("productType", value)}
          >
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
          <Select 
            value={calculatorState.paperType} 
            onValueChange={(value) => handleChange("paperType", value)}
          >
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
          <Select 
            value={calculatorState.size} 
            onValueChange={(value) => handleChange("size", value)}
            disabled={!calculatorState.productType}
          >
            <SelectTrigger id="size">
              <SelectValue placeholder={calculatorState.productType ? "Выберите размер" : "Сначала выберите тип продукции"} />
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
          <Select 
            value={calculatorState.colorOption} 
            onValueChange={(value) => handleChange("colorOption", value)}
          >
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
          <Select 
            value={calculatorState.finishingOption} 
            onValueChange={(value) => handleChange("finishingOption", value)}
          >
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
            value={calculatorState.quantity}
            onChange={(e) => handleChange("quantity", parseInt(e.target.value) || 0)}
            className="w-full"
          />
        </div>
      </div>
    </>
  );
};

export default OptionSelectionSection;
