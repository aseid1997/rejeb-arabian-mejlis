import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Crown, ShoppingCart, Users, Globe, Sun, Moon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface NavbarProps {
  cartItems: { quantity: number }[];
  setShowCart: (open: boolean) => void;
  showAdminPanel: boolean;
  setShowAdminPanel: (open: boolean) => void;
  isSupabaseConfigured: boolean;
  language: "en" | "am";
  setLanguage: (lang: "en" | "am") => void;
  theme: string;
  setTheme: (theme: string) => void;
  t: any;
}

const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  setShowCart,
  showAdminPanel,
  setShowAdminPanel,
  isSupabaseConfigured,
  language,
  setLanguage,
  theme,
  setTheme,
  t,
}) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-amber-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600 bg-clip-text text-transparent">
              Rejeb Furniture
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#home" className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              {t.nav.home}
            </Link>
            <Link href="#majlis" className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              {t.nav.majlis}
            </Link>
            <Link href="#sofas" className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              {t.nav.sofas}
            </Link>
            <Link href="#beds" className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              {t.nav.beds}
            </Link>
            <Link href="#curtains" className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              {t.nav.curtains}
            </Link>
            <Link href="#about" className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              {t.nav.about}
            </Link>
            <Link href="#contact" className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              {t.nav.contact}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCart(true)}
              className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              )}
            </Button>

            {/* Admin Panel Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400"
            >
              <Users className="h-5 w-5" />
            </Button>

            {!isSupabaseConfigured && (
              <div className="hidden md:flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-xs text-amber-600 dark:text-amber-400">Demo</span>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === "en" ? "am" : "en")}
              className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400"
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
