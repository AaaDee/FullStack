export function calculateBmi(height: number, weight: number): string {
  if (isNaN(height) || isNaN(weight)) {
    throw Error("invalid input")
  };
  
  const heightInCm = height / 100;
  const bmi = weight / heightInCm / heightInCm;

  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  return "Overweight";

}

  // const height: number = Number(process.argv[2])
  // const weight: number = Number(process.argv[3])
  // console.log(calculateBmi(height, weight))
 
