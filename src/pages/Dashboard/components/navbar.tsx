import { Home } from "lucide-react";

export default function NavbarDashboard() {
    return (
        <nav className="bg-white w-full border-b border-gray-200 shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left side - Title */}
                    <div className="flex items-center space-x-4">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                            Dashboard
                        </h1>
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex items-center space-x-4">
                        <a
                            href="/"
                            className="flex items-center space-x-2 px-4 py-2 bg-[#D1F447] text-gray-900 rounded-lg hover:bg-[#D1F447]/90 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        >
                            <Home className="w-4 h-4" />
                            <span className="hidden sm:inline">Kembali ke Home</span>
                            <span className="sm:hidden">Home</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
