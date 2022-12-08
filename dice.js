const findScore = (diceArray) => {
  let result = 0;
  if (diceArray) {
    const min = Math.min(...diceArray);
    result = min;
    diceArray.splice(diceArray.indexOf(min), 1);
  }
  return result;
};

const createRandomDice = () => {
  const min = 1;
  const max = 6;
  // generating a random dice
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
};

const updateCountMap = (totalScore, countMap) => {
  if (countMap.get(totalScore)) {
    countMap.set(totalScore, countMap.get(totalScore) + 1);
  } else {
    countMap.set(totalScore, 1);
  }
};

const processDiceList = (diceList, countMap, totalCombineScore) => {
  let totalScore = 0;
  //processing dice value 3 .cleaning 3 values from the array
  diceList.forEach((value, index) => {
    if (value === 3) {
      diceList.splice(index, 1);
      updateCountMap(totalScore, countMap);
    }
  });

  //processing remaining dice values such 1,2,4,5 and 6
  while (diceList.length) {
    const score = findScore(diceList);
    totalScore += score;
    updateCountMap(totalScore, countMap);
  }

  totalCombineScore += totalScore;
  // console.log("totalScore" , totalScore);
};

// process iterations based on the user input
const processIterations = (numberOfIteration, countMap, totalCombineScore) => {
  while (numberOfIteration > 0) {
    numberOfIteration--;

    const randomArray = [];
    for (let i = 1; i <= numerOfDice; i++) {
      randomArray.push(createRandomDice());
    }

    const diceList = [...randomArray];
    processDiceList(diceList, countMap, totalCombineScore);
  }
};

const numerOfDice = 2;
let numberOfIteration = 100;
let totalCombineScore = 0;
const countMap = new Map();

const startTime = new Date();

processIterations(numberOfIteration, countMap, totalCombineScore);
const sortedMap = new Map([...countMap].sort());

console.log(
  "Number of simulations was " +
    numberOfIteration +
    " using " +
    numerOfDice +
    " dice."
);
sortedMap.forEach((value, key) => {
  const percentage = Math.floor((totalScore / value) * 100);
  console.log("Total " + key + " occurred " + value + " times");
});

const endTime = new Date();

console.log(
  " Total simulation took ",
  (endTime.getTime() - startTime.getTime()) / 1000 + " seconds "
);
