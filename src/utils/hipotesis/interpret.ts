export interface InterpretationResult {
  reject: boolean;
  message: string;
}

export function interpret(
  testStat: number,
  criticalValue: number
): InterpretationResult {
  if (Math.abs(testStat) > criticalValue) {
    return {
      reject: true,
      message: "H0 ditolak. Ada perbedaan signifikan."
    };
  }

  return {
    reject: false,
    message: "H0 gagal ditolak. Tidak ada bukti perbedaan signifikan."
  };
}
