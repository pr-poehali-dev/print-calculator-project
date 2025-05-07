
export interface CalculatorState {
  productType: string;
  paperType: string;
  size: string;
  colorOption: string;
  finishingOption: string;
  quantity: number;
  uploadedFile: File | null;
  urgencyPercent: number;
  needDelivery: boolean;
  priceData: PriceData | null;
}

export interface ProductType {
  id: string;
  name: string;
}

export interface PaperType {
  id: string;
  name: string;
}

export interface SizeOption {
  id: string;
  name: string;
  productTypeId: string;
}

export interface ColorOption {
  id: string;
  name: string;
}

export interface FinishingOption {
  id: string;
  name: string;
}

export interface PriceData {
  basePrice: number;
  paperMultipliers: Record<string, number>;
  colorMultipliers: Record<string, number>;
  finishingPrices: Record<string, number>;
}

export interface QuantityDiscount {
  min: number;
  max: number;
  multiplier: number;
}

export interface CalculatorFormProps {
  calculatorState: CalculatorState;
  availableSizes: SizeOption[];
  isCalculating: boolean;
  handleChange: (name: keyof CalculatorState, value: any) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  calculatePrice: () => void;
  handleExcelUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface DataFormat {
  productTypes: ProductType[];
  paperTypes: PaperType[];
  sizes: SizeOption[];
  colorOptions: ColorOption[];
  finishingOptions: FinishingOption[];
  prices: Record<string, PriceData>;
  quantityDiscounts: QuantityDiscount[];
}
