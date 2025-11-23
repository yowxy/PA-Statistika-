export function fTest(
  variance1: number,
  variance2: number,
  n1: number,
  n2: number
) {
  if (n1 <= 1 || n2 <= 1) throw new Error("Sample size must be > 1");
  if (variance1 <= 0 || variance2 <= 0) throw new Error("Variances must be > 0");

  const F =
    variance1 > variance2
      ? variance1 / variance2
      : variance2 / variance1;

  const df1 = n1 - 1;
  const df2 = n2 - 1;

  return { F, df1, df2 };
}
