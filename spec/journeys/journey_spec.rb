require 'rails_helper'

RSpec.describe 'finding stocks' do
  before(:each) do
    Rails.application.load_seed
  end

  it 'enables the user to view stocks' do
    visit '/'
    see_a_list_of_properties
    click_on_a_property
    see_the_property_details
  end

  def see_a_list_of_properties
    expect(page).to have_content('Street')
    expect(page).to have_content('City')
    expect(page).to have_content('State')
    expect(page).to have_content('Zip Code')

    expect(page).to have_content '421 Moroni Blvd'
    expect(page).to have_content 'Salt Lake City'
    expect(page).to have_content 'UT'
    expect(page).to have_content '12345'

    expect(page).to have_content '123 Sesame St'
    expect(page).to have_content 'Buffalo'
    expect(page).to have_content 'NY'
    expect(page).to have_content '67890'
  end

  def click_on_a_property
    page.find('div.rental-property-summary', text: '421 Moroni Blvd').click
  end

  def see_the_property_details
    expect(page).to have_content 'Financing and Income Assumptions'
  end
end
