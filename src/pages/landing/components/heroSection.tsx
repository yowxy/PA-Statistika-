import Button from "../../../components/button";

export default function HeroSection() {
    return (
        <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center flex-col w-full max-w-6xl">
                <div 
                    data-aos="fade-up" 
                    data-aos-duration="800" 
                    className="bg-[#DDD5CE] w-full max-w-[333px] h-10 sm:h-12 rounded-3xl flex justify-center items-center mt-8 sm:mt-10 px-4"
                >
                    <h1 className="font-semibold text-sm sm:text-base">Platform Interaktif</h1>
                </div>

                <div className="items-center text-center mt-4 sm:mt-5 w-full">
                    <h1 
                        data-aos="fade-up" 
                        data-aos-duration="1000" 
                        className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-tight px-4"
                    >
                        Analisis Kemiskinan Kabupaten<br/>
                        Kota Jawa Timur Melalui Uji <br/>
                        Hipotesis <br/>
                    </h1>
                    <div className="mt-4 sm:mt-5">
                        <p 
                            data-aos="fade-up" 
                            data-aos-duration="1000" 
                            className="text-sm sm:text-base md:text-lg px-4"
                        >
                            Analisa kemiskinan menggunakan uji Hipotesis
                        </p>
                        <div 
                            data-aos="fade-up" 
                            data-aos-duration="1000" 
                            className="mt-4 sm:mt-6 flex justify-center px-4"
                        >
                            <Button data-aos="fade-up" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}