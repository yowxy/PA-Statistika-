import { jStat } from "jstat";

export function chiSquareVariance({
  s,
  n,
  sigma0,
  alternative,
}: {
  s: number;
  n: number;
  sigma0: number;
  alternative: "two-sided" | "greater" | "less";
}) {
  if (n <= 1) throw new Error("Sample size must be greater than 1");
  if (s <= 0 || sigma0 <= 0) throw new Error("Variance must be > 0");

  const df = n - 1;

  const chi = (df * s) / sigma0;

  let pValue: number;

  if (alternative === "greater") {
    pValue = 1 - jStat.chisquare.cdf(chi, df);
  } else if (alternative === "less") {
    pValue = jStat.chisquare.cdf(chi, df);
  } else {
    const left = jStat.chisquare.cdf(chi, df);
    const right = 1 - left;
    pValue = 2 * Math.min(left, right);
  }

  return { chi, df, pValue };
}
