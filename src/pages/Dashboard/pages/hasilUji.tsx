import LayoutsDashboard from "../layouts/layouts";

export default function HasilUji() {
  return (
    <LayoutsDashboard>
      <h1 className="text-2xl font-semibold">Hasil Uji Hipotesis</h1>
      <p className="mt-2 text-gray-600">
        Berikut adalah hasil perhitungan statistik berdasarkan input yang Anda masukkan.
      </p>

      <div className="mt-6 bg-white shadow rounded-xl p-6 space-y-4 border">
        <h2 className="text-xl font-semibold">Ringkasan Hasil</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="p-4 border rounded-lg">
            <p className="text-gray-600">Statistik Uji</p>
            <p className="text-2xl font-bold text-blue-600">1.82</p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-gray-600">p-value</p>
            <p className="text-2xl font-bold text-blue-600">0.034</p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-gray-600">Nilai Kritis</p>
            <p className="text-2xl font-bold text-blue-600">±1.96</p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-gray-600">Keputusan</p>
            <p className="text-2xl font-bold text-green-600">Tolak H0</p>
          </div>

        </div>
      </div>
    </LayoutsDashboard>
  );
}
