import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-slate-100 dark:bg-black border-t border-amber-500/20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            {/* Crown icon should be imported where Footer is used */}
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600 bg-clip-text text-transparent">
              Rejeb Furniture
            </span>
          </div>
          <p className="text-slate-600 dark:text-gray-400 mb-4">
            Crafting luxury furniture with Arabian elegance since 1990. Transform your space into a palace of
            comfort and style.
          </p>
          <div className="flex space-x-4">
            {/* Social links can be passed as props if needed */}
            <a href="https://facebook.com/alfakhir" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center hover:bg-amber-500/30 transition-colors cursor-pointer text-lg" title="Facebook">📘</a>
            <a href="https://instagram.com/alfakhir" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center hover:bg-amber-500/30 transition-colors cursor-pointer text-lg" title="Instagram">📷</a>
            <a href="https://t.me/alfakhir" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center hover:bg-amber-500/30 transition-colors cursor-pointer text-lg" title="Telegram">✈️</a>
            <a href="https://tiktok.com/@alfakhir" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center hover:bg-amber-500/30 transition-colors cursor-pointer text-lg" title="TikTok">🎵</a>
          </div>
        </div>
        <div>
          <h4 className="text-slate-800 dark:text-white font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2">
            {['Home', 'Collections', 'About', 'Showrooms', 'Contact'].map(link => (
              <a key={link} href="#" className="block text-slate-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">{link}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-slate-800 dark:text-white font-semibold mb-4">Collections</h4>
          <div className="space-y-2">
            {['Majlis', 'Sofas', 'Beds', 'Curtains', 'Custom Orders'].map(collection => (
              <a key={collection} href="#" className="block text-slate-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">{collection}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-amber-500/20 mt-8 pt-8 text-center">
        <p className="text-slate-600 dark:text-gray-400">
          © {new Date().getFullYear()} Rejeb Furniture. All rights reserved. | Crafted with excellence in Ethiopia
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
