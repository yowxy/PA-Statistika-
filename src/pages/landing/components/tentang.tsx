import { Database, BarChart3, Target, TrendingUp } from "lucide-react";

export default function Tentang() {
    const features = [
        {
            icon: Database,
            title: "Data Resmi",
            description: "Menggunakan data resmi dari OpenData Jatim yang terpercaya dan terupdate"
        },
        {
            icon: BarChart3,
            title: "Analisis Mendalam",
            description: "Proses pembersihan, analisis, dan visualisasi data yang komprehensif"
        },
        {
            icon: Target,
            title: "Uji Hipotesis",
            description: "Penerapan konsep Pengujian Hipotesis dalam Praktikum Statistika Dasar"
        },
        {
            icon: TrendingUp,
            title: "Interaktif",
            description: "Visualisasi interaktif untuk memahami perbedaan dan pola antar wilayah"
        }
    ];

    return (
      <section 
        id="tentang" 
        className="w-full py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-3 sm:px-4 md:px-6 lg:px-8 transition-colors duration-200 text-(--color-text)"
      >
        <div className="max-w-7xl mx-auto">

          {/* Title Section */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <div 
              data-aos="fade-up" 
              data-aos-duration="800" 
              className="inline-block bg-[#DDD5CE] px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6"
            >
              <span className="font-semibold text-xs sm:text-sm md:text-base">
                Tentang Proyek
              </span>
            </div>

            <h1
              data-aos="fade-up"
              data-aos-duration="1000"
              className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-(--color-text) mb-3 sm:mb-4 px-2"
            >
              Tentang Proyek
            </h1>

            <p 
              data-aos="fade-up" 
              data-aos-duration="1100" 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto px-4"
            >
              Analisa kemiskinan melalui uji hipotesis
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
            {/* Text Box */}
            <div 
              data-aos="fade-up" 
              data-aos-duration="1000"
              className="space-y-6"
            >
              <div className="bg-(--color-card-bg) rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-(--color-border)">
                <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-black leading-relaxed">
                  Proyek ini merupakan penerapan konsep <span className="font-bold text-(--color-text)">Pengujian Hipotesis</span> pada 
                  mata kuliah Praktikum Statistika Dasar dengan studi kasus kemiskinan Kabupaten/Kota di Jawa Timur. 
                  Data resmi dari <span className="font-bold text-(--color-text)">OpenData Jatim</span> diolah melalui proses 
                  pembersihan, analisis, dan visualisasi untuk membantu pengguna memahami perbedaan atau pola antar 
                  wilayah secara interaktif.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div 
              data-aos="fade-up" 
              data-aos-duration="1000"
              className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6"
            >
              <div className="bg-[#D1F447] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 text-gray-900">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2">38</div>
                <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">Kabupaten/Kota</div>
              </div>
              <div className="bg-[#D1F447] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 text-gray-900">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2">100%</div>
                <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">Data Resmi</div>
              </div>
              <div className="bg-[#D1F447] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 col-span-2 text-gray-900">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">OpenData Jatim</div>
                <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">Sumber Data Terpercaya</div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay={index * 100}
                  className="bg-(--color-card-bg) rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-(--color-border)"
                >
                  <div className="bg-[#D1F447] w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" />
                  </div>
                  <h3 className="font-semibold text-lg sm:text-xl text-(--color-text) mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
}