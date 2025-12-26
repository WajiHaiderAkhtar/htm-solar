
export interface SolarEstimate {
  systemSizeKw: number;
  estimatedCost: string;
  monthlySavings: string;
  totalAnnualSavings: string;
  governmentSubsidy: string;
  roiYears: number;
  carbonOffset: string;
  recommendation: string;
  // Numeric values for charting
  costMin: number;
  costMax: number;
  savingsYearlyMin: number;
  savingsYearlyMax: number;
}

export interface CalculatorState {
  billAmount: number | '';
  location: string;
  propertyType: 'residential' | 'commercial';
  loading: boolean;
  result: SolarEstimate | null;
  error: string | null;
}

export enum SectionId {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  CALCULATOR = 'calculator',
  CONTACT = 'contact'
}

export type PageView = 'main' | 'subsidy' | 'about';
