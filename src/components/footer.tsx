import Button from "./button";

export default function Footer() {
    return (
        <footer className="w-full bg-[#D1F447] mt-20 sm:mt-32 lg:mt-40">
            <div className="flex text-center justify-center w-full h-auto p-8 sm:p-12 lg:p-20">
                <div className="flex justify-center items-center flex-col">
                    <h1 
                        data-aos="fade-up" 
                        data-aos-duration="1000" 
                        className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-gray-900"
                    >
                        Analisis Kemiskinan Kabupaten/Kota <br/>
                        Jawa Timur Melalui Uji Hipotesis
                    </h1>
                    <div 
                        className="mt-8 sm:mt-12 lg:mt-16" 
                        data-aos="fade-up" 
                        data-aos-duration="1200"
                    >
                        <a href="/dashboard">
                            <Button />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}