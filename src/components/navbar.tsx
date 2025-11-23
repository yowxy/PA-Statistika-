import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tentang", href: "#tentang" },
    { name: "Data", href: "#data" },
  ];

  return (
    <nav className="w-full flex justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-6">
      <div className="w-full max-w-7xl bg-[#D1F447] rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4">

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
          <a
            href="/dashboard"
            className="hidden md:block px-5 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 shadow-sm hover:shadow transition"
          >
            Masuk Dashboard
          </a>

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
          <div className="md:hidden border-t border-gray-900/20 px-4 py-4 animate-in fade-in slide-in-from-top duration-200 space-y-3 bg-[#D1F447]">
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
