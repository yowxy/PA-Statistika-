import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tentang", href: "#tentang" },
    { name: "Data", href: "#data" },
  ];

  return (
    <nav className="w-full flex justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-(--color-text)">
      <div className="w-full max-w-7xl bg-(--color-accent) rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-colors duration-200">
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 md:px-8 py-4">

          {/* Logo */}
          <a
            href="/"
            className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 hover:text-gray-700 transition"
          >
            JagaJatim
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-900 font-semibold hover:text-gray-700 transition relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg bg-white/80 hover:bg-white text-gray-900 transition shadow-sm"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <a
              href="/dashboard"
              className="px-5 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 shadow-sm hover:shadow transition"
            >
              Masuk Dashboard
            </a>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-900/10 transition"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-900/20 px-4 py-4 animate-in fade-in slide-in-from-top duration-200 space-y-3 bg-(--color-accent)">
            <button
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/80 text-gray-900 font-medium shadow-sm"
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-5 h-5" /> <span>Mode Gelap</span>
                </>
              ) : (
                <>
                  <Sun className="w-5 h-5" /> <span>Mode Terang</span>
                </>
              )}
            </button>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block font-semibold text-gray-900 py-2 rounded-lg hover:bg-gray-900/10 transition"
              >
                {link.name}
              </a>
            ))}

            <a
              href="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="block text-center w-full px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
            >
              Masuk Dashboard
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
