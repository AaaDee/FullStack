import mean = require("lodash/mean"); 

interface ExerciseResult { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export function calculateExercises(
  exercises: number[],
  target: number
  ): ExerciseResult {
    if (isNaN(target) || exercises.length === 0 || exercises.some(val => isNaN(val))) {
      throw Error("malformatted parameters");
    }
    
    const periodLength = exercises.length;
    const trainingDays = exercises.filter(day => day > 0).length;
    
    const average = mean(exercises);

    const rounded = Math.round(average);
    let rating = 1;
    if (rounded === target) rating = 2;
    if (rounded > target) rating = 3;

    const ratingDescriptions = [
      'bad',
      'not too bad but could be better',
      'good'
    ];

    const ratingDescription = ratingDescriptions[rating - 1];
    const success = average >= target;

    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
  }

// const a = Number(process.argv[2]);
// const b: number[] = process.argv.slice(3).map(item => Number(item));

// console.log(calculateExercises(b, a));