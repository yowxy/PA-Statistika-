export function zTest(
    sampleMean: number,
    populationMean: number,
    standardDeviation: number,  
    sampleSize: number
): number {
         const standardError = standardDeviation / Math.sqrt(sampleSize);
        const zScore = (sampleMean - populationMean) / standardError;
        return zScore;
    }