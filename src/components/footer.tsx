import Button from "./button";

export default function Footer() {
    return (
       <footer className="w-full bg-[#D1F447] mt-12 sm:mt-16 md:mt-20 lg:mt-32 xl:mt-40">
  <div className="w-full flex justify-center text-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
    <div className="w-full max-w-4xl flex flex-col items-center px-3 sm:px-4">

      <h1 
        className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-900 leading-tight"
      >
        Analisis Kemiskinan Kabupaten/Kota <br className="hidden sm:block" />
        Jawa Timur Melalui Uji Hipotesis
      </h1>

      <div 
        className="mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16 w-full sm:w-auto"
      >
        <a href="/dashboard" className="inline-block w-full sm:w-auto md:w-auto">
          <Button />
        </a>
      </div>

    </div>
  </div>
</footer>

    );
}