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
    go_home
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
  end

  def see_updated_values
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Land')).to have_content '$600,000'
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Building')).to have_content '$2,600,000'
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Improvements')).to have_content '$15'
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Total Cost')).to have_content '$3,235,435'
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Number of Units')).to have_content '61'
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Average Monthly Rent')).to have_content '$800'
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Gross Monthly Rent')).to have_content '$48,800'
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Gross Monthly Income')).to have_content '$49,800'
    expect(page.find('#total-purchase')).to have_content '$3,235,435'
    expect(page.find('#total-closing-costs')).to have_content '$35,420'
    expect(page.find('#down-payment')).to have_content '$550,023.95'
    expect(page.find('#balance-to-finance')).to have_content '$2,685,411.05'
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
    then_expect.to_see_the_operating_expenses(property)
    then_expect.to_see_the_closing_costs(property)
    then_expect.to_see_the_income_and_cost_projections
    then_expect.to_see_the_cost_and_revenue_assumptions(property)
    then_expect.to_see_the_financing_assumptions(property)
  end
end
