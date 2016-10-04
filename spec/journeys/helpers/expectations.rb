require 'rails_helper'
require_relative 'property_numbers_evaluator'

class Expectations
  include ::RSpec::Matchers
  include Capybara::DSL

  def self.before(*names)
    names.each do |name|
      m = instance_method(name)
      define_method(name) do |*args, &block|
        yield
        puts name.to_s.gsub('_', ' ')
        m.bind(self).(*args, &block)
      end
    end
  end

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
    expect(page).to have_content 'Zip'
  end

  def to_see(text)
    expect(page).to have_content text
  end

  def to_see_properties(names, options)
    num_properties = names.size
    properties = {
      moroni: {
        street: '421 Moroni Blvd',
        city: 'Salt Lake City',
        state: 'UT',
        zip: '12345',
        cap_rate: options[:updated] ? '9.48%' : '8.36%',
        asking_price: options[:updated] ? '$3,233,435' : '$3,033,420',
        cash_on_cash_roi: options[:updated] ? '16.25%': '12.29%',
        units: options[:updated] ? '61' : '60',
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

    list = page.find('.rental-properties-list')

    expect(list.all('.rental-property-summary', minimum: num_properties).size).to eq num_properties
    to_be_on_properties_list_page

    names.each do |name|
      properties[name].values.each do |v|
        expect(list).to have_content v
      end
    end
  end

  def to_be_signed_in_as(email)
    navbar = page.find('navbar')
    expect(navbar).to have_content email
    expect(navbar).to have_content 'Sign Out'
  end

  def to_be_on_the_property_page_for(property)
    navbar = page.find('navbar')

    if (property[:name] == 'moroni')
      expect(navbar).to have_content '421 Moroni Blvd, Salt Lake City, UT 12345'
    elsif (property[:name] == 'sesame')
      expect(navbar).to have_content '123 Sesame St, Buffalo, NY 67890'
    elsif (property[:name] == 'banana')
      expect(navbar).to have_content '666 Banana St, Fruitvale, CA 12345'
    end
  end

  def to_see_the_correct_values_for_the_property(property)
    time_row = page.find('#time-row')
    expect(time_row).to have_content('Monthly')
    (1..5).each { |year| expect(time_row).to have_content "Year #{year}" }

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

  def to_see_the_filled_out_questionnaire
    expect(page.find('navbar')).to have_content 'Moroni'
    expect(page).to have_content 'Why do the owners want to sell?'
    expect(page.find('textarea[name=reason-owner-is-selling]').value).to eq('Some reason or another')
    expect(page).to have_content 'Has all work done on the property been permitted?'
    expect(page.find('textarea[name=is-all-work-permitted]').value).to eq('No - the garage is not permitted')
    expect(page).to have_content 'Is the property in a known flood zone?'
    expect(page.find('textarea[name=is-the-property-in-a-flood-zone]').value).to eq('No, it is on a mountain top')
    expect(page.find('textarea[name=is-the-property-in-a-flood-zone]').value).to eq('No, it is on a mountain top')
    expect(page).to have_content 'Are there any covenants, caveats or any regulatory impositions on the property?'
    expect(page.find('textarea[name=are-there-any-covenants-or-caveats]').value).to eq('Only the religious cult you must join')
    expect(page).to have_content 'What defects or imperfections exist?'
    expect(page.find('textarea[name=what-defects-or-imperfections-exist]').value).to eq('The house is missing one wall')
    expect(page).to have_content 'What is the zoning of the property? What is the potential for this zoning to change?'
    expect(page.find('textarea[name=what-is-the-zoning]').value).to eq('Right now residential but that could all change tomorrow')
    expect(page).to have_content 'What fixtures and fittings are part of the purchase and what aren’t?'
    expect(page.find('textarea[name=what-fixtures-and-fittings-will-go-with-the-sale]').value).to eq('Everything but the doorbell')
    expect(page).to have_content 'Is the foundation still structurally sound?'
    expect(page.find('textarea[name=is-the-foundation-still-structurally-sound]').value).to eq('Yes. The bricks look great')
    expect(page).to have_content 'How old is the roof and what condition is it in?'
    expect(page.find('textarea[name=how-is-the-roof]').value).to eq('It is caving in just slightly')
    expect(page).to have_content 'Are there known wiring or plumbing issues?'
    expect(page.find('textarea[name=are-there-wiring-or-plumbing-issues]').value).to eq('The lights turn on')
    expect(page).to have_content 'Is the property near major shopping centres, cafes, restaurants and so on?'
    expect(page.find('textarea[name=is-there-nearby-retail-and-entertainment]').value).to eq('There is a McDonalds')
    expect(page).to have_content 'Have there been any offers?'
    expect(page.find('textarea[name=have-there-been-any-offers]').value).to eq('Yes someone tried to buy it')
    expect(page).to have_content 'Does the property have any known sealant or moisture problems?'
    expect(page.find('textarea[name=are-there-sealant-or-moisture-problems]').value).to eq('Yes the roof is leaking')
    expect(page).to have_content 'Are there signs of internal or external damage that has been covered over?'
    expect(page.find('textarea[name=are-there-signs-of-covered-damage]').value).to eq('No everything looks on the up and up')
    expect(page).to have_content 'Is there potential work that may need doing in the short to medium term?'
    expect(page.find('textarea[name=is-work-needed-in-the-short-term]').value).to eq('It needs to be painted')
    expect(page).to have_content 'Will a title search reveal something that will affect the purchase?'
    expect(page.find('textarea[name=will-a-title-search-reveal-surprises]').value).to eq('It is not owned by the seller')
    expect(page).to have_content 'Do the actual physical property and the dwellings on it match what is delineated on the Certificate of Title?'
    expect(page.find('textarea[name=does-the-property-match-what-is-on-the-title]').value).to eq('There is an extra building')
    expect(page).to have_content 'When was the last appraisal?'
    expect(page.find('textarea[name=when-was-the-last-appraisal]').value).to eq('This year')
    expect(page).to have_content 'Has the owner previously tried to sell the property?'
    expect(page.find('textarea[name=has-the-owner-previously-tried-to-sell]').value).to eq('Last year')
    expect(page).to have_content 'How motivated is the seller?'
    expect(page.find('textarea[name=how-motivated-is-the-seller]').value).to eq('Dying to get out')
    expect(page).to have_content 'Has another buyer failed to close due to financing?'
    expect(page.find('textarea[name=has-another-buyer-failed-to-close-due-to-financing]').value).to eq('Yeah but he had no money')
    expect(page).to have_content 'What are the positive attributes of the property?'
    expect(page.find('textarea[name=positive-attributes-of-the-property]').value).to eq('I like the color')
    expect(page).to have_content 'What are the negative attributes of the property?'
    expect(page.find('textarea[name=negative-attributes-of-the-property]').value).to eq('I hate the windows')
    expect(page).to have_content 'Who set the price, the seller or the agent?'
    expect(page.find('textarea[name=who-set-the-price]').value).to eq('The seller. He is nuts')
    expect(page).to have_content 'What is the quality of the finishes and fittings?'
    expect(page.find('textarea[name=quality-of-finishes-and-fittings]').value).to eq('The fridge is shiny')
    expect(page).to have_content 'Is the property under lease?'
    expect(page.find('textarea[name=is-property-under-lease]').value).to eq('Yes it is fully rented')
    expect(page).to have_content 'What is the surrounding property like?'
    expect(page.find('textarea[name=how-is-surrounding-property]').value).to eq('All ugly houses')
    expect(page).to have_content 'Is any furniture etc being sold with the property?'
    expect(page.find('textarea[name=is-furniture-etc-included]').value).to eq('A huge toolchest')
    expect(page).to have_content 'How many owners has the property had since it was built?'
    expect(page.find('textarea[name=how-many-owners]').value).to eq('First owner')
  end

  before(*instance_methods(false)) { print 'Expecting to ' }

  private

  def property_numbers_evaluator
    @property_numbers_evaluator
  end
end
