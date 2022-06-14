import { CoursePart } from "./types";

interface LocalProps {
  part: CoursePart
}

export const Part = ({ part }: LocalProps) => {
  switch(part.type) {
    case('normal'):
      return <div>
        <h2>{part.name} {part.exerciseCount}</h2>
        <p>{part.description}</p>
      </div>
    case('groupProject'):
      return <div>
        <h2>{part.name} {part.exerciseCount}</h2>
        <p>project exercises:{part.groupProjectCount}</p>
      </div>
     case('submission'):
      return <div>
        <h2>{part.name} {part.exerciseCount}</h2>
        <p>{part.description}</p>
        <p>submit to: {part.exerciseSubmissionLink}</p>
      </div>
    case('special'):
      return <div>
        <h2>{part.name} {part.exerciseCount}</h2>
        <p>{part.description}</p>
        <p>requirements: {part.requirements.join(', ')}</p>
      </div>
    default:
      return assertNever(part);
  }

}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}