import LayoutsDashboard from "../layouts/layouts";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  BarChart3, 
  TrendingUp, 
  Target,
  Lightbulb,
  BookOpen
} from "lucide-react";

type ResultPayload = {
  stat: number;
  pValue: number;
  critical: number;
  decision: string;
};

export default function Interpretasi() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state as ResultPayload | null;

  if (!data) {
    return (
      <LayoutsDashboard>
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
          <XCircle className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Data Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">Tidak ada data interpretasi yang tersedia.</p>
          <button
            onClick={() => navigate("/dashboard/uji-hipotesis")}
            className="px-6 py-3 bg-[#D1F447] text-gray-900 rounded-xl font-semibold hover:bg-[#D1F447]/90 transition-colors shadow-md"
          >
            Kembali ke Uji Hipotesis
          </button>
        </div>
      </LayoutsDashboard>
    );
  }

  const isRejected = data.decision.toLowerCase().includes("tolak") || 
                     data.decision.toLowerCase().includes("reject");
  const absStat = Math.abs(data.stat);

  return (
    <LayoutsDashboard>
      <div className="space-y-6 text-(--color-text) transition-colors duration-200">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold">Interpretasi Uji Hipotesis</h1>
              <p className="mt-1 text-gray-600 dark:text-gray-300">Penjelasan detail hasil pengujian hipotesis</p>
            </div>
          </div>
        </div>

        {/* Decision Banner */}
        <div className={`rounded-2xl p-6 shadow-lg border-2 transition-colors duration-200 ${
          isRejected 
            ? "bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-500/60" 
            : "bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-500/60"
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Keputusan Uji</p>
              <h2 className={`text-2xl font-bold ${
                isRejected ? "text-red-700" : "text-green-700"
              }`}>
                {data.decision}
              </h2>
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-(--color-card-bg) rounded-2xl p-6 shadow-lg border border-(--color-border)">
            <div className="w-12 h-12 bg-[#D1F447] rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-gray-900" />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Statistik Uji</p>
            <p className="text-3xl font-bold">
              {data.stat.toFixed(4)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              |Statistik| = {absStat.toFixed(4)}
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
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Daerah penolakan: |z| &gt; {data.critical.toFixed(2)}
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
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Probabilitas ekstrem
            </p>
          </div>
        </div>

        {/* Detailed Interpretation */}
        <div className="bg-(--color-card-bg) rounded-2xl p-6 lg:p-8 shadow-lg border border-(--color-border)">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#D1F447] rounded-xl flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-gray-900" />
            </div>
            <h2 className="text-xl font-semibold">Interpretasi Hasil</h2>
          </div>

          <div className="space-y-4">
            {/* Comparison */}
            <div className="p-4 bg-[#D1F447]/10 rounded-xl border border-[#D1F447]/20">
              <h3 className="font-semibold mb-2">Perbandingan Nilai</h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  • Statistik Uji: <span className="font-bold">{data.stat.toFixed(4)}</span>
                </p>
                <p>
                  • Nilai Kritis: <span className="font-bold">±{data.critical.toFixed(2)}</span>
                </p>
                <p className="mt-3 font-medium">
                  {absStat > data.critical ? (
                    <span className="text-red-600">
                      Karena |{data.stat.toFixed(4)}| = {absStat.toFixed(4)} &gt; {data.critical.toFixed(2)}, 
                      maka statistik uji berada di daerah penolakan.
                    </span>
                  ) : (
                    <span className="text-green-600">
                      Karena |{data.stat.toFixed(4)}| = {absStat.toFixed(4)} ≤ {data.critical.toFixed(2)}, 
                      maka statistik uji tidak berada di daerah penolakan.
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Decision Explanation */}
            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
              <h3 className="font-semibold mb-2">Kesimpulan</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {isRejected ? (
                  <>
                    Berdasarkan hasil perhitungan, <strong>H₀ ditolak</strong> pada tingkat signifikansi yang digunakan. 
                    Hal ini berarti terdapat bukti statistik yang cukup untuk menyatakan bahwa hipotesis alternatif (H₁) 
                    dapat diterima. Dengan kata lain, terdapat perbedaan yang signifikan antara nilai sampel dengan nilai 
                    populasi yang dihipotesiskan.
                  </>
                ) : (
                  <>
                    Berdasarkan hasil perhitungan, <strong>H₀ tidak ditolak</strong> pada tingkat signifikansi yang digunakan. 
                    Hal ini berarti tidak terdapat bukti statistik yang cukup untuk menyatakan bahwa hipotesis alternatif (H₁) 
                    dapat diterima. Dengan kata lain, tidak terdapat perbedaan yang signifikan antara nilai sampel dengan nilai 
                    populasi yang dihipotesiskan.
                  </>
                )}
              </p>
            </div>

            {/* Practical Meaning */}
            <div className="p-4 bg-[#D1F447]/5 rounded-xl border border-[#D1F447]/10">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <h3 className="font-semibold">Makna Praktis</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {isRejected ? (
                  <>
                    Hasil ini menunjukkan bahwa temuan dari sampel memberikan bukti yang kuat terhadap hipotesis alternatif. 
                    Dalam konteks analisis kemiskinan, ini dapat berarti bahwa terdapat perbedaan signifikan antara kondisi 
                    yang diamati dengan kondisi yang dihipotesiskan, sehingga diperlukan tindakan atau kebijakan yang sesuai.
                  </>
                ) : (
                  <>
                    Hasil ini menunjukkan bahwa temuan dari sampel tidak memberikan bukti yang cukup untuk mendukung hipotesis 
                    alternatif. Dalam konteks analisis kemiskinan, ini dapat berarti bahwa tidak terdapat perbedaan signifikan 
                    antara kondisi yang diamati dengan kondisi yang dihipotesiskan, sehingga kondisi saat ini masih sesuai 
                    dengan hipotesis awal.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/dashboard/hasil-uji", { state: data })}
            className="px-6 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 hover:border-[#D1F447] transition-all duration-200"
          >
            Kembali ke Hasil Uji
          </button>
          <button
            onClick={() => navigate("/dashboard/uji-hipotesis")}
            className="px-6 py-3 bg-[#D1F447] text-gray-900 rounded-xl font-semibold hover:bg-[#D1F447]/90 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Uji Hipotesis Baru
          </button>
        </div>
      </div>
    </LayoutsDashboard>
  );
}
