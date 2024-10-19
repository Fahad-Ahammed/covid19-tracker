// Type for individual daily data
export type DailyData = {
  date: string;
  new_cases: number;
  recovered: number;
  deaths: number;
  active_cases: number;
};

// Type for the summary of each state
export type StateSummary = {
  total_cases: number;
  total_recovered: number;
  active_cases: number;
  total_deaths: number;
};

// Type for the coordinates (latitude and longitude)
export type Coordinates = {
  lat: number;
  lng: number;
};

// Type for each state's COVID data, including summary and daily data
export type StateCovidData = {
  id: string;
  state: string;
  summary: StateSummary;
  coordinates: Coordinates; // Added coordinates here
  daily_data: DailyData[];
};

// Type for the overall structure of the dataset
export type CovidData = {
  last_updated: string;
  states: StateCovidData[];
};

// Type for the redux store
export type RootState = {
  selectedState: StateCovidData;
  covidData: CovidData;
};
