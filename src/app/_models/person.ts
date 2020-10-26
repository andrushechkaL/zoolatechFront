export interface Person {
  name: string;
  homeworld: string;
  gender: string;
}

export interface Result {
  count: number;
  results: Array<Person>;
}
