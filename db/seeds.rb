RentalProperty.create!(
  id: 1,
  street: '421 Moroni Blvd',
  city: 'Salt Lake City',
  state: 'UT',
  zip_code: '12345'
)

FinancingAndIncomeAssumption.create!(
  id: 1,
  land_cost: 500000,
  building_cost: 2500000,
  improvements: 0,
  total_square_feet: 52500,
  number_of_units: 60,
  average_monthly_rent_per_unit: 700,
  other_monthly_income: 600,
  equity_percentage: 17,
  loan_interest_rate: 5.75,
  amortization_period_in_years: 25,
  rental_property_id: 1
)

OperatingExpensesAssumption.create!(
  id: 1,
  vacancy_rate: 5,
  repairs_and_maintenance: 5625,
  property_management_fees: 3.5,
  taxes: 3200.03,
  insurance: 812.03,
  salaries_and_wages: 1800.02,
  utilities: 2119.97,
  water_and_sewer: 5,
  trash_removal: 125.02,
  professional_fees: 299.98,
  advertising: 500.01,
  landscaping: 0,
  capex: 7,
  other_expenses: 999.99,
  equipment_depreciation: 0,
  income_tax_rate: 0,
  rental_property_id: 1
)

OperatingExpensesAssumption.create!(
  id: 2,
  vacancy_rate: 5,
  repairs_and_maintenance: 125,
  property_management_fees: 10,
  taxes: 121,
  insurance: 150,
  salaries_and_wages: 0,
  utilities: 0,
  water_and_sewer: 0,
  trash_removal: 125,
  professional_fees: 0,
  advertising: 0,
  landscaping: 0,
  capex: 7,
  other_expenses: 0,
  equipment_depreciation: 0,
  income_tax_rate: 0,
  rental_property_id: 2
)

RentalProperty.create!(
  id: 2,
  street: '123 Sesame St',
  city: 'Buffalo',
  state: 'NY',
  zip_code: '67890'
)

FinancingAndIncomeAssumption.create!(
  id: 2,
  land_cost: 0,
  building_cost: 299000,
  improvements: 0,
  total_square_feet: 3311,
  number_of_units: 6,
  average_monthly_rent_per_unit: 482,
  other_monthly_income: 0,
  equity_percentage: 20,
  loan_interest_rate: 4,
  amortization_period_in_years: 30,
  rental_property_id: 2
)
