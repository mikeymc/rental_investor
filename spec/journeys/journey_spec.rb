require 'rails_helper'
require_relative 'helpers/expectations'

RSpec.describe 'the rental investment tool' do
  before(:each) do
    Rails.application.load_seed
  end

  let(:then_expect) { Expectations.new }

  it 'enables the user to evaluate investment properties' do
    go_home
    select_property(name: 'moroni')
    evaluate_property(name: 'moroni')

    go_home
    select_property(name: 'sesame')
    evaluate_property(name: 'sesame')

    go_home
    select_property(name: 'moroni')
    update_property
    see_updated_values
    save_the_document
    go_home
    select_property(name: 'moroni')
    see_updated_values
  end

  private

  def save_the_document
    click_on('Save')
    expect(page).to have_content 'Saved!'
    Capybara.using_wait_time(5) do
      expect(page).to have_no_content 'Saved!'
    end
  end

  def go_home
    visit '/'
    then_expect.to_see_a_list_of_properties
  end

  def check_property(property)
    evaluate(name: property[:name])
  end

  def update_property
    fill_in('land-cost-input', with: '600000')
    fill_in('building-cost-input', with: '2600000')
    fill_in('improvements-input', with: '15')
    fill_in('number-of-units-input', with: '61')
    fill_in('average-monthly-rent-input', with: '800')
    fill_in('other-income-input', with: '1000')
    fill_in('equity-percentage-input', with: '20')
    fill_in('loan-interest-rate-input', with: '6.750')
    fill_in('amortization-period-in-years-input', with: '30')
    fill_in('total-square-feet-input', with: '53500')
    fill_in('vacancy-rate-input', with: '6.0')
    fill_in('repairs-and-maintenance-input', with: '5465')
    fill_in('property-management-fees-input', with: '4.5')
    fill_in('taxes-input', with: '3300.03')
    fill_in('insurance-input', with: '822.03')
    fill_in('salaries-and-wages-input', with: '1900.02')
    fill_in('utilities-input', with: '2219.97')
    fill_in('water-and-sewer-input', with: '6.00')
    fill_in('trash-removal-input', with: '135.02')
    fill_in('professional-fees-input', with: '309.98')
    fill_in('advertising-input', with: '510.01')
    fill_in('landscaping-input', with: '10.50')
    fill_in('capital-expenditures-input', with: '8.0')
    fill_in('other-expenses-input', with: '1050.25')
    fill_in('income-tax-rate-input', with: '10')

    fill_in('year-one-rent-increases-input', with: '1')
    fill_in('year-two-rent-increases-input', with: '2')
    fill_in('year-three-rent-increases-input', with: '3.6')
    fill_in('year-four-rent-increases-input', with: '3.7')
    fill_in('year-five-rent-increases-input', with: '3.1')

    fill_in('year-one-operating-expenses-increases-input', with: '1')
    fill_in('year-two-operating-expenses-increases-input', with: '-2.1')
    fill_in('year-three-operating-expenses-increases-input', with: '-1.1')
    fill_in('year-four-operating-expenses-increases-input', with: '1.6')
    fill_in('year-five-operating-expenses-increases-input', with: '2.1')
  end

  def see_updated_values
    then_expect.to_see_updated_values
  end

  def select_property(property)
    if property[:name] == 'moroni'
      page.find('div.rental-property-summary', text: '421 Moroni Blvd').click
    elsif property[:name] == 'sesame'
      page.find('div.rental-property-summary', text: '123 Sesame St').click
    end
  end

  def evaluate_property(property)
    then_expect.to_see_the_property_details(property)
    then_expect.to_see_the_operating_expenses_inputs(property)
    then_expect.to_see_the_closing_costs(property)
    then_expect.to_see_the_income_and_cost_projections(property)
    then_expect.to_see_the_cost_and_revenue_assumptions(property)
    then_expect.to_see_the_financing_assumptions(property)
    then_expect.to_see_the_key_rent_ratios(property)
    then_expect.to_see_the_rental_increase_projections(property)
    then_expect.to_see_the_operating_revenues(property)
    then_expect.to_see_the_operating_expenses(property)
    then_expect.to_see_the_net_operating_income(property)
    then_expect.to_see_the_cash_flow_from_operations(property)
    then_expect.to_see_the_roi(property)
  end
end
