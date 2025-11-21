import Button from "./button";

export default function Footer(){
    return (
        <div className="flex text-center justify-center w-full h-auto p-20 bg-[#D1F447] mt-96">
           <div className="flex justify-center items-center flex-col">
            <h1 data-aos = "fade-up"  data-aos-duration="1000"  className="font-semibold text-4xl ">Analisis Kemiskinan Kabupaten/Kota <br/>
                Jawa Timur Melalui Uji Hipotesis
            </h1>
            <div className="mt-24" data-aos = "fade-up"  data-aos-duration="1200">
            <Button />
            </div>
           </div>
        </div>  
    );
}