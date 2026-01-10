import React from 'react';
import { Leaf, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-foreground">SmartFoodAI</span>
          </div>
          
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for healthier food choices
          </p>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Academic Project
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
