export function addFeatures(a: number, b: number): number {
    if (a == 0) a = -0.01
    if (b == 0) b = -0.01
    return Math.floor((a + b) * 0.5 + 0.5)
}
