export type CovidData = {
  id: number;
  state: string;
  totalCases: number;
  activeCases: number;
  recovered: number;
  deaths: number;
};

export type RootState = {
  selectedState: CovidData;
  covidData: CovidData[];
  filteredStates: CovidData[];
};
