import Button from "../../../components/button";

export default function HeroSection() {
    return (
        <div className="flex justify-center items-center ">
            <div className="flex justify-center items-center flex-col">
                <div className="bg-[#DDD5CE] w-[333px] h-12 rounded-3xl flex justify-center items-center mt-10">
                    <h1 className="font-semibold">Platform Interaktif</h1>
                </div>


                <div className="items-center text-center mt-5">
                    <h1 className="font-semibold text-5xl">
                        Analisis Kemiskinan Kabupaten/ <br/>
                        Kota Jawa Timur Melalui Uji <br/>
                         Hipotesis <br/>
                    </h1>
                    <div className="mt-5">
                    <p>Analisa kemiskinan menggunakan uji Hipotesis</p>
                        <div className="mt-6 flex justify-center">
                            <Button />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}