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

  def to_see_the_property_details
    assert_property_details({
      land_cost: '$500,000',
      building_cost: '$2,500,000',
      improvements: '$0',
      total_square_feet: '52,500',
      number_of_units: '60',
      average_monthly_rent: '$700',
      other_income: '$600',
      equity_percentage: '17.0%',
      loan_interest_rate: '5.75%',
      amortization_period_in_years: '25'
    })
  end

  def to_see_the_property_details_for_the_other_property
    assert_property_details({
      land_cost: '$0',
      building_cost: '$299,000',
      improvements: '$0',
      total_square_feet: '3,311',
      number_of_units: '6',
      average_monthly_rent: '$482',
      other_income: '$0',
      equity_percentage: '20',
      loan_interest_rate: '4.0%',
      amortization_period_in_years: '30'
    })
  end

  def to_see_the_cost_and_revenue_assumptions
    assert_cost_and_revenue_assumptions({
      land: '$500,000',
      building: '$2,500,000',
      improvement: '$0',
      closing_costs: '$33,420',
      total_cost: '$3,033,420',
      number_of_units: '60',
      average_monthly_rent: '$700',
      gross_monthly_rent: '$42,000',
      other_income: '$600',
      total_gross_monthly_income: '$42,600'
    })
  end

  def to_see_the_cost_and_revenue_assumptions_for_the_other_property
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

  def to_see_the_closing_costs
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
          wire_charges: '$55'
        })
  end

  def to_see_the_closing_costs_for_the_other_property
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
      wire_charges: '$55'
    })
  end

  def to_see_the_operating_expenses
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
  end

  def to_see_the_operating_expenses_for_the_other_property
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

  private

  def assert_closing_costs(details)
    closing_costs = page.find('#closing-costs')
    expect(closing_costs).to have_content 'Closing Costs'
    expect(closing_costs.find('#origination-fee', text: 'Origination Fee')).to have_content details['origination_fee']
    expect(closing_costs.find('#processing-fee', text: 'Processing Fee')).to have_content details['processing_fee']
    expect(closing_costs.find('#discount-points', text: 'Discount Points')).to have_content details['discount_points']
    expect(closing_costs.find('#underwriting-fee', text: 'Underwriting Fee')).to have_content details['underwriting_fee']
    expect(closing_costs.find('#appraisal', text: 'Appraisal')).to have_content details['appraisal']
    expect(closing_costs.find('#credit-report', text: 'Credit Report')).to have_content details['credit_report']
    expect(closing_costs.find('#flood-certificate', text: 'Flood Certificate')).to have_content details['flood_certificate']
    expect(closing_costs.find('#tax-services', text: 'Tax Services')).to have_content details['tax_services']
    expect(closing_costs.find('#title-insurance', text: 'Title Insurance')).to have_content details['title_insurance']
    expect(closing_costs.find('#title-fees', text: 'Title Fees')).to have_content details['title_fees']
    expect(closing_costs.find('#survey', text: 'Survey')).to have_content details['survey']
    expect(closing_costs.find('#government-recording-charges', text: 'Government Recording Charges')).to have_content details['government_recording_charges']
    expect(closing_costs.find('#transfer-taxes', text: 'Transfer Taxes')).to have_content details['transfer_taxes']
    expect(closing_costs.find('#homeowners-insurance', text: 'Homeowners Insurance')).to have_content details['homeowners_insurance']
    expect(closing_costs.find('#settlement-company-charges', text: 'Settlement Company Charges')).to have_content details['settlement_company_charges']
    expect(closing_costs.find('#wire-charges', text: 'Wire Charges')).to have_content details['wire_charges']
  end

  def assert_property_details(details)
    assumptions = page.find('#financing-and-income-assumptions')
    inputs = page.find('#valuation-inputs')

    expect(assumptions).to have_content 'Financing and Income Assumptions'
    expect(inputs).to have_content 'Inputs'

    expect(inputs.find('#land-cost')).to have_content details['land_cost']
    expect(inputs.find('#building-cost')).to have_content details['building_cost']
    expect(inputs.find('#improvements')).to have_content details['improvements']
    expect(inputs.find('#total-square-feet')).to have_content details['total_sq_ft']
    expect(inputs.find('#number-of-units')).to have_content details['num_units']
    expect(inputs.find('#average-monthly-rent')).to have_content details['avg_rent']
    expect(inputs.find('#other-income')).to have_content details['other_income']
    expect(inputs.find('#equity-percentage')).to have_content details['equity_percentage']
    expect(inputs.find('#loan-interest-rate')).to have_content details['interest_rate']
    expect(inputs.find('#amortization-period-in-years')).to have_content details['amort_period']
  end

  def assert_cost_and_revenue_assumptions(details)
    assumptions = page.find('#cost-and-revenue-assumptions')
    expect(assumptions).to have_content 'Cost and Revenue Assumptions'
    expect(assumptions.find('div', text: 'Land')).to have_content details['land']
    expect(assumptions.find('div', text: 'Building')).to have_content details['building']
    expect(assumptions.find('div', text: 'Improvements')).to have_content details['improvements']
    expect(assumptions.find('div', text: 'Closing Costs')).to have_content details['closing_costs']
    expect(assumptions.find('div', text: 'Total Cost')).to have_content details['total_cost']
    expect(assumptions.find('div', text: 'Number of Units')).to have_content details['number_of_units']
    expect(assumptions.find('div', text: 'Average Monthly Rent')).to have_content details['average_monthly_rent']
    expect(assumptions.find('div', text: 'Gross Monthly Rent')).to have_content details['gross_monthly_rent']
    expect(assumptions.find('div', text: 'Other Income')).to have_content details['other_income']
    expect(assumptions.find('div', text: 'Total Gross Monthly Income')).to have_content details['total_gross_monthly_income']
  end

  def assert_operating_expenses(details)
    inputs = page.find('#operating-expenses-inputs')

    expect(inputs).to have_content 'Monthly Operating Expenses'
    expect(inputs.find('#vacancy-rate', text: 'Vacancy Rate')).to have_content details['vacancy_rate']
    expect(inputs.find('#repairs-and-maintenance', text: 'Repairs and Maintenance')).to have_content details['repairs_and_maintenance']
    expect(inputs.find('#property-management-fees', text: 'Property Management Fees')).to have_content details['property_management_fees']
    expect(inputs.find('#taxes', text: 'Taxes')).to have_content details['taxes']
    expect(inputs.find('#insurance', text: 'Insurance')).to have_content details['insurance']
    expect(inputs.find('#salaries-and-wages', text: 'Salaries and Wages')).to have_content details['salaries_and_wages']
    expect(inputs.find('#water-and-sewer', text: 'Water and Sewer')).to have_content details['water_and_sewer']
    expect(inputs.find('#utilities', text: 'Utilities')).to have_content details['utilities']
    expect(inputs.find('#trash-removal', text: 'Trash Removal')).to have_content details['trash_removal']
    expect(inputs.find('#professional-fees', text: 'Professional Fees')).to have_content details['professional_fees']
    expect(inputs.find('#advertising', text: 'Advertising')).to have_content details['advertising']
    expect(inputs.find('#landscaping', text: 'Landscaping')).to have_content details['landscaping']
    expect(inputs.find('#capital-expenditures', text: 'CapEx')).to have_content details['capital_expenditures']
    expect(inputs.find('#other-expenses', text: 'Other Expenses')).to have_content details['other_expenses']
    expect(inputs.find('#equipment-depreciation', text: 'Equipment Depreciation')).to have_content details['equipment_depreciation']
    expect(inputs.find('#income-tax-rate', text: 'Income Tax Rate')).to have_content details['income_tax_rate']
  end
end
