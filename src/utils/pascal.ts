export function generatePascal(height: number): number[][] {
  let result = [[1], [1, 1]];

  for (let x = 0; x < height - 1; x++) {
    let currentPointer = 0;

    let innerResult = [1];
    let lastArray = result[result.length - 1];

    for (let y = 0; y < lastArray.length - 1; y++) {
      if (currentPointer + 1 > lastArray.length - 1) {
        innerResult.push(1);
        break;
      }

      innerResult.push(
        lastArray[currentPointer] + lastArray[currentPointer + 1]
      );
      currentPointer++;
    }

    innerResult.push(1);
    result.push(innerResult);
  }

  return result;
}
