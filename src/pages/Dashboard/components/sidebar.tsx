import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
    LayoutDashboard, 
    Database, 
    Calculator, 
    FileCheck, 
    FileText, 
    Menu, 
    X 
} from "lucide-react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        { 
            icon: LayoutDashboard, 
            label: "Dashboard", 
            href: "/dashboard" 
        },
        { 
            icon: Database, 
            label: "Data Kemiskinan", 
            href: "/dashboard/data-kemiskinan" 
        },
        { 
            icon: Calculator, 
            label: "Uji Hipotesis", 
            href: "/dashboard/uji-hipotesis" 
        },
        { 
            icon: FileCheck, 
            label: "Hasil Uji", 
            href: "/dashboard/hasil-uji" 
        },
        { 
            icon: FileText, 
            label: "Interpretasi", 
            href: "/dashboard/intrepretasi" 
        },
    ];

    const isActive = (href: string) => {
        return location.pathname === href;
    };

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isOpen && !target.closest('#default-sidebar') && !target.closest('[data-drawer-toggle]')) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                className="fixed top-4 left-4 z-50 inline-flex items-center p-2 text-sm text-gray-900 rounded-lg bg-[#D1F447] hover:bg-[#D1F447]/90 focus:outline-none focus:ring-2 focus:ring-[#D1F447] sm:hidden shadow-lg"
            >
                <span className="sr-only">Open sidebar</span>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 sm:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                id="default-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-4 py-6 overflow-y-auto bg-white border-r border-gray-200 shadow-lg">
                    {/* Logo/Brand */}
                    <div className="mb-8 px-2">
                        <a href="/dashboard" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#D1F447] rounded-xl flex items-center justify-center">
                                <LayoutDashboard className="w-6 h-6 text-gray-900" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">JagaJatim</span>
                        </a>
                    </div>

                    {/* Menu Items */}
                    <ul className="space-y-2 font-medium">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);
                            
                            return (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                                            active
                                                ? 'bg-[#D1F447] text-gray-900 font-semibold shadow-md'
                                                : 'text-gray-700 hover:bg-[#D1F447]/20 hover:text-gray-900'
                                        }`}
                                    >
                                        <Icon className={`w-5 h-5 transition-colors ${
                                            active ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
                                        }`} />
                                        <span className="ml-3 whitespace-nowrap">{item.label}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Back to Home Link */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <a
                            href="/"
                            className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200 group"
                        >
                            <span className="ml-3 text-sm font-medium">← Kembali ke Home</span>
                        </a>
                    </div>
                </div>
            </aside>
        </>
    );
}