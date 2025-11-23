import Card from "../../../components/card";

export default function InfoProyek() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div 
            data-aos="fade-up" 
            data-aos-duration="800" 
            className="inline-block bg-[#DDD5CE] px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6"
          >
            <span className="font-semibold text-xs sm:text-sm md:text-base">Informasi Proyek</span>
          </div>
          
          <h1 
            data-aos="fade-up" 
            data-aos-duration="1000" 
            className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 mb-3 sm:mb-4 px-2"
          >
            Informasi Proyek
          </h1>
          
          <p 
            data-aos="fade-up" 
            data-aos-duration="1100" 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-4"
          >
            Penerapan Uji Hipotesis dalam Analisis Kemiskinan
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-items-center">
          <div 
            data-aos="fade-up" 
            data-aos-duration="700"
            className="w-full flex justify-center"
          >
            <Card 
              title="Apa itu Uji Hipotesis?"
              description="Uji hipotesis adalah metode statistik untuk menguji kebenaran suatu pernyataan (hipotesis) dengan menggunakan data sampel untuk membuat kesimpulan mengenai populasi."
            />
          </div>
          
          <div 
            data-aos="fade-up" 
            data-aos-duration="900"
            className="w-full flex justify-center"
          >
            <Card 
              title="Kenapa penting untuk analisa kemiskinan"
              description="Pengujian hipotesis membantu memastikan apakah perbedaan tingkat kemiskinan antar wilayah signifikan secara statistik, bukan sekadar kebetulan. Dengan demikian, hasil analisis dapat digunakan untuk menyusun kebijakan pemerataan dan intervensi pemerintah daerah."
            />
          </div>
          
          <div 
            data-aos="fade-up" 
            data-aos-duration="1100"
            className="w-full flex justify-center md:col-span-2 lg:col-span-1"
          >
            <Card 
              title="Data Dari mana?"
              description="Data diperoleh dari platform Open Data Jawa Timur, yang menyediakan dataset resmi terkait kondisi sosial dan ekonomi daerah. Dataset kemiskinan Kabupaten/Kota digunakan sebagai dasar analisis pada tahun 2023/2024."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
