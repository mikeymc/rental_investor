require 'rails_helper'

class Expectations
  include ::RSpec::Matchers
  include Capybara::DSL

  def to_see_a_list_of_properties
    expect(page).to have_content 'Street'
    expect(page).to have_content 'City'
    expect(page).to have_content 'State'
    expect(page).to have_content 'Zip Code'

    expect(page).to have_content '421 Moroni Blvd'
    expect(page).to have_content 'Salt Lake City'
    expect(page).to have_content 'UT'
    expect(page).to have_content '12345'

    expect(page).to have_content '123 Sesame St'
    expect(page).to have_content 'Buffalo'
    expect(page).to have_content 'NY'
    expect(page).to have_content '67890'
  end

  def to_see_the_property_details(property)
    if property[:name] == 'moroni'
      assert_property_details({
        land_cost: '$500,000.00',
        building_cost: '$2,500,000.00',
        improvements: '$0.00',
        total_square_feet: '52,500',
        number_of_units: '60',
        average_monthly_rent: '$700.00',
        other_income: '$600.00',
        equity_percentage: '17%',
        loan_interest_rate: '5.750%',
        amortization_period_in_years: '25',
        total_square_feet: '52,500'
      })
    elsif property[:name] == 'sesame'
      assert_property_details({
        land_cost: '$0.00',
        building_cost: '$299,000.00',
        improvements: '$0.00',
        total_square_feet: '3,311',
        number_of_units: '6',
        average_monthly_rent: '$482.00',
        other_income: '$0.00',
        equity_percentage: '20%',
        loan_interest_rate: '4.000%',
        amortization_period_in_years: '30',
        total_square_feet: '3,311'
      })
    end
  end

  def to_see_the_key_rent_ratios(property)
    if property[:name] == 'moroni'
      assert_key_rent_ratios({
        total_area_in_sq_ft: '52,500',
        avg_sq_ft_per_unit: '875.00',
        avg_rent_per_sq_ft: '$0.80',
        total_cost_per_sq_ft: '$57.78',
        cost_per_unit: '$50,557.00'
      })
    elsif property[:name] == 'sesame'
      assert_key_rent_ratios({
        total_area_in_sq_ft: '3,311',
        avg_sq_ft_per_unit: '551.83',
        avg_rent_per_sq_ft: '$0.87',
        total_cost_per_sq_ft: '$92.24',
        cost_per_unit: '$50,901.67'
      })
    end
  end

  def to_see_the_cost_and_revenue_assumptions(property)
    if property[:name] == 'moroni'
      assert_cost_and_revenue_assumptions({
        land: '$500,000',
        building: '$2,500,000',
        improvements: '$0',
        closing_costs: '$33,420',
        total_cost: '$3,033,420',
        number_of_units: '60',
        average_monthly_rent: '$700',
        gross_monthly_rent: '$42,000',
        other_income: '$600',
        total_gross_monthly_income: '$42,600'
      })
    elsif property[:name] == 'sesame'
      assert_cost_and_revenue_assumptions({
        land: '$0',
        building: '$299,000',
        improvements: '$0',
        closing_costs: '$6,410',
        total_cost: '$305,410',
        number_of_units: '6',
        average_monthly_rent: '$482',
        gross_monthly_rent: '$2,892',
        other_income: '$0',
        total_gross_monthly_income: '$2,892'
      })
    end
  end

  def to_see_the_income_and_cost_projections
    projections = page.find('#income-and-cost-projections')
    expect(projections).to have_content 'Income and Cost Projections'

    rent_increases = projections.find('#rent-increases')
    expect(rent_increases).to have_content 'Rent Increases'
    expect(rent_increases.all('li', count: 5)[0]).to have_content '0.0%'
    expect(rent_increases.all('li', count: 5)[1]).to have_content '3.0%'
    expect(rent_increases.all('li', count: 5)[2]).to have_content '3.5%'
    expect(rent_increases.all('li', count: 5)[3]).to have_content '3.0%'
    expect(rent_increases.all('li', count: 5)[4]).to have_content '3.0%'

    operating_expense_increases = projections.find('#operating-expense-increases')
    expect(operating_expense_increases).to have_content 'Op Exp Increases'
    expect(operating_expense_increases.all('li', count: 5)[0]).to have_content '0.0%'
    expect(operating_expense_increases.all('li', count: 5)[1]).to have_content '-2.0%'
    expect(operating_expense_increases.all('li', count: 5)[2]).to have_content '-1.0%'
    expect(operating_expense_increases.all('li', count: 5)[3]).to have_content '1.5%'
    expect(operating_expense_increases.all('li', count: 5)[4]).to have_content '2.0%'
  end

  def to_see_the_closing_costs(property)
    if property[:name] == 'moroni'
      assert_closing_costs({
        origination_fee: '$30,000',
        processing_fee: '$400',
        discount_points: '0',
        underwriting_fee: '$500',
        appraisal: '$425',
        credit_report: '$35',
        flood_certificate: '$0',
        tax_services: '$75',
        title_insurance: '$175',
        title_fees: '$180',
        survey: '$175',
        government_recording_charges: '$125',
        transfer_taxes: '$0',
        homeowners_insurance: '$1,100',
        settlement_company_charges: '$175',
        wire_charges: '$55',
        total: '$33,420'
      })
    elsif property[:name] == 'sesame'
      assert_closing_costs({
        origination_fee: '$2,990',
        processing_fee: '$400',
        discount_points: '0',
        underwriting_fee: '$500',
        appraisal: '$425',
        credit_report: '$35',
        flood_certificate: '$0',
        tax_services: '$75',
        title_insurance: '$175',
        title_fees: '$180',
        survey: '$175',
        government_recording_charges: '$125',
        transfer_taxes: '$0',
        homeowners_insurance: '$1,100',
        settlement_company_charges: '$175',
        wire_charges: '$55',
        total: '$6,410'
      })
    end
  end

  def to_see_the_operating_expenses(property)
    if property[:name] == 'moroni'
      assert_operating_expenses({
        vacancy_rate: '5.0%',
        repairs_and_maintenance: '$5,625',
        property_management_fees: '3.5%',
        taxes: '$3,200.03',
        insurance: '$812.03',
        salaries_and_wages: '$1,800.02',
        water_and_sewer: '$5',
        utilities: '$2,119.97',
        trash_removal: '$125.02',
        professional_fees: '$299.98',
        advertising: '$500.01',
        landscaping: '$0',
        capital_expenditures: '7.0%',
        other_expenses: '$999.99',
        equipment_depreciation: '$0',
        income_tax_rate: '0%'
      })
    elsif property[:name] == 'sesame'
      assert_operating_expenses({
        vacancy_rate: '5.0%',
        repairs_and_maintenance: '$125',
        property_management_fees: '10.0%',
        taxes: '$121',
        insurance: '$150',
        salaries_and_wages: '$0',
        water_and_sewer: '$0',
        utilities: '$0',
        trash_removal: '$125',
        professional_fees: '$0',
        advertising: '$0',
        landscaping: '$0',
        capital_expenditures: '7.0%',
        other_expenses: '$0',
        equipment_depreciation: '$0',
        income_tax_rate: '0%'
      })
    end
  end

  def to_see_the_financing_assumptions(property)
    if property[:name] == 'moroni'
      assert_financing_assumptions({
        total_purchase_value: '$3,033,420',
        total_purchase_percentage: '100%',
        owners_equity_value: '$515,681',
        owners_equity_percentage: '17%',
        balance_to_finance_value: '$2,517,738.60',
        balance_to_finance_percentage: '83%',
        interest_rate: '5.750%',
        interest_rate_monthly: '0.479%',
        amortization_period: '25',
        amortization_period_in_months: '300',
        annual_loan_payment: '$190,071',
        monthly_loan_payment: '$15,839',
        annual_label: 'Annual',
        monthly_label: 'Monthly'
      })
    elsif property[:name] == 'sesame'
      assert_financing_assumptions({
        total_purchase_value: '$305,410',
        total_purchase_percentage: '100%',
        owners_equity_value: '$61,082',
        owners_equity_percentage: '20%',
        balance_to_finance_value: '$244,328',
        balance_to_finance_percentage: '80%',
        interest_rate: '4.000%',
        interest_rate_monthly: '0.333%',
        amortization_period: '30',
        amortization_period_in_months: '360',
        annual_loan_payment: '$13,997',
        monthly_loan_payment: '$1,166'
      })
    end
  end

  def to_see_updated_values
    assert_updated_values({
      land_cost: '$600,000',
      building_cost: '$2,600,000',
      improvements: '$15',
      total_cost: '$3,235,435',
      number_of_units: '61',
      average_monthly_rent: '$800',
      gross_monthly_rent: '$48,800',
      gross_monthly_income: '$49,800',
      total_closing_costs: '$35,420',
      down_payment: '$647,087.00',
      balance_to_finance: '$2,588,348.00',
      equity_percentage: '20%',
      loan_interest_rate: '6.750%',
      loan_payment_monthly: '$16,787.98',
      amortization_period_in_years: '30',
      amortization_period_in_months: '360',
      avg_sq_ft_per_unit: '877.05',
      total_square_feet: '53,500',
      avg_rent_per_sq_ft: '$0.91',
      total_cost_per_sq_ft: '$57.78',
      cost_per_unit: '$53,039.92'
    })
  end

  def to_see_the_rental_increase_projections(property)
    if property[:name] == 'moroni'
      assert_rental_increase_projections(['0.00%', '3.00%', '3.50%', '3.00%', '3.00%'])
      assert_average_monthly_rents_each_year(['$700', '$721', '$746', '$769', '$792'])
      assert_operating_expense_projections(['0.00%', '-2.00%', '-1.00%', '1.50%', '2.00%'])
    elsif property[:name] == 'sesame'
      assert_rental_increase_projections(['0.00%', '3.00%', '3.50%', '3.00%', '3.00%'])
      assert_average_monthly_rents_each_year(['$482', '$496', '$514', '$529', '$545'])
      assert_operating_expense_projections(['0.00%', '-2.00%', '-1.00%', '1.50%', '2.00%'])
    end
  end

  def to_see_the_operating_revenues(property)
    if property[:name] == 'moroni'
      assert_operating_revenues({
        gross_scheduled_rental_income_monthly: '$42,000',
        vacancy_rate_monthly: '$2,100',
        net_rental_income_monthly: '$39,900',
        other_income_monthly: '$600',
        gross_income_monthly: '$40,500'
      })
    elsif property[:name] == 'sesame'
      assert_operating_revenues({
        gross_scheduled_rental_income_monthly: '$2,892',
        vacancy_rate_monthly: '145',
        net_rental_income_monthly: '$2,747',
        other_income_monthly: '$0',
        gross_income_monthly: '$2,747'
      })
    end
  end

  private

  def assert_operating_revenues(details)
    section = page.find('#operating-revenues')

    expect(section).to have_content 'Operating Revenues'
    expect(section).to have_content 'Actual Monthly'
    expect(section).to have_content 'Projected'
    expect(section).to have_content 'Year 1'
    expect(section).to have_content 'Year 2'
    expect(section).to have_content 'Year 3'
    expect(section).to have_content 'Year 4'
    expect(section).to have_content 'Year 5'
    expect(section.find('.row', text: 'Gross Scheduled Rent Income')).to have_content details[:gross_scheduled_rental_income_monthly]
    expect(section.find('.row', text: 'Vacancy Rate')).to have_content details[:vacancy_rate_monthly]
    expect(section.find('.row', text: 'Net Rental Income')).to have_content details[:net_rental_income_monthly]
    expect(section.find('.row', text: 'Other Income')).to have_content details[:other_income_monthly]
    expect(section.find('.row', text: 'Gross Income')).to have_content details[:gross_income_monthly]
  end

  def assert_operating_expense_projections(projections)
    section = page.find('#operating-expense-projections')

    expect(section).to have_content 'Operating Expense Projections'
    projections.each do |projection|
      expect(section.find('.row')).to have_content projection
    end
  end

  def assert_average_monthly_rents_each_year(projections)
    section = page.find('#average-monthly-rents-each-year')

    expect(section).to have_content 'Average Monthly Rent'
    projections.each do |projection|
      expect(section.find('.row')).to have_content projection
    end
  end

  def assert_rental_increase_projections(projections)
    section = page.find('#rental-increase-projections')

    expect(section).to have_content 'Rental Increase Projections'
    projections.each do |projection|
      expect(section.find('.row')).to have_content projection
    end
  end

  def assert_key_rent_ratios(details)
    ratios = page.find('#key-rent-ratios')

    expect(ratios).to have_content 'Key Rent Ratios'
    expect(page.find('#key-rent-ratios .row', text: 'Total Square Feet')).to have_content details[:total_area_in_sq_ft]
    expect(page.find('#key-rent-ratios .row', text: 'Avg Sq Ft/Unit')).to have_content details[:avg_sq_ft_per_unit]
    expect(page.find('#key-rent-ratios .row', text: 'Avg Rent/Sq Ft')).to have_content details[:avg_rent_per_sq_ft]
    expect(page.find('#key-rent-ratios .row', text: 'Total Cost/Sq Ft')).to have_content details[:total_cost_per_sq_ft]
    expect(page.find('#key-rent-ratios .row', text: 'Cost per Unit')).to have_content details[:cost_per_unit]
  end

  def assert_updated_values(details)
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Land')).to have_content details[:land_cost]
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Building')).to have_content details[:building_cost]
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Improvements')).to have_content details[:improvements]
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Total Cost')).to have_content details[:total_cost]
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Number of Units')).to have_content details[:number_of_units]
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Average Monthly Rent')).to have_content details[:average_monthly_rent]
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Gross Monthly Rent')).to have_content details[:gross_monthly_rent]
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Gross Monthly Income')).to have_content details[:gross_monthly_income]
    expect(page.find('#total-purchase')).to have_content details[:total_cost]
    expect(page.find('#total-closing-costs')).to have_content details[:total_closing_costs]
    expect(page.find('#down-payment')).to have_content details[:down_payment]
    expect(page.find('#down-payment')).to have_content details[:equity_percentage]
    expect(page.find('#balance-to-finance')).to have_content details[:balance_to_finance]
    expect(page.find('#interest-rate')).to have_content details[:loan_interest_rate]
    expect(page.find('#amortization-period')).to have_content details[:amortization_period_in_years]
    expect(page.find('#amortization-period')).to have_content details[:amortization_period_in_months]
    expect(page.find('#loan-payment')).to have_content details[:loan_payment_monthly]
    expect(page.find('#key-rent-ratios .row', text: 'Avg Sq Ft/Unit')).to have_content details[:avg_sq_ft_per_unit]
    expect(page.find('#key-rent-ratios .row', text: 'Total Square Feet')).to have_content details[:total_square_feet]
    expect(page.find('#key-rent-ratios .row', text: 'Avg Rent/Sq Ft')).to have_content details[:avg_rent_per_sq_ft]
    expect(page.find('#key-rent-ratios .row', text: 'Cost per Unit')).to have_content details[:cost_per_unit]

  end

  def assert_financing_assumptions(details)
    closing_costs = page.find('#financing-assumptions')
    expect(closing_costs).to have_content 'Financing Assumptions'
    expect(closing_costs.find('#total-purchase', text: 'Total Purchase')).to have_content details[:total_purchase_value]
    expect(closing_costs.find('#total-purchase', text: 'Total Purchase')).to have_content details[:total_purchase_percentage]
    expect(closing_costs.find('#down-payment', text: 'Owner\'s Equity')).to have_content details[:owners_equity_value]
    expect(closing_costs.find('#down-payment', text: 'Owner\'s Equity')).to have_content details[:owners_equity_percentage]
    expect(closing_costs.find('#balance-to-finance', text: 'Balance to Finance')).to have_content details[:balance_to_finance_value]
    expect(closing_costs.find('#balance-to-finance', text: 'Balance to Finance')).to have_content details[:balance_to_finance_percentage]
    expect(closing_costs.find('#interest-rate', text: 'Interest Rate')).to have_content details[:interest_rate]
    expect(closing_costs.find('#interest-rate', text: 'Interest Rate')).to have_content details[:interest_rate_monthly]
    expect(closing_costs.find('#amortization-period', text: 'Amortization Period')).to have_content details[:amortization_period]
    expect(closing_costs.find('#amortization-period', text: 'Amortization Period')).to have_content details[:amortization_period_in_months]
    expect(closing_costs.find('#loan-payment', text: 'Payment')).to have_content details[:annual_loan_payment]
    expect(closing_costs.find('#loan-payment', text: 'Payment')).to have_content details[:monthly_loan_payment]
    expect(closing_costs).to have_content details[:annual_label]
    expect(closing_costs).to have_content details[:monthly_label]
  end

  def assert_closing_costs(details)
    closing_costs = page.find('#closing-costs')
    expect(closing_costs).to have_content 'Closing Costs'
    expect(closing_costs.find('#origination-fee', text: 'Origination Fee')).to have_content details[:origination_fee]
    expect(closing_costs.find('#processing-fee', text: 'Processing Fee')).to have_content details[:processing_fee]
    expect(closing_costs.find('#discount-points', text: 'Discount Points')).to have_content details[:discount_points]
    expect(closing_costs.find('#underwriting-fee', text: 'Underwriting Fee')).to have_content details[:underwriting_fee]
    expect(closing_costs.find('#appraisal', text: 'Appraisal')).to have_content details[:appraisal]
    expect(closing_costs.find('#credit-report', text: 'Credit Report')).to have_content details[:credit_report]
    expect(closing_costs.find('#flood-certificate', text: 'Flood Certificate')).to have_content details[:flood_certificate]
    expect(closing_costs.find('#tax-services', text: 'Tax Services')).to have_content details[:tax_services]
    expect(closing_costs.find('#title-insurance', text: 'Title Insurance')).to have_content details[:title_insurance]
    expect(closing_costs.find('#title-fees', text: 'Title Fees')).to have_content details[:title_fees]
    expect(closing_costs.find('#survey', text: 'Survey')).to have_content details[:survey]
    expect(closing_costs.find('#government-recording-charges', text: 'Government Recording Charges')).to have_content details[:government_recording_charges]
    expect(closing_costs.find('#transfer-taxes', text: 'Transfer Taxes')).to have_content details[:transfer_taxes]
    expect(closing_costs.find('#homeowners-insurance', text: 'Homeowners Insurance')).to have_content details[:homeowners_insurance]
    expect(closing_costs.find('#settlement-company-charges', text: 'Settlement Company Charges')).to have_content details[:settlement_company_charges]
    expect(closing_costs.find('#wire-charges', text: 'Wire Charges')).to have_content details[:wire_charges]
    expect(closing_costs.find('#total-closing-costs', text: 'Total')).to have_content details[:total]
  end

  def assert_property_details(details)
    assumptions = page.find('#financing-and-income-assumptions')
    inputs = page.find('#valuation-inputs')

    expect(assumptions).to have_content 'Financing and Income Assumptions'
    expect(inputs).to have_content 'Inputs'

    expect(inputs.find_field('land-cost-input').value).to eq details[:land_cost]
    expect(inputs.find_field('building-cost-input').value).to eq details[:building_cost]
    expect(inputs.find_field('improvements-input').value).to eq details[:improvements]
    expect(inputs.find('#total-square-feet')).to have_content details[:total_sq_ft]
    expect(inputs.find_field('number-of-units-input').value).to eq details[:number_of_units]
    expect(inputs.find_field('average-monthly-rent-input').value).to eq details[:average_monthly_rent]
    expect(inputs.find_field('other-income-input').value).to eq details[:other_income]
    expect(inputs.find_field('equity-percentage-input').value).to eq details[:equity_percentage]
    expect(inputs.find_field('amortization-period-in-years-input').value).to eq details[:amortization_period_in_years]
    expect(inputs.find_field('loan-interest-rate-input').value).to eq details[:loan_interest_rate]
    expect(inputs.find_field('total-square-feet-input').value).to eq details[:total_square_feet]
  end

  def assert_cost_and_revenue_assumptions(details)
    assumptions = page.find('#cost-and-revenue-assumptions')
    expect(assumptions).to have_content 'Cost and Revenue Assumptions'
    expect(assumptions.find('div', text: 'Land')).to have_content details[:land]
    expect(assumptions.find('div', text: 'Building')).to have_content details[:building]
    expect(assumptions.find('div', text: 'Improvements')).to have_content details[:improvements]
    expect(assumptions.find('div', text: 'Closing Costs')).to have_content details[:closing_costs]
    expect(assumptions.find('div', text: 'Total Cost')).to have_content details[:total_cost]
    expect(assumptions.find('div', text: 'Number of Units')).to have_content details[:number_of_units]
    expect(assumptions.find('div', text: 'Average Monthly Rent')).to have_content details[:average_monthly_rent]
    expect(assumptions.find('div', text: 'Gross Monthly Rent')).to have_content details[:gross_monthly_rent]
    expect(assumptions.find('div', text: 'Other Income')).to have_content details[:other_income]
    expect(assumptions.find('div', text: 'Total Gross Monthly Income')).to have_content details[:total_gross_monthly_income]
  end

  def assert_operating_expenses(details)
    inputs = page.find('#operating-expenses-inputs')

    expect(inputs).to have_content 'Monthly Operating Expenses'
    expect(inputs.find('#vacancy-rate', text: 'Vacancy Rate')).to have_content details[:vacancy_rate]
    expect(inputs.find('#repairs-and-maintenance', text: 'Repairs and Maintenance')).to have_content details[:repairs_and_maintenance]
    expect(inputs.find('#property-management-fees', text: 'Property Management Fees')).to have_content details[:property_management_fees]
    expect(inputs.find('#taxes', text: 'Taxes')).to have_content details[:taxes]
    expect(inputs.find('#insurance', text: 'Insurance')).to have_content details[:insurance]
    expect(inputs.find('#salaries-and-wages', text: 'Salaries and Wages')).to have_content details[:salaries_and_wages]
    expect(inputs.find('#water-and-sewer', text: 'Water and Sewer')).to have_content details[:water_and_sewer]
    expect(inputs.find('#utilities', text: 'Utilities')).to have_content details[:utilities]
    expect(inputs.find('#trash-removal', text: 'Trash Removal')).to have_content details[:trash_removal]
    expect(inputs.find('#professional-fees', text: 'Professional Fees')).to have_content details[:professional_fees]
    expect(inputs.find('#advertising', text: 'Advertising')).to have_content details[:advertising]
    expect(inputs.find('#landscaping', text: 'Landscaping')).to have_content details[:landscaping]
    expect(inputs.find('#capital-expenditures', text: 'CapEx')).to have_content details[:capital_expenditures]
    expect(inputs.find('#other-expenses', text: 'Other Expenses')).to have_content details[:other_expenses]
    expect(inputs.find('#equipment-depreciation', text: 'Equipment Depreciation')).to have_content details[:equipment_depreciation]
    expect(inputs.find('#income-tax-rate', text: 'Income Tax Rate')).to have_content details[:income_tax_rate]
  end
end
