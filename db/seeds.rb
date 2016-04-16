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
