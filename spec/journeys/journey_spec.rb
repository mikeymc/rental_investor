require 'rails_helper'
require_relative 'helpers/expectations'

RSpec.describe 'finding stocks' do
  before(:each) do
    Rails.application.load_seed
  end

  let(:then_expect) { Expectations.new }

  it 'enables the user to view stocks' do
    visit '/'
    then_expect.to_see_a_list_of_properties

    click_on_a_property
    then_expect.to_see_the_property_details
    then_expect.to_see_the_operating_expenses
    then_expect.to_see_the_closing_costs
    then_expect.to_see_the_income_and_cost_projections
    then_expect.to_see_the_cost_and_revenue_assumptions

    visit '/'
    then_expect.to_see_a_list_of_properties

    click_on_another_property
    then_expect.to_see_the_property_details_for_the_other_property
    then_expect.to_see_the_operating_expenses_for_the_other_property
    then_expect.to_see_the_closing_costs_for_the_other_property
    then_expect.to_see_the_income_and_cost_projections
    then_expect.to_see_the_cost_and_revenue_assumptions_for_the_other_property
  end

  def click_on_a_property
    page.find('div.rental-property-summary', text: '421 Moroni Blvd').click
  end

  def click_on_another_property
    page.find('div.rental-property-summary', text: '123 Sesame St').click
  end

end
