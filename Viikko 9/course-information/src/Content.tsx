import { Part } from "./Part"
import { CoursePart } from "./types"

interface MyProps {
  parts: CoursePart[]
}

export const Content = ({ parts }: MyProps) => {
  return(
    <> 
      {parts.map(part => 
        <Part key={part.name} part={part}/>
      )}
    </>
  )
}