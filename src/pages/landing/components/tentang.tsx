export default function Tentang() {
    return (
        <div className="flex justify-center items-center text-center mt-20 mb-20"> 
        <div className="flex justify-center mt-[300px] flex-col"> 
            <h1 className="font-semibold text-5xl">Tentang Proyek</h1>
            <p className="text-2xl font-normal mt-2">Analisa kemiskinan melalui uji hipotesis</p>
            <div className="mt-28">
                <p>
                    Proyek ini merupakan penerapan konsep Pengujian Hipotesis pada <br/>
                    mata kuliah Praktikum Statistika Dasar dengan studi kasus <br/>
                     kemiskinan Kabupaten/Kota di Jawa Timur. Data resmi dari <br/>
                     OpenData Jatim diolah melalui proses pembersihan, analisis, dan <br/> 
                     visualisasi untuk membantu pengguna memahami perbedaan  <br/>
                     atau pola antar wilayah secara interaktif. <br/>
                </p>
            </div>
        </div>
        </div>
    );
}