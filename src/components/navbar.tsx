import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tentang", href: "#tentang" },
    { name: "Data", href: "#data" },
  ];

  return (
    <nav className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10">
      <div className="w-full max-w-7xl bg-[#D1F447] rounded-2xl shadow-lg">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
          {/* Logo */}
          <div className="shrink-0">
            <a href="/" className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200">
              JagaJatim
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-900 font-semibold hover:text-gray-700 transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block shrink-0">
            <a
              href="/dashboard"
              className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Masuk Dashboard
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-900 hover:bg-gray-900/10 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-900/20 px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-gray-900/10 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200 mt-4"
            >
              Masuk Dashboard
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
