
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary">ПринтКалькулятор</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="tel:+71234567890" className="flex items-center text-gray-700 hover:text-primary transition-colors">
            <Phone className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">+7 (123) 456-78-90</span>
          </a>
          <Button variant="outline">Связаться с нами</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
