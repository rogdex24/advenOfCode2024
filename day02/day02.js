const fs = require("fs").promises;

async function readTextFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

async function parseFileIntoArrays(filePath) {
  try {
    const fileContent = await readTextFile(filePath);
    const arrayOfLines = fileContent
      .trim()
      .split("\n")
      .map((line) => line.split(" ").map(Number));
    return arrayOfLines;
  } catch (error) {
    console.error("Error parsing file:", error);
    throw error;
  }
}

async function main() {
  try {
    const array = await parseFileIntoArrays("./data.txt");
    part1(array);
    part2(array);
  } catch (error) {
    console.error("Error in main:", error);
  }
}

function part1(array) {
  let safe = 0;

  for (const sequence of array) {
    let isIncreasing = false;
    let isDecreasing = false;
    let isValid = true;

    for (let i = 1; i < sequence.length; i++) {
      const diff = sequence[i] - sequence[i - 1];

      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
        isValid = false;
        break;
      }

      if (diff > 0) isIncreasing = true;
      if (diff < 0) isDecreasing = true;
    }

    if (isValid && isIncreasing !== isDecreasing) {
      safe++;
    }
  }

  console.log(safe);
}

function isSequenceSafe(numbers) {
  if (numbers.length < 2) return true;

  let increasing = true;
  let decreasing = true;

  for (let i = 1; i < numbers.length; i++) {
    const diff = numbers[i] - numbers[i - 1];

    // Check if difference is between 1 and 3
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }

    // Check if sequence breaks increasing/decreasing pattern
    if (diff > 0) decreasing = false;
    if (diff < 0) increasing = false;
    if (!increasing && !decreasing) return false;
  }

  return true;
}

function part2(array) {
  let safeCount = 0;

  for (const line of array) {
    // First check if sequence is already safe
    if (isSequenceSafe(line)) {
      safeCount++;
      continue;
    }

    // Try removing each number one at a time
    let canBeMadeSafe = false;
    for (let i = 0; i < line.length; i++) {
      
      const modifiedSequence = [];
      for (let j = 0; j < line.length; j++) {
        if (j !== i) {
          modifiedSequence.push(line[j]);
        }
      }
      
      if (isSequenceSafe(modifiedSequence)) {
        canBeMadeSafe = true;
        break;
      }
    }

    if (canBeMadeSafe) {
      safeCount++;
    }
  }

  console.log(safeCount);
  return safeCount;
}

main();
