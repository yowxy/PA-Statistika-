export function proportionTest(
  sampleProp: number,
  populationProp: number,
  n: number
): number {
  const standardError = Math.sqrt(
    (populationProp * (1 - populationProp)) / n
  );

  const zScore = (sampleProp - populationProp) / standardError;
  return zScore;
}
