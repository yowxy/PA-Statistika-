import LayoutsDashboard from "../layouts/layouts";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  CheckCircle2, 
  XCircle, 
  BarChart3, 
  TrendingUp, 
  Target, 
  ArrowLeft,
  FileText
} from "lucide-react";

type ResultPayload = {
  stat: number;
  pValue: number;
  critical: number;
  decision: string;
};

export default function HasilUji() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state as ResultPayload | null;

  if (!data) {
    return (
      <LayoutsDashboard>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center text-(--color-text)">
          <XCircle className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Data Tidak Ditemukan</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Silakan lakukan uji hipotesis terlebih dahulu.</p>
          <button
            onClick={() => navigate("/dashboard/uji-hipotesis")}
            className="px-6 py-3 bg-[#D1F447] text-gray-900 rounded-xl font-semibold hover:bg-[#D1F447]/90 transition-colors"
          >
            Kembali ke Uji Hipotesis
          </button>
        </div>
      </LayoutsDashboard>
    );
  }

  const isRejected =
    data.decision.toLowerCase().includes("tolak") ||
    data.decision.toLowerCase().includes("reject");

  return (
    <LayoutsDashboard>
      <div className="space-y-6 text-(--color-text) transition-colors duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Hasil Uji Hipotesis</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Berikut adalah hasil perhitungan uji hipotesis
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/uji-hipotesis")}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Kembali</span>
          </button>
        </div>

        {/* Decision Card */}
        <div className={`rounded-2xl p-6 shadow-lg border-2 transition-colors duration-200 ${
          isRejected ? "bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-500/60" : "bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-500/60"
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
              isRejected ? "bg-red-100 dark:bg-red-500/40" : "bg-green-100 dark:bg-green-500/40"
            }`}>
              {isRejected ? (
                <XCircle className="w-8 h-8 text-red-600" />
              ) : (
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              )}
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Keputusan</p>
              <h2 className={`text-2xl font-bold ${
                isRejected ? "text-red-700" : "text-green-700"
              }`}>
                {data.decision}
              </h2>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-(--color-card-bg) rounded-2xl p-6 shadow-lg border border-(--color-border)">
            <div className="w-12 h-12 bg-[#D1F447] rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-gray-900" />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Statistik Uji</p>
            <p className="text-3xl font-bold">
              {data.stat.toFixed(4)}
            </p>
          </div>

          <div className="bg-(--color-card-bg) rounded-2xl p-6 shadow-lg border border-(--color-border)">
            <div className="w-12 h-12 bg-[#D1F447] rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-gray-900" />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">p-value</p>
            <p className="text-3xl font-bold">
              {data.pValue.toFixed(4)}
            </p>
          </div>

          <div className="bg-(--color-card-bg) rounded-2xl p-6 shadow-lg border border-(--color-border)">
            <div className="w-12 h-12 bg-[#D1F447] rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-gray-900" />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Nilai Kritis</p>
            <p className="text-3xl font-bold">
              ±{data.critical.toFixed(2)}
            </p>
          </div>

        </div>

        {/* Interpretation */}
        <div className="bg-(--color-card-bg) rounded-2xl p-6 shadow-lg border border-(--color-border)">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#D1F447] rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-900" />
            </div>
            <h2 className="text-xl font-semibold">Interpretasi</h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Statistik Uji:</span> {data.stat.toFixed(4)}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Nilai Kritis:</span> ±{data.critical.toFixed(2)}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">p-value:</span> {data.pValue.toFixed(4)}
          </p>

          <div className="mt-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {isRejected
                ? "Berdasarkan hasil uji hipotesis, H₀ ditolak. Ada cukup bukti untuk menerima H₁."
                : "Berdasarkan hasil uji hipotesis, H₀ tidak ditolak. Tidak ada cukup bukti untuk menerima H₁."}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => navigate("/dashboard/uji-hipotesis")}
            className="px-6 py-3 bg-[#D1F447] text-gray-900 rounded-xl font-semibold hover:bg-[#D1F447]/90 transition shadow-md"
          >
            Uji Hipotesis Baru
          </button>

          <button
            onClick={() =>
              navigate("/dashboard/intrepretasi", {
                state: data, // <<< kirim data ke interpretasi
              })
            }
            className="px-6 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 hover:border-[#D1F447] transition"
          >
            Lihat Interpretasi
          </button>

        </div>
      </div>
    </LayoutsDashboard>
  );
}
