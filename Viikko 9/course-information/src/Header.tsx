interface LocalProps {
  name: string;
}

export const Header = ({ name } : LocalProps) =>  <h1>{name}</h1>