@user_one = User.create!(
  email: 'monkey@ape.com',
  password: '4bananas',
  password_confirmation: '4bananas'
)

@user_two = User.create!(
  email: 'carp@fish.com',
  password: '4earthworms',
  password_confirmation: '4earthworms'
)

RentalProperty.new(
  user_id: @user_one.id,
  street: '421 Moroni Blvd',
  city: 'Salt Lake City',
  state: 'UT',
  zip_code: '12345',
  financing_and_income_assumption: FinancingAndIncomeAssumption.new(
    land_cost: 500000,
    building_cost: 2500000,
    improvements: 0,
    total_square_feet: 52500,
    number_of_units: 60,
    average_monthly_rent_per_unit: 700,
    other_monthly_income: 600,
    equity_percentage: 17,
    loan_interest_rate: 5.75,
    amortization_period_in_years: 25
  ),
  operating_expenses_assumption: OperatingExpensesAssumption.new(
    vacancy_rate: 5,
    repairs_and_maintenance: 5265,
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
    income_tax_rate: 1
  ),
  closing_cost: ClosingCost.new(
    origination_fee: 30000,
    processing_fee: 400,
    discount_points: 0,
    underwriting_fee: 500,
    appraisal: 425,
    credit_report: 35,
    flood_certificate: 0,
    tax_services: 75,
    title_insurance: 175,
    title_fees: 180,
    survey: 175,
    government_recording_charges: 125,
    transfer_taxes: 0,
    homeowners_insurance: 1100,
    settlement_company_charges: 175,
    wire_charges: 55
  ),
  income_and_cost_projection: IncomeAndCostProjection.new(
    rent_increases: [0, 3, 3.5, 3, 3],
    operating_expense_increases: [0, -2, -1, 1.5, 2]
  ),
  questionnaire: Questionnaire.new
).save!

RentalProperty.create!(
  user_id: @user_one.id,
  street: '123 Sesame St',
  city: 'Buffalo',
  state: 'NY',
  zip_code: '67890',
  financing_and_income_assumption: FinancingAndIncomeAssumption.new(
    land_cost: 0,
    building_cost: 299000,
    improvements: 0,
    total_square_feet: 3311,
    number_of_units: 6,
    average_monthly_rent_per_unit: 482,
    other_monthly_income: 0,
    equity_percentage: 20,
    loan_interest_rate: 4,
    amortization_period_in_years: 30
  ),
  operating_expenses_assumption: OperatingExpensesAssumption.new(
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
    income_tax_rate: 0
  ),
  closing_cost: ClosingCost.new(
    origination_fee: 2990,
    processing_fee: 400,
    discount_points: 0,
    underwriting_fee: 500,
    appraisal: 425,
    credit_report: 35,
    flood_certificate: 0,
    tax_services: 75,
    title_insurance: 175,
    title_fees: 180,
    survey: 175,
    government_recording_charges: 125,
    transfer_taxes: 0,
    homeowners_insurance: 1100,
    settlement_company_charges: 175,
    wire_charges: 55
  ),
  income_and_cost_projection: IncomeAndCostProjection.new(
    rent_increases: [0, 3, 3.5, 3, 3],
    operating_expense_increases: [0, -2, -1, 1.5, 2]
  ),
  questionnaire: Questionnaire.new
)

RentalProperty.create!(
  user_id: @user_two.id,
  street: '456 Seaside Ln',
  city: 'San Diego',
  state: 'CA',
  zip_code: '90909',
  financing_and_income_assumption: FinancingAndIncomeAssumption.new(
    land_cost: 0,
    building_cost: 299000,
    improvements: 0,
    total_square_feet: 3311,
    number_of_units: 6,
    average_monthly_rent_per_unit: 482,
    other_monthly_income: 0,
    equity_percentage: 20,
    loan_interest_rate: 4,
    amortization_period_in_years: 30
  ),
  operating_expenses_assumption: OperatingExpensesAssumption.new(
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
    income_tax_rate: 0
  ),
  closing_cost: ClosingCost.new(
    origination_fee: 2990,
    processing_fee: 400,
    discount_points: 0,
    underwriting_fee: 500,
    appraisal: 425,
    credit_report: 35,
    flood_certificate: 0,
    tax_services: 75,
    title_insurance: 175,
    title_fees: 180,
    survey: 175,
    government_recording_charges: 125,
    transfer_taxes: 0,
    homeowners_insurance: 1100,
    settlement_company_charges: 175,
    wire_charges: 55
  ),
  income_and_cost_projection: IncomeAndCostProjection.new(
    rent_increases: [0, 3, 3.5, 3, 3],
    operating_expense_increases: [0, -2, -1, 1.5, 2]
  ),
  questionnaire: Questionnaire.new
)
