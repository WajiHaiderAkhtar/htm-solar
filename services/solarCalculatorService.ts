
import { SolarEstimate } from '../types';

// Constants for Indian Solar Market (2024-2025 Estimates)
const COST_PER_KW_RESIDENTIAL = 55000; // Approx market rate
const COST_PER_KW_COMMERCIAL = 45000; // Bulk rate usually lower
const UNITS_PER_KW_DAILY = 4.2; // Average generation in India
const ELECTRICITY_RATE_RESIDENTIAL = 8; // Avg cost per unit
const ELECTRICITY_RATE_COMMERCIAL = 12; // Higher tariff for commercial
const CO2_PER_UNIT = 0.82; // kg of CO2

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getSolarEstimate = async (
  billAmount: number,
  location: string,
  propertyType: string
): Promise<SolarEstimate> => {
  // Simulate network delay for UX (so the loader is visible for a moment)
  await new Promise((resolve) => setTimeout(resolve, 800));

  // 1. Determine Tariff & Consumption
  const rate = propertyType === 'commercial' ? ELECTRICITY_RATE_COMMERCIAL : ELECTRICITY_RATE_RESIDENTIAL;
  const monthlyUnits = billAmount / rate;
  const dailyUnits = monthlyUnits / 30;

  // 2. Calculate Required System Size
  // We need enough solar to cover consumption. 1kW generates ~4.2 units/day.
  let systemSizeKw = dailyUnits / UNITS_PER_KW_DAILY;
  // Round up to nearest 0.5 kW for realistic panel configuration
  systemSizeKw = Math.ceil(systemSizeKw * 2) / 2;
  
  // Minimum system size is usually 1kW
  if (systemSizeKw < 1) systemSizeKw = 1;

  // 3. Calculate Cost
  const costPerKw = propertyType === 'commercial' ? COST_PER_KW_COMMERCIAL : COST_PER_KW_RESIDENTIAL;
  const baseCost = systemSizeKw * costPerKw;
  
  // Add market variance (ranges)
  const costMin = Math.round(baseCost * 0.95);
  const costMax = Math.round(baseCost * 1.05);

  // 4. Calculate Subsidy (PM Surya Ghar Yojana Logic)
  // Logic: 30k/kW for first 2kW, 18k for 3rd kW. Max subsidy for >3kW is 78k.
  let subsidyAmount = 0;
  if (propertyType === 'residential') {
    if (systemSizeKw <= 2) {
      subsidyAmount = systemSizeKw * 30000;
    } else if (systemSizeKw <= 3) {
      subsidyAmount = (2 * 30000) + ((systemSizeKw - 2) * 18000);
    } else {
      subsidyAmount = 78000; // Fixed cap
    }
  } else {
    subsidyAmount = 0; // No direct subsidy for commercial (usually tax benefits)
  }

  // 5. Calculate Savings
  // Assuming solar offsets ~90% of the bill (considering fixed meter charges remain)
  const monthlySavingVal = billAmount * 0.90;
  const annualSavingVal = monthlySavingVal * 12;
  
  // 6. ROI Calculation
  const netInvestment = baseCost - subsidyAmount;
  const roiYears = netInvestment / annualSavingVal;

  // 7. Carbon Offset
  const annualUnits = systemSizeKw * UNITS_PER_KW_DAILY * 365;
  const co2Offset = (annualUnits * CO2_PER_UNIT) / 1000; // in Tonnes

  // 8. Recommendation Text
  let recommendation = "";
  if (roiYears < 3) {
    recommendation = "Exceptional ROI. The high tariff in your category makes solar a highly profitable investment with payback in under 3 years.";
  } else if (propertyType === 'residential' && subsidyAmount > 0) {
    recommendation = `With the ₹${(subsidyAmount/1000).toFixed(0)}k Govt subsidy, your net cost is drastically reduced, securing free electricity for 20+ years.`;
  } else {
    recommendation = "A solid long-term investment. This system will insulate you from rising grid electricity tariffs for decades.";
  }

  // 9. Return Data
  return {
    systemSizeKw: systemSizeKw,
    estimatedCost: `${formatCurrency(costMin)} - ${formatCurrency(costMax)}`,
    monthlySavings: `${formatCurrency(monthlySavingVal)}`,
    totalAnnualSavings: `${formatCurrency(annualSavingVal)}`,
    governmentSubsidy: subsidyAmount > 0 ? formatCurrency(subsidyAmount) : "N/A",
    roiYears: parseFloat(roiYears.toFixed(1)),
    carbonOffset: `${co2Offset.toFixed(1)} Tons/Year`,
    recommendation: recommendation,
    // Numeric values for charts
    costMin: costMin,
    costMax: costMax,
    savingsYearlyMin: annualSavingVal * 0.95,
    savingsYearlyMax: annualSavingVal * 1.05
  };
};
