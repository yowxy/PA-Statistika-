import LayoutsDashboard from "../layouts/layouts";
import { useLocation } from "react-router-dom";

type ResultPayload = {
  stat: number;
  pValue: number;
  critical: number;
  decision: string;
};

export default function HasilUji() {
  const location = useLocation();
  const data = location.state as ResultPayload | null;

  return (
    <LayoutsDashboard>
      <h1 className="text-2xl font-semibold">Hasil Uji Hipotesis</h1>
      <p className="mt-2 text-gray-600">Berikut adalah hasil perhitungannya.</p>

      <div className="mt-6 bg-white border shadow p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">Ringkasan Hasil</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="p-4 border rounded-lg">
            <p className="text-gray-600">Statistik Uji</p>
            <p className="text-2xl font-bold text-blue-600">
              {data?.stat.toFixed(4)}
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-gray-600">p-value</p>
            <p className="text-2xl font-bold text-blue-600">
              {data?.pValue}
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-gray-600">Nilai Kritis</p>
            <p className="text-2xl font-bold text-blue-600">
              {data?.critical}
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-gray-600">Keputusan</p>
            <p className="text-2xl font-bold text-green-600">
              {data?.decision}
            </p>
          </div>

        </div>
      </div>
    </LayoutsDashboard>
  );
}
