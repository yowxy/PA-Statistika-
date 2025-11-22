import LayoutsDashboard from "../layouts/layouts";

export default function Interpretasi() {
  return (
    <LayoutsDashboard>
      <h1 className="text-2xl font-semibold">Interpretasi Hasil Uji</h1>
      <p className="mt-2 text-gray-600">
        Pemahaman hasil uji berdasarkan konteks data kemiskinan.
      </p>

      <div className="mt-6 bg-white shadow rounded-xl p-6 space-y-4 border">
        <h2 className="text-xl font-semibold">Kesimpulan</h2>

        <p className="leading-relaxed text-gray-700">
          Berdasarkan hasil uji hipotesis dengan tingkat signifikansi 
          <span className="font-semibold"> 5% </span> diperoleh nilai statistik
          <span className="font-semibold"> Z = 1.82 </span> dan 
          <span className="font-semibold"> p-value = 0.034 </span>.
        </p>

        <p className="leading-relaxed text-gray-700">
          Karena p-value lebih kecil dari α, maka keputusan uji adalah 
          <span className="font-semibold text-green-600"> menolak H0 </span>.
        </p>

        <p className="leading-relaxed text-gray-700">
          Artinya, terdapat bukti statistik yang cukup untuk menyatakan bahwa
          tingkat kemiskinan yang diuji mengalami perubahan signifikan dibandingkan nilai hipotesis awal.
        </p>

        <div className="p-4 bg-blue-50 border rounded-lg mt-4">
          <h3 className="font-semibold mb-2">Insight</h3>
          <p className="text-gray-700">
            Perubahan tingkat kemiskinan ini dapat menjadi indikator bahwa terdapat 
            dinamika ekonomi atau program sosial yang mempengaruhi kesejahteraan masyarakat.
          </p>
        </div>
      </div>
    </LayoutsDashboard>
  );
}
