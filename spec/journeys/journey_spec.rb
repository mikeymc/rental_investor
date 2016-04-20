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
  end

  def see_updated_values
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Land')).to have_content '$600,000'
    expect(page.find('#cost-and-revenue-assumptions .row', text: 'Total Cost')).to have_content '$3,133,420'
  end

  def select_property(property)
    if property[:name] == 'moroni'
      page.find('div.rental-property-summary', text: '421 Moroni Blvd').click
    elsif property[:name] == 'sesame'
      page.find('div.rental-property-summary', text: '123 Sesame St').click
    end
  end

  def evaluate_property(property)
    then_expect.to_see_the_property_details({name: property['name']})
    then_expect.to_see_the_operating_expenses({name: property['name']})
    then_expect.to_see_the_closing_costs({name: property['name']})
    then_expect.to_see_the_income_and_cost_projections
    then_expect.to_see_the_cost_and_revenue_assumptions({name: property['name']})
  end
end
