import { Home, LayoutDashboard, Sun, Moon } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

export default function NavbarDashboard() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="bg-(--color-nav-bg) border-b border-(--color-nav-border) shadow-sm sticky top-0 z-30 transition-colors duration-200">
            <div className="px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 text-(--color-text)">
                    {/* Left side - Title */}
                    <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-(--color-accent) rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm">
                            <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
                        </div>
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                            Dashboard
                        </h1>
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="p-2 rounded-lg border border-(--color-nav-border) hover:bg-(--color-nav-border) transition-colors"
                        >
                            {theme === "light" ? (
                                <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                                <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                        </button>
                        {/* Home Button */}
                        <a
                            href="/"
                            className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-(--color-accent) text-gray-900 rounded-lg hover:bg-[#D1F447]/90 transition-all duration-200 font-medium text-xs sm:text-sm md:text-base shadow-sm hover:shadow-md transform hover:-translate-y-0.5 whitespace-nowrap"
                        >
                            <Home className="w-4 h-4 sm:w-4 sm:h-4 shrink-0" />
                            <span className="hidden sm:inline">Kembali ke Home</span>
                            <span className="sm:hidden">Home</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
