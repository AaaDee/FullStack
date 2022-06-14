interface MyProps {
  total: number
}

export const Total = ({ total }: MyProps) => 
  <p>
    {`Number of exercises ${total}`}
  </p>