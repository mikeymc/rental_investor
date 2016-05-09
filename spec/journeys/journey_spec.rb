require 'rails_helper'
require_relative 'helpers/expectations'

RSpec.describe 'the rental investment tool' do
  before(:each) do
    Rails.application.load_seed
  end

  let(:then_expect) { Expectations.new }

  it 'lets a user register and go straight to using app' do
    go_home
    see_choice_to_login_or_register
    register
    then_expect.to_see_a_list_of_properties
    select_property(name: 'moroni')
    evaluate_property(name: 'moroni')
    logout
  end

  it 'enables the user to evaluate investment properties' do
    go_home
    see_choice_to_login_or_register
    try_going_to_a_property
    see_choice_to_login_or_register
    login

    then_expect.to_see_a_list_of_properties
    select_property(name: 'moroni')
    evaluate_property(name: 'moroni')

    go_home
    then_expect.to_see_a_list_of_properties
    select_property(name: 'sesame')
    evaluate_property(name: 'sesame')

    go_home
    then_expect.to_see_a_list_of_properties
    select_property(name: 'moroni')
    update_property
    see_updated_values
    save_the_document

    go_home
    then_expect.to_see_a_list_of_properties
    select_property(name: 'moroni')
    see_updated_values

    go_home
    then_expect.to_see_a_list_of_properties
    add_new_property
    go_to_new_property
    evaluate_property(name: 'banana')

    go_home
    then_expect.to_see_a_list_of_properties
    delete_property

    logout
    see_choice_to_login_or_register
  end

  private

  def see_choice_to_login_or_register
    expect(page.find('button', text: 'Sign In')).to have_content 'Sign In'
    expect(page.find('button', text: 'Sign Up')).to have_content 'Sign Up'
  end

  def register
    find('button', text: 'Sign Up').click
    fill_in 'Email', with: 'bonobo@ape.com'
    fill_in 'Password', with: '4bananas'
    fill_in 'Confirm Password', with: '4bananas'
    find('button', text: 'Register').click
    expect(page).to have_content 'Sign Out'
  end

  def try_going_to_a_property
    visit '/#/rental_property/1'
  end

  def go_to_login_page
    visit '/#/sign_in'
  end

  def logout
    page.find('button', text: 'Sign Out').click
  end

  def login
    find('button', text: 'Sign In').click
    fill_in 'Email', with: 'monkey@ape.com'
    fill_in 'Password', with: '4bananas'
    find('button', text: 'Sign In').click

    expect(page).to have_content 'Sign Out'
  end

  def see_login_page
    expect(page.find('div', text: 'Email')).to have_content 'Email'
    expect(page.find('div', text: 'Password')).to have_content 'Password'
    expect(page.find('button')).to have_content 'Sign In'
  end

  def delete_property
    expect(page.all('tr.rental-property-summary', minimum: 3, maximum: 3).size).to eq(3)

    moroni_property = page.find('tr.rental-property-summary', text: 'Moroni')
    moroni_property.find('.delete-property').click

    expect(page.all('.rental-property-summary', minimum: 2, maximum: 2).size).to eq(2)
  end

  def go_to_new_property
    select_property(name: 'banana')
  end

  def add_new_property
    expect(page.all('tr.rental-property-summary').size).to eq(2)
    click_on('New Property')
    expect(page.all('tr.rental-property-summary').size).to eq(3)
    fill_in('new_property_street', with: '666 Banana St')
    fill_in('new_property_city', with: 'Fruitvale')
    fill_in('new_property_state', with: 'CA')
    fill_in('new_property_zip', with: '12345')
    click_on('Create')
  end

  def save_the_document
    click_on('Save')
    expect(page).to have_content 'Saved!'
    Capybara.using_wait_time(5) do
      expect(page).to have_no_content 'Saved!'
    end
  end

  def go_home
    visit '/'
  end

  def check_property(property)
    evaluate(name: property[:name])
  end

  def update_property
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
  end

  def see_updated_values
    then_expect.to_see_updated_values
  end

  def select_property(property)
    if property[:name] == 'moroni'
      page.find('tr.rental-property-summary', text: '421 Moroni Blvd').click
    elsif property[:name] == 'sesame'
      page.find('tr.rental-property-summary', text: '123 Sesame St').click
    elsif property[:name] == 'banana'
      page.find('tr.rental-property-summary', text: '666 Banana St').click
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
