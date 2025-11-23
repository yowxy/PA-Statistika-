import Button from "../../../components/button";

export default function HeroSection() {
    return (
        <div className="flex justify-center items-center px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
            <div className="flex justify-center items-center flex-col w-full max-w-6xl mx-auto">
                <div 
                    data-aos="fade-up" 
                    data-aos-duration="800" 
                    className="bg-[#DDD5CE] w-full max-w-[280px] sm:max-w-[333px] h-9 sm:h-10 md:h-12 rounded-2xl sm:rounded-3xl flex justify-center items-center mt-4 sm:mt-6 md:mt-8 lg:mt-10 px-3 sm:px-4"
                >
                    <h1 className="font-semibold text-xs sm:text-sm md:text-base">Platform Interaktif</h1>
                </div>

                <div className="items-center text-center mt-3 sm:mt-4 md:mt-5 w-full">
                    <h1 
                        data-aos="fade-up" 
                        data-aos-duration="1000" 
                        className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight px-2 sm:px-4"
                    >
                        Analisis Kemiskinan Kabupaten<br/>
                        Kota Jawa Timur Melalui Uji <br/>
                        Hipotesis <br/>
                    </h1>
                    <div className="mt-3 sm:mt-4 md:mt-5">
                        <p 
                            data-aos="fade-up" 
                            data-aos-duration="1000" 
                            className="text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-4"
                        >
                            Analisa kemiskinan menggunakan uji Hipotesis
                        </p>
                        <div 
                            data-aos="fade-up" 
                            data-aos-duration="1000" 
                            className="mt-4 sm:mt-5 md:mt-6 flex justify-center px-2 sm:px-4"
                        >
                            <Button data-aos="fade-up" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}