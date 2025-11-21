import Card from "../../../components/card";

export default function InfoProyek() {
  return (
    <div className="flex justify-center mt-[200px] ">
        <div className="flex flex-col text-center">
            <h1 className="font-semibold text-[48px]">Informasi Proyek</h1>
            <p className="text-2xl">Penerapan Uji Hipotesis dalam Analisis Kemiskinan</p>
        <div className="flex flex-row gap-5">
            <Card 
            title="Apa itu Uji Hipotesis?"
            description="Uji hipotesis adalah 
             metode statistik
             untuk menguji kebenaran 
             suatu pernyataan 
             (hipotesis) dengan 
             menggunakan data 
             sampel untuk 
             membuat kesimpulan 
             mengenai populasi"
            />
            <Card 
            title="Kenapa penting untuk analisa kemiskinan"
            description="Pengujian hipotesis 
            membantu memastikan apakah 
            perbedaan tingkat 
            kemiskinan antar wilayah 
            signifikan secara statistik, 
            bukan sekadar kebetulan. 
            Dengan demikian, 
            hasil analisis dapat 
            digunakan untuk 
            menyusun kebijakan 
            pemerataan dan 
            intervensi pemerintah 
            daerah."
            />
            <Card 
            title="Data Dari mana?"
            description="Data diperoleh dari 
            platform Open Data 
            Jawa Timur, yang 
            menyediakan dataset 
            resmi terkait kondisi 
            sosial dan ekonomi 
            daerah. Dataset 
            kemiskinan 
            Kabupaten/Kota 
            digunakan sebagai 
            dasar analisis 
            pada 
            tahun 2023/2024."
            />
        </div>
        </div>
    </div>
  )
}
