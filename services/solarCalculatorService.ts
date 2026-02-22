import { SolarEstimate } from '../types';

// Constants for Indian Solar Market (2024-2025 Estimates)
const COST_PER_KW_RESIDENTIAL = 60000; // Approx market rate
const COST_PER_KW_COMMERCIAL = 35000; // Bulk rate usually lower
const UNITS_PER_KW_DAILY = 4.2; // Average generation in India
const ELECTRICITY_RATE_RESIDENTIAL = 7.5; // Avg cost per unit
const ELECTRICITY_RATE_COMMERCIAL = 8.5; // Higher tariff for commercial
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
  systemSizeKw = Math.round(systemSizeKw);
  
  // Minimum system size is usually 1kW
  if (systemSizeKw < 1) systemSizeKw = 1;

  // 3. Calculate Cost
  // const costPerKw = propertyType === 'commercial' ? COST_PER_KW_COMMERCIAL : COST_PER_KW_RESIDENTIAL;
  // const baseCost = systemSizeKw * costPerKw;

    let baseCost = 0;
  
    if (propertyType === 'residential') {
      // Round system size to nearest integer for rate lookup
      const systemSizeRounded = Math.round(systemSizeKw);
      
      // If-else ladder for residential rates
      if (systemSizeRounded <= 1) {
        baseCost = 65000;
      } else if (systemSizeRounded <= 2) {
        baseCost = 130000;
      } else if (systemSizeRounded <= 3) {
        baseCost = 180000;
      } else if (systemSizeRounded <= 4) {
        baseCost = 240000;
      } else if (systemSizeRounded <= 5) {
        baseCost = 275000;
      } else if (systemSizeRounded <= 6) {
        baseCost = 330000;
      } else if (systemSizeRounded <= 7) {
        baseCost = 385000;
      } else if (systemSizeRounded <= 8) {
        baseCost = 400000;
      } else if (systemSizeRounded <= 9) {
        baseCost = 450000;
      } else if (systemSizeRounded <= 10) {
        baseCost = 500000;
      } else {
        // For systems larger than 10kW, use the 10kW rate as base and add per kW
        // Or you can extend the ladder if needed
        baseCost = 500000 + ((systemSizeRounded - 10) * 50000); // Example: 50k per kW after 10kW
      }
    } else {
      // Commercial: keep existing formula
      const costPerKw = COST_PER_KW_COMMERCIAL;
      baseCost = systemSizeKw * costPerKw;
    }

  
  // Add market variance (ranges)
  const costMin = Math.round(baseCost * 0.98);
  const costMax = Math.round(baseCost * 1.06);

  // 4. Calculate Subsidy (PM Surya Ghar Yojana Logic)
  // Logic: 30k/kW for first 2kW, 18k for 3rd kW. Max subsidy for >3kW is 78k.
  let subsidyAmount = 0;
  if (propertyType === 'residential') {
    if (systemSizeKw <= 1) {
      subsidyAmount = 30000 + 15000;
    } else if (systemSizeKw == 2) {
      subsidyAmount = 60000 + 30000;
    } else {
      subsidyAmount = 78000 + 30000; // Fixed cap
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
    recommendation = `With the ₹${(subsidyAmount/1000).toFixed(0)}k Govt subsidy, your net cost is drastically reduced, securing free electricity for 20+ years.`;
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
