export function twoSampleZTest({
  mean1,
  mean2,
  sigma1,
  sigma2,
  n1,
  n2,
}: {
  mean1: number;
  mean2: number;
  sigma1: number;
  sigma2: number;
  n1: number;
  n2: number;
  alternative: "greater" | "less" | "two-sided";
}) {
  if (n1 <= 0 || n2 <= 0) throw new Error("Sample size must be > 0");
  if (sigma1 <= 0 || sigma2 <= 0) throw new Error("Sigma must be > 0");

  const SE = Math.sqrt((sigma1 ** 2) / n1 + (sigma2 ** 2) / n2);

  const Z = (mean1 - mean2) / SE;

  return { Z, SE };
}
