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

  def to_be_on_the_registration_page
    expect(page).to have_content 'Email'
    expect(page).to have_content 'Password'
    expect(page).to have_content 'Confirm Password'
    expect(page).to have_button 'Register'
  end

  def to_be_on_properties_list_page
    expect(page).to have_content 'Street'
    expect(page).to have_content 'City'
    expect(page).to have_content 'State'
    expect(page).to have_content 'Zip Code'
  end

  def to_see(text)
    expect(page).to have_content text
  end

  def to_see_properties(names, options)
    num_properties = names.size
    expected_cap_rate = options[:updated] ? '9.48%' : '8.36%'
    properties = {
      moroni: {
        street: '421 Moroni Blvd',
        city: 'Salt Lake City',
        state: 'UT',
        zip: '12345',
        cap_rate: expected_cap_rate
      },
      sesame: {
        street: '123 Sesame St',
        city: 'Buffalo',
        state: 'NY',
        zip: '67890'
      },
      seaside: {
        street: '456 Seaside Ln',
        city: 'San Diego',
        state: 'CA',
        zip: '90909'
      },
      sample: {
        street: '123 Sample St',
        city: 'Atlanta',
        state: 'GA',
        zip: '12345'
      },
      banana: {
        street: '666 Banana St'
      }
    }

    expect(page.find('.navbar')).not_to have_content 'All Properties'
    expect(page.all('.rental-property-summary', minimum: num_properties).size).to eq num_properties
    to_be_on_properties_list_page
    names.each do |name|
      properties[name].values.each do |v|
        expect(page).to have_content v
      end
    end
  end

  def to_be_signed_in_as(email)
    expect(page.find('navbar')).to have_content email
    expect(page).to have_content 'Sign Out'
  end

  def to_be_on_the_property_page_for(property)
    if (property[:name] == 'moroni')
      expect(page.find('navbar')).to have_content '421 Moroni Blvd, Salt Lake City, UT 12345'
    elsif (property[:name] == 'sesame')
      expect(page.find('navbar')).to have_content '123 Sesame St, Buffalo, NY 67890'
    elsif (property[:name] == 'banana')
      expect(page.find('navbar')).to have_content '666 Banana St, Fruitvale, CA 12345'
    end
  end

  def to_see_the_correct_values_for_the_property(property)
    expect(page).to have_content 'Monthly'
    (1..5).each { |year| expect(page).to have_content "Year #{year}" }

    property_numbers_evaluator.verify_the_property_details(property)
    property_numbers_evaluator.verify_the_operating_expenses_inputs(property)
    property_numbers_evaluator.verify_the_closing_costs(property)
    property_numbers_evaluator.verify_the_income_and_cost_projections(property)
    property_numbers_evaluator.verify_the_cost_and_revenue_assumptions(property)
    property_numbers_evaluator.verify_the_financing_assumptions(property)
    property_numbers_evaluator.verify_the_key_rent_ratios(property)
    property_numbers_evaluator.verify_the_operating_revenues(property)
    property_numbers_evaluator.verify_the_operating_expenses(property)
    property_numbers_evaluator.verify_the_net_operating_income(property)
    property_numbers_evaluator.verify_the_cash_flow_from_operations(property)
    property_numbers_evaluator.verify_the_roi(property)
  end
end
