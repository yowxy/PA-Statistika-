export interface InterpretationResult {
  reject: boolean;
  message: string;
  kesimpulan: string;
  insight: string;
}

export function interpret(
  testStat: number,
  criticalValue: number
): InterpretationResult {
  const reject = Math.abs(testStat) > criticalValue;

  return {
    reject,
    message: reject
      ? "H0 ditolak. Ada perbedaan signifikan."
      : "H0 gagal ditolak. Tidak ada bukti perbedaan signifikan.",

    kesimpulan: reject
      ? "Terdapat bukti statistik bahwa nilai yang diuji berbeda secara signifikan dari hipotesis awal."
      : "Tidak terdapat bukti statistik yang cukup untuk menyatakan adanya perbedaan signifikan dari hipotesis awal.",

    insight: reject
      ? "Hasil ini dapat menunjukkan adanya pola baru, perubahan kondisi, atau faktor lain yang mempengaruhi data sehingga berbeda signifikan."
      : "Hasil yang tidak signifikan menunjukkan bahwa kondisi data stabil atau tidak mengalami perubahan berarti."
  };
}
