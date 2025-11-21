export default function NavbarDashboard() {
    return (
        <div>
            <nav className="bg-neutral-primary w-full border-b border-default">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">Dashboard</span>
                    </a>
                    <button 
                        data-collapse-toggle="navbar-default" 
                        type="button" 
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden"
                    >
                        <svg className="w-6 h-6" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
                            <li><a href="#" className="block py-2 px-3 text-fg-brand">Home</a></li>
                            <li><a href="#" className="block py-2 px-3 text-heading hover:text-fg-brand">About</a></li>
                            <li><a href="#" className="block py-2 px-3 text-heading hover:text-fg-brand">Services</a></li>
                            <li><a href="#" className="block py-2 px-3 text-heading hover:text-fg-brand">Pricing</a></li>
                            <li><a href="#" className="block py-2 px-3 text-heading hover:text-fg-brand">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
