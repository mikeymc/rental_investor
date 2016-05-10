require 'rails_helper'
require_relative 'property_numbers_evaluator'

class Expectations
  include ::RSpec::Matchers
  include Capybara::DSL

  attr_accessor :property_numbers_evaluator

  def initialize
    @property_numbers_evaluator = PropertyNumbersEvaluator.new
  end

  def to_see_choice_to_login_or_register
    expect(page.find('label', text: 'Email')).to have_content 'Email'
    expect(page.find('label', text: 'Password')).to have_content 'Password'

    expect(page.find('button', text: 'Sign In')).to have_content 'Sign In'
    expect(page.find('button', text: 'Sign Up')).to have_content 'Sign Up'
  end

  def to_be_on_properties_list_page
    expect(page).to have_content 'Street'
    expect(page).to have_content 'City'
    expect(page).to have_content 'State'
    expect(page).to have_content 'Zip Code'
  end

  def to_see_a_list_of_properties
    to_be_on_properties_list_page

    expect(page.all('.rental-property-summary', minimum: 2).size).to eq 2

    expect(page).to have_content '421 Moroni Blvd'
    expect(page).to have_content 'Salt Lake City'
    expect(page).to have_content 'UT'
    expect(page).to have_content '12345'

    expect(page).to have_content '123 Sesame St'
    expect(page).to have_content 'Buffalo'
    expect(page).to have_content 'NY'
    expect(page).to have_content '67890'
  end

  def to_see_more_properties
    to_be_on_properties_list_page

    expect(page.all('.rental-property-summary', minimum: 3).size).to eq 3

    expect(page).to have_content '421 Moroni Blvd'
    expect(page).to have_content 'Salt Lake City'
    expect(page).to have_content 'UT'
    expect(page).to have_content '12345'

    expect(page).to have_content '123 Sesame St'
    expect(page).to have_content 'Buffalo'
    expect(page).to have_content 'NY'
    expect(page).to have_content '67890'

    expect(page).to have_content '666 Banana St'
  end

  def to_see_fish_properties
    to_be_on_properties_list_page

    expect(page.all('.rental-property-summary', minimum: 1).size).to eq 1

    expect(page).to have_content '456 Seaside Ln'
    expect(page).to have_content 'San Diego'
    expect(page).to have_content 'CA'
    expect(page).to have_content '90909'
  end

  def to_be_signed_in_as(email)
    expect(page.find('navbar')).to have_content email
    expect(page).to have_content 'Sign Out'
  end

  def to_see_the_correct_values_for_the_property(property)
    property_numbers_evaluator.verify_the_property_details(property)
    property_numbers_evaluator.verify_the_operating_expenses_inputs(property)
    property_numbers_evaluator.verify_the_closing_costs(property)
    property_numbers_evaluator.verify_the_income_and_cost_projections(property)
    property_numbers_evaluator.verify_the_cost_and_revenue_assumptions(property)
    property_numbers_evaluator.verify_the_financing_assumptions(property)
    property_numbers_evaluator.verify_the_key_rent_ratios(property)
    property_numbers_evaluator.verify_the_rental_increase_projections(property)
    property_numbers_evaluator.verify_the_operating_revenues(property)
    property_numbers_evaluator.verify_the_operating_expenses(property)
    property_numbers_evaluator.verify_the_net_operating_income(property)
    property_numbers_evaluator.verify_the_cash_flow_from_operations(property)
    property_numbers_evaluator.verify_the_roi(property)
  end
end
