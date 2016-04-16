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
    visit '/'
    click_on_another_property
    see_the_property_details_for_the_other_property
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

    expect(valuation_inputs.find('#land-cost')).to have_content '500000'
    expect(valuation_inputs.find('#building-cost')).to have_content '2500000'
    expect(valuation_inputs.find('#improvements')).to have_content '0'
    expect(valuation_inputs.find('#total-square-feet')).to have_content '52500'
    expect(valuation_inputs.find('#number-of-units')).to have_content '60'
    expect(valuation_inputs.find('#average-monthly-rent')).to have_content '700'
    expect(valuation_inputs.find('#other-income')).to have_content '600'
    expect(valuation_inputs.find('#equity-percentage')).to have_content '17'
    expect(valuation_inputs.find('#loan-interest-rate')).to have_content '5.75'
    expect(valuation_inputs.find('#amortization-period-in-years')).to have_content '25'
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
