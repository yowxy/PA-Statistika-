export function twoSampleTTest({
  mean1,
  mean2,
  variance1,
  variance2,
  n1,
  n2,
  equalVariance,
}: {
  mean1: number;
  mean2: number;
  variance1: number;
  variance2: number;
  n1: number;
  n2: number;
  equalVariance: boolean; // true = pooled, false = Welch
  alternative: "greater" | "less" | "two-sided";
}) {
  if (n1 <= 1 || n2 <= 1) throw new Error("Sample size must be > 1");
  if (variance1 <= 0 || variance2 <= 0)
    throw new Error("Variances must be > 0");

  let t: number;
  let df: number;

  if (equalVariance) {
    const spSquared =
      ((n1 - 1) * variance1 + (n2 - 1) * variance2) / (n1 + n2 - 2);

    const SE = Math.sqrt(spSquared * (1 / n1 + 1 / n2));

    t = (mean1 - mean2) / SE;
    df = n1 + n2 - 2;
  } else {
    const SE = Math.sqrt(variance1 / n1 + variance2 / n2);

    t = (mean1 - mean2) / SE;

    df =
      (SE ** 2) ** 2 /
      ((variance1 ** 2) / (n1 ** 2 * (n1 - 1)) +
        (variance2 ** 2) / (n2 ** 2 * (n2 - 1)));
  }

  return { t, df };
}
