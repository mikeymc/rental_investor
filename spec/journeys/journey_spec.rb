require 'rails_helper'

RSpec.describe 'finding stocks' do
  before(:each) do
    Rails.application.load_seed
  end

  it 'enables the user to view stocks' do
    visit '/'
    see_a_list_of_properties
    click_on_a_property
    see_the_property_details
    see_the_operating_expenses
    see_the_closing_costs
    visit '/'
    click_on_another_property
    see_the_property_details_for_the_other_property
    see_the_operating_expenses_for_the_other_property
    see_the_closing_costs_for_the_other_property
  end

  def see_a_list_of_properties
    expect(page).to have_content('Street')
    expect(page).to have_content('City')
    expect(page).to have_content('State')
    expect(page).to have_content('Zip Code')

    expect(page).to have_content '421 Moroni Blvd'
    expect(page).to have_content 'Salt Lake City'
    expect(page).to have_content 'UT'
    expect(page).to have_content '12345'

    expect(page).to have_content '123 Sesame St'
    expect(page).to have_content 'Buffalo'
    expect(page).to have_content 'NY'
    expect(page).to have_content '67890'
  end

  def click_on_a_property
    page.find('div.rental-property-summary', text: '421 Moroni Blvd').click
  end

  def click_on_another_property
    page.find('div.rental-property-summary', text: '123 Sesame St').click
  end

  def see_the_property_details
    financing_and_income_assumptions = page.find('#financing-and-income-assumptions')
    valuation_inputs = page.find('#valuation-inputs')

    expect(financing_and_income_assumptions).to have_content 'Financing and Income Assumptions'
    expect(valuation_inputs).to have_content 'Inputs'

    expect(valuation_inputs.find('#land-cost', text: 'Land Cost')).to have_content '500000'
    expect(valuation_inputs.find('#building-cost', text: 'Building Cost')).to have_content '2500000'
    expect(valuation_inputs.find('#improvements', text: 'Improvements')).to have_content '0'
    expect(valuation_inputs.find('#total-square-feet', text: 'Total Square Feet')).to have_content '52500'
    expect(valuation_inputs.find('#number-of-units', text: 'Number of Units')).to have_content '60'
    expect(valuation_inputs.find('#average-monthly-rent', text: 'Average Monthly Rent')).to have_content '700'
    expect(valuation_inputs.find('#other-income', text: 'Other Income')).to have_content '600'
    expect(valuation_inputs.find('#equity-percentage', text: 'Equity Percentage')).to have_content '17'
    expect(valuation_inputs.find('#loan-interest-rate', text: 'Loan Interest Rate')).to have_content '5.75'
    expect(valuation_inputs.find('#amortization-period-in-years', text: 'Amortization Period in Years')).to have_content '25'
  end

  def see_the_closing_costs
    closing_costs = page.find('#closing-costs')
    expect(closing_costs).to have_content 'Closing Costs'
    expect(closing_costs.find('#origination-fee', text: 'Origination Fee')).to have_content '30000'
    expect(closing_costs.find('#processing-fee', text: 'Processing Fee')).to have_content '400'
    expect(closing_costs.find('#discount-points', text: 'Discount Points')).to have_content '0'
    expect(closing_costs.find('#underwriting-fee', text: 'Underwriting Fee')).to have_content '500'
    expect(closing_costs.find('#appraisal', text: 'Appraisal')).to have_content '425'
    expect(closing_costs.find('#credit-report', text: 'Credit Report')).to have_content '35'
    expect(closing_costs.find('#flood-certificate', text: 'Flood Certificate')).to have_content '0'
    expect(closing_costs.find('#tax-services', text: 'Tax Services')).to have_content '75'
    expect(closing_costs.find('#title-insurance', text: 'Title Insurance')).to have_content '175'
    expect(closing_costs.find('#title-fees', text: 'Title Fees')).to have_content '180'
    expect(closing_costs.find('#survey', text: 'Survey')).to have_content '175'
    expect(closing_costs.find('#government-recording-charges', text: 'Government Recording Charges')).to have_content '125'
    expect(closing_costs.find('#transfer-taxes', text: 'Transfer Taxes')).to have_content '0'
    expect(closing_costs.find('#homeowners-insurance', text: 'Homeowners Insurance')).to have_content '1100'
    expect(closing_costs.find('#settlement-company-charges', text: 'Settlement Company Charges')).to have_content '175'
    expect(closing_costs.find('#wire-charges', text: 'Wire Charges')).to have_content '55'
  end

  def see_the_closing_costs_for_the_other_property
    closing_costs = page.find('#closing-costs')
    expect(closing_costs).to have_content 'Closing Costs'
    expect(closing_costs.find('#origination-fee', text: 'Origination Fee')).to have_content '2990'
    expect(closing_costs.find('#processing-fee', text: 'Processing Fee')).to have_content '400'
    expect(closing_costs.find('#discount-points', text: 'Discount Points')).to have_content '0'
    expect(closing_costs.find('#underwriting-fee', text: 'Underwriting Fee')).to have_content '500'
    expect(closing_costs.find('#appraisal', text: 'Appraisal')).to have_content '425'
    expect(closing_costs.find('#credit-report', text: 'Credit Report')).to have_content '35'
    expect(closing_costs.find('#flood-certificate', text: 'Flood Certificate')).to have_content '0'
    expect(closing_costs.find('#tax-services', text: 'Tax Services')).to have_content '75'
    expect(closing_costs.find('#title-insurance', text: 'Title Insurance')).to have_content '175'
    expect(closing_costs.find('#title-fees', text: 'Title Fees')).to have_content '180'
    expect(closing_costs.find('#survey', text: 'Survey')).to have_content '175'
    expect(closing_costs.find('#government-recording-charges', text: 'Government Recording Charges')).to have_content '125'
    expect(closing_costs.find('#transfer-taxes', text: 'Transfer Taxes')).to have_content '0'
    expect(closing_costs.find('#homeowners-insurance', text: 'Homeowners Insurance')).to have_content '1100'
    expect(closing_costs.find('#settlement-company-charges', text: 'Settlement Company Charges')).to have_content '175'
    expect(closing_costs.find('#wire-charges', text: 'Wire Charges')).to have_content '55'
  end

  def see_the_operating_expenses
    operating_expenses_inputs = page.find('#operating-expenses-inputs')

    expect(operating_expenses_inputs).to have_content 'Monthly Operating Expenses'
    expect(operating_expenses_inputs.find('#vacancy-rate', text: 'Vacancy Rate')).to have_content '5'
    expect(operating_expenses_inputs.find('#repairs-and-maintenance', text: 'Repairs and Maintenance')).to have_content '5625'
    expect(operating_expenses_inputs.find('#property-management-fees', text: 'Property Management Fees')).to have_content '3.5'
    expect(operating_expenses_inputs.find('#taxes', text: 'Taxes')).to have_content '3200.03'
    expect(operating_expenses_inputs.find('#insurance', text: 'Insurance')).to have_content '812.03'
    expect(operating_expenses_inputs.find('#salaries-and-wages', text: 'Salaries and Wages')).to have_content '1800.02'
    expect(operating_expenses_inputs.find('#water-and-sewer', text: 'Water and Sewer')).to have_content '5'
    expect(operating_expenses_inputs.find('#utilities', text: 'Utilities')).to have_content '2119.97'
    expect(operating_expenses_inputs.find('#trash-removal', text: 'Trash Removal')).to have_content '125.02'
    expect(operating_expenses_inputs.find('#professional-fees', text: 'Professional Fees')).to have_content '299.98'
    expect(operating_expenses_inputs.find('#advertising', text: 'Advertising')).to have_content '500.01'
    expect(operating_expenses_inputs.find('#landscaping', text: 'Landscaping')).to have_content '0'
    expect(operating_expenses_inputs.find('#capital-expenditures', text: 'CapEx')).to have_content '7'
    expect(operating_expenses_inputs.find('#other-expenses', text: 'Other Expenses')).to have_content '999.99'
    expect(operating_expenses_inputs.find('#equipment-depreciation', text: 'Equipment Depreciation')).to have_content '0'
    expect(operating_expenses_inputs.find('#income-tax-rate', text: 'Income Tax Rate')).to have_content '0'
  end

  def see_the_operating_expenses_for_the_other_property
    operating_expenses_inputs = page.find('#operating-expenses-inputs')

    expect(operating_expenses_inputs).to have_content 'Monthly Operating Expenses'
    expect(operating_expenses_inputs.find('#vacancy-rate', text: 'Vacancy Rate')).to have_content '5'
    expect(operating_expenses_inputs.find('#repairs-and-maintenance', text: 'Repairs and Maintenance')).to have_content '125'
    expect(operating_expenses_inputs.find('#property-management-fees', text: 'Property Management Fees')).to have_content '10'
    expect(operating_expenses_inputs.find('#taxes', text: 'Taxes')).to have_content '121'
    expect(operating_expenses_inputs.find('#insurance', text: 'Insurance')).to have_content '150'
    expect(operating_expenses_inputs.find('#salaries-and-wages', text: 'Salaries and Wages')).to have_content '0'
    expect(operating_expenses_inputs.find('#water-and-sewer', text: 'Water and Sewer')).to have_content '0'
    expect(operating_expenses_inputs.find('#utilities', text: 'Utilities')).to have_content '0'
    expect(operating_expenses_inputs.find('#trash-removal', text: 'Trash Removal')).to have_content '125'
    expect(operating_expenses_inputs.find('#professional-fees', text: 'Professional Fees')).to have_content '0'
    expect(operating_expenses_inputs.find('#advertising', text: 'Advertising')).to have_content '0'
    expect(operating_expenses_inputs.find('#landscaping', text: 'Landscaping')).to have_content '0'
    expect(operating_expenses_inputs.find('#capital-expenditures', text: 'CapEx')).to have_content '7'
    expect(operating_expenses_inputs.find('#other-expenses', text: 'Other Expenses')).to have_content '0'
    expect(operating_expenses_inputs.find('#equipment-depreciation', text: 'Equipment Depreciation')).to have_content '0'
    expect(operating_expenses_inputs.find('#income-tax-rate', text: 'Income Tax Rate')).to have_content '0'
  end

  def see_the_property_details_for_the_other_property
    financing_and_income_assumptions = page.find('#financing-and-income-assumptions')
    valuation_inputs = page.find('#valuation-inputs')

    expect(financing_and_income_assumptions).to have_content 'Financing and Income Assumptions'
    expect(valuation_inputs).to have_content 'Inputs'

    expect(valuation_inputs.find('#land-cost')).to have_content '0'
    expect(valuation_inputs.find('#building-cost')).to have_content '299000'
    expect(valuation_inputs.find('#improvements')).to have_content '0'
    expect(valuation_inputs.find('#total-square-feet')).to have_content '3311'
    expect(valuation_inputs.find('#number-of-units')).to have_content '6'
    expect(valuation_inputs.find('#average-monthly-rent')).to have_content '482'
    expect(valuation_inputs.find('#other-income')).to have_content '0'
    expect(valuation_inputs.find('#equity-percentage')).to have_content '20'
    expect(valuation_inputs.find('#loan-interest-rate')).to have_content '4'
    expect(valuation_inputs.find('#amortization-period-in-years')).to have_content '30'
  end
end
