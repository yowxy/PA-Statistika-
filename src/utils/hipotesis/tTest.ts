export function tTest (
    sampleMean: number,
    populationMean: number,
    sampleStandardDeviation: number,
    sampleSize: number
): number {
    const standardError = sampleStandardDeviation / Math.sqrt(sampleSize);
    const tScore = (sampleMean - populationMean) / standardError;
    return tScore;
}