require 'rails_helper'

module Printer
end

class JourneySteps
  include ::RSpec::Matchers
  include Capybara::DSL

  def go_home
    visit '/'
  end

  def go_to_login_page
    visit '/#/sign_in'
  end

  def go_back_to_properties_list
    find('navbar a', text: 'Home').click
  end

  def login_as(user)
    if (user == :monkey)
      fill_in 'Email', with: 'monkey@ape.com'
      fill_in 'Password', with: '4bananas'
    elsif (user == :fish)
      fill_in 'Email', with: 'carp@fish.com'
      fill_in 'Password', with: '4earthworms'
    end
    find('button', text: 'Sign In').click
  end

  def logout
    page.find('button', text: 'Sign Out').click
  end

  def register
    find('button', text: 'Sign Up').click
    fill_in 'Email', with: 'bonobo@ape.com'
    fill_in 'Password', with: '4bananas'
    fill_in 'Confirm Password', with: '4bananas'
    find('button', text: 'Register').click
  end

  def go_to_property(id)
    visit '/#/rental_property/' + id.to_s
  end

  def select_property(property)
    if property[:name] == 'moroni'
      page.find('div.rental-property-summary', text: '421 Moroni Blvd').click
    elsif property[:name] == 'sesame'
      page.find('div.rental-property-summary', text: '123 Sesame St').click
    elsif property[:name] == 'banana'
      page.find('div.rental-property-summary', text: '666 Banana St').click
    end
  end

  def add_new_property
    expect(page.all('div.rental-property-summary').size).to eq(2)
    click_on('New Property')
    fill_in('new_property_street', with: '666 Banana St')
    fill_in('new_property_city', with: 'Fruitvale')
    fill_in('new_property_state', with: 'CA')
    fill_in('new_property_zip', with: '12345')
    click_on('Create')
  end

  def delete_property
    expect(page.all('div.rental-property-summary', minimum: 3, maximum: 3).size).to eq(3)

    moroni_property = page.find('div.rental-property-summary', text: 'Moroni')
    moroni_property.find('.delete-property').click

    expect(page.all('.rental-property-summary', minimum: 2, maximum: 2).size).to eq(2)
  end

  def go_to_the_questionnaire_page
    page.find('navbar').find_link('Questionnaire').click
  end

  def fill_out_the_questionnaire
    expect(page.find('navbar')).to have_content 'Moroni'
    expect(page).to have_content 'Why do the owners want to sell?'
    fill_in('reason-owner-is-selling', with: 'Some reason or another')
    fill_in('is-all-work-permitted', with: 'No - the garage is not permitted')
    fill_in('current-market-rent', with: '$1600')
    fill_in('major-projects-in-the-area', with: 'Someone is building a mall')
    fill_in('major-employer-in-the-area', with: 'Mr BIG. They plan to go up 10000 employees')
    fill_in('does-area-expect-wage-growth', with: 'Yes, Mr Big is definitely growing')
    fill_in('would-tenants-pay-more-for-air-conditioning', with: 'No, the temperature is usually cool')
    fill_in('would-tenants-pay-more-for-a-pool', with: 'Yes, a pool would be nice')
    fill_in('is-the-property-in-a-flood-zone', with: 'No, it is on a mountain top')
    fill_in('are-there-any-covenants-or-caveats', with: 'Only the religious cult you must join')
    fill_in('what-defects-or-imperfections-exist', with: 'The house is missing one wall')
    fill_in('what-is-the-zoning', with: 'Right now residential but that could all change tomorrow')
    fill_in('what-fixtures-and-fittings-will-go-with-the-sale', with: 'Everything but the doorbell')
    fill_in('is-the-foundation-still-structurally-sound', with: 'Yes. The bricks look great')
    fill_in('how-is-the-roof', with: 'It is caving in just slightly')
    fill_in('are-there-wiring-or-plumbing-issues', with: 'The lights turn on')
    fill_in('is-there-nearby-retail-and-entertainment', with: 'There is a McDonalds')
    fill_in('are-there-sealant-or-moisture-problems', with: 'Yes the roof is leaking')
    fill_in('have-there-been-any-offers', with: 'Yes someone tried to buy it')
    fill_in('are-there-signs-of-covered-damage', with: 'No everything looks on the up and up')
    fill_in('is-work-needed-in-the-short-term', with: 'It needs to be painted')
    fill_in('will-a-title-search-reveal-surprises', with: 'It is not owned by the seller')
    fill_in('does-the-property-match-what-is-on-the-title', with: 'There is an extra building')
    fill_in('when-was-the-last-appraisal', with: 'This year')
    fill_in('has-the-owner-previously-tried-to-sell', with: 'Last year')
    fill_in('has-another-buyer-failed-to-close-due-to-financing', with: 'Yeah but he had no money')
    fill_in('how-motivated-is-the-seller', with: 'Dying to get out')
    fill_in('positive-attributes-of-the-property', with: 'I like the color')
    fill_in('negative-attributes-of-the-property', with: 'I hate the windows')
    fill_in('how-to-make-money-on-this-property', with: 'Burn it and get insurance money')
    fill_in('who-set-the-price', with: 'The seller. He is nuts')
    fill_in('quality-of-finishes-and-fittings', with: 'The fridge is shiny')
    fill_in('is-property-under-lease', with: 'Yes it is fully rented')
    fill_in('how-is-surrounding-property', with: 'All ugly houses')
    fill_in('is-furniture-etc-included', with: 'A huge toolchest')
    fill_in('how-many-owners', with: 'First owner')
  end

  def save_the_document
    click_on('Save')
    expect(page).to have_content 'Saved!'
    Capybara.using_wait_time(5) do
      expect(page).to have_no_content 'Saved!'
    end
  end

  def update_property
    expect(page.find('navbar')).to have_content 'Moroni'
    page.find('#land-cost-input').send_keys('600000')
    page.find('#building-cost-input').send_keys('2600000')
    page.find('#improvements-input').send_keys('15')
    page.find('#number-of-units-input').send_keys('61')
    page.find('#average-monthly-rent-input').send_keys('800')
    page.find('#other-income-input').send_keys('1000')
    page.find('#equity-percentage-input').send_keys('20')
    page.find('#loan-interest-rate-input').send_keys('6.750')
    page.find('#amortization-period-in-years-input').send_keys('30')
    page.find('#total-square-feet-input').send_keys('53500')
    page.find('#vacancy-rate-input').send_keys('6.0')
    page.find('#repairs-and-maintenance-input').send_keys('5465')
    page.find('#property-management-fees-input').send_keys('4.5')
    page.find('#taxes-input').send_keys('3300.03')
    page.find('#insurance-input').send_keys('822.03')
    page.find('#salaries-and-wages-input').send_keys('1900.02')
    page.find('#utilities-input').send_keys('2219.97')
    page.find('#water-and-sewer-input').send_keys('6.00')
    page.find('#trash-removal-input').send_keys('135.02')
    page.find('#professional-fees-input').send_keys('309.98')
    page.find('#advertising-input').send_keys('510.01')
    page.find('#landscaping-input').send_keys('10.50')
    page.find('#capital-expenditures-input').send_keys('8.0')
    page.find('#other-expenses-input').send_keys('1050.25')
    page.find('#income-tax-rate-input').send_keys('10')
    page.find('#year-one-rent-increases-input').send_keys('1')
    page.find('#year-two-rent-increases-input').send_keys('2')
    page.find('#year-three-rent-increases-input').send_keys('3.6')
    page.find('#year-four-rent-increases-input').send_keys('3.7')
    page.find('#year-five-rent-increases-input').send_keys('3.1')
    page.find('#year-one-operating-expenses-increases-input').send_keys('1')
    page.find('#year-two-operating-expenses-increases-input').send_keys('-2.1')
    page.find('#year-three-operating-expenses-increases-input').send_keys('-1.1')
    page.find('#year-four-operating-expenses-increases-input').send_keys('1.6')
    page.find('#year-five-operating-expenses-increases-input').send_keys('2.1')

    # just click away from the inputs
    page.find('.navbar').click
  end

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

  before(*instance_methods(false)) { print 'Preparing to ' }
end
