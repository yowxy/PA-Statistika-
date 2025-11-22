import Button from "./button";

export default function Footer() {
    return (
        <footer className="w-full bg-[#D1F447] mt-20 sm:mt-32 lg:mt-40">
            <div className="flex text-center justify-center w-full h-auto p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20">
                <div className="flex justify-center items-center flex-col max-w-4xl mx-auto px-4">
                    <h1 
                        data-aos="fade-up" 
                        data-aos-duration="1000" 
                        className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 leading-tight"
                    >
                        Analisis Kemiskinan Kabupaten/Kota <br className="hidden sm:block" />
                        Jawa Timur Melalui Uji Hipotesis
                    </h1>
                    <div 
                        className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 w-full sm:w-auto" 
                        data-aos="fade-up" 
                        data-aos-duration="1200"
                    >
                        <a href="/dashboard" className="inline-block w-full sm:w-auto">
                            <Button />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}