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
    const lines = fileContent.trim().split("\n");

    const array1 = [];
    const array2 = [];

    lines.forEach((line) => {
      const [value1, value2] = line.trim().split(/\s+/);
      array1.push(parseInt(value1));
      array2.push(parseInt(value2));
    });

    return { array1, array2 };
  } catch (error) {
    console.error("Error parsing file:", error);
    throw error;
  }
}

async function main() {
  try {
    const { array1, array2 } = await parseFileIntoArrays("data.txt");
    part1(array1, array2);
    part2(array1, array2);
  } catch (error) {
    console.error("Error in main:", error);
  }
}

function part1(array1, array2) {
  let leftArray = array1.sort((a, b) => a - b);
  let rightArray = array2.sort((a, b) => a - b);
  let res = [];
  let sum = 0;

  for (let i = 0; i < array1.length; i++) {
    result = Math.abs(leftArray[i] - rightArray[i]);
    res.push(result);
  }

  for (let i = 0; i < res.length; i++) {
    sum = sum + res[i];
  }

  console.log(sum);
}

function part2(array1, array2) {
  // take the first no. in the first arr
  res = [];
  sum = 0;
  for (let i = 0; i < array1.length; i++) {
    let digit = array1[i];
    let frequency = 0;

    for (let i = 0; i < array1.length; i++) {
      if (array2[i] == digit) {
        frequency += 1;
      }
    }
    const product = digit * frequency;
    res.push(product);
  }

  for (let i = 0; i < res.length; i++) {
    sum += res[i];
  }

  console.log(sum);

  // check the frequency of the num in the 2nd arr
  // multiply the no. with the frequency
  // store and return it in res
  // [3, 4, 2, 1, 3, 3]
  // [4, 3, 5, 3, 9, 3]
}

main();
