require 'rails_helper'
require_relative 'helpers/expectations'

RSpec.describe 'the rental investment tool' do
  before(:each) do
    Rails.application.load_seed
  end

  let(:then_expect) { Expectations.new }

  it 'enables the user to evaluate investment properties' do
    check_property(name: 'moroni')
    check_property(name: 'sesame')
  end

  private

  def check_property(property)
    visit '/'
    then_expect.to_see_a_list_of_properties

    select(name: property[:name])
    evaluate(name: property[:name])
  end

  def select(property)
    if property[:name] == 'moroni'
      page.find('div.rental-property-summary', text: '421 Moroni Blvd').click
    elsif property[:name] == 'sesame'
      page.find('div.rental-property-summary', text: '123 Sesame St').click
    end
  end

  def evaluate(property)
    then_expect.to_see_the_property_details({name: property['name']})
    then_expect.to_see_the_operating_expenses({name: property['name']})
    then_expect.to_see_the_closing_costs({name: property['name']})
    then_expect.to_see_the_income_and_cost_projections
    then_expect.to_see_the_cost_and_revenue_assumptions({name: property['name']})
  end
end
