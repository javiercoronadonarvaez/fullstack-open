interface ExerciseArray {
  exerciseArray: number[];
  target: number;
}

const parseTrainingArguments = (args: string[]): ExerciseArray => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (isNaN(Number(args[2]))) {
    throw new Error("Provided values were not numbers!");
  }

  let exerciseRecord: number[] = [];

  for (let i = 3; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      exerciseRecord.push(Number(args[i]));
    } else {
      throw new Error("Provided values were not numbers!");
    }
  }
  return {
    exerciseArray: exerciseRecord,
    target: Number(args[2]),
  };
};

const exerciseAnalysis = (exerciseArray: number[], target: number) => {
  const periodLength = exerciseArray.length;
  const trainingDays = exerciseArray.reduce(
    (accumulator, currentValue) =>
      currentValue > 0 ? accumulator + 1 : accumulator,
    0
  );
  const sumHours = exerciseArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const average = sumHours / exerciseArray.length;
  const success = average < target ? false : true;
  const targetCompletionProportion = average / target;
  let ratingDescription = "";
  let rating: number;
  switch (true) {
    case targetCompletionProportion > 0 && targetCompletionProportion < 0.5:
      ratingDescription = "Mediocre Attempt";
      rating = 1;
      break;
    case targetCompletionProportion >= 0.5 && targetCompletionProportion < 0.9:
      ratingDescription = "Keep it going! Almost there";
      rating = 2;
      break;
    case targetCompletionProportion >= 0.9:
      ratingDescription = "Excelent!";
      rating = 3;
      break;
    default:
      ratingDescription;
  }
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

try {
  const { exerciseArray, target } = parseTrainingArguments(process.argv);
  console.log(exerciseAnalysis(exerciseArray, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
