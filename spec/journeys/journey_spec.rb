require 'rails_helper'
require_relative 'helpers/expectations'
require_relative 'helpers/journey_steps'

RSpec.describe 'the rental investment tool' do
  before(:each) do
    Rails.application.load_seed
    if (Capybara.current_driver != :poltergeist)
      Capybara.current_session.driver.browser.manage.window.resize_to(1280, 800)
    end
    puts ''
  end

  let(:now) { JourneySteps.new }
  let(:then_expect) { Expectations.new }

  it 'lets a user register and go straight to using app' do
    now.go_home
    then_expect.to_see_choice_to_login_or_register
    now.register
    then_expect.to_be_on_properties_list_page
    then_expect.to_be_signed_in_as('bonobo@ape.com')
    then_expect.to_see_properties([:sample], updated: false)
    now.logout
  end

  it 'shows if a user has already registered' do
    now.go_home
    then_expect.to_see_choice_to_login_or_register
    now.register
    then_expect.to_be_on_properties_list_page
    now.logout

    now.go_home
    then_expect.to_see_choice_to_login_or_register
    now.register
    then_expect.to_be_on_the_registration_page
    then_expect.to_see('Email already in use')
  end

  it 'shows a user only his properties' do
    now.go_home
    now.login_as(:monkey)
    then_expect.to_be_signed_in_as('monkey@ape.com')
    then_expect.to_see_properties([:moroni, :sesame], updated: false)
    now.logout

    now.go_home
    now.login_as(:fish)
    then_expect.to_be_signed_in_as('carp@fish.com')
    then_expect.to_see_properties([:seaside], updated: false)
    now.go_to_property(2)
    expect(page).to have_content "The page you were looking for doesn't exist"
  end

  it 'enables the user to evaluate investment properties' do
    now.go_home
    then_expect.to_see_choice_to_login_or_register
    now.go_to_property(1)
    then_expect.to_see_choice_to_login_or_register
    now.login_as(:monkey)

    then_expect.to_see_properties([:moroni, :sesame], updated: false)
    now.select_property(name: 'moroni')
    then_expect.to_be_on_the_property_page_for(name: 'moroni')
    then_expect.to_see_the_correct_values_for_the_property(name: 'moroni')

    now.go_back_to_properties_list
    then_expect.to_see_properties([:moroni, :sesame], updated: false)
    now.select_property(name: 'sesame')
    then_expect.to_be_on_the_property_page_for(name: 'sesame')
    then_expect.to_see_the_correct_values_for_the_property(name: 'sesame')

    now.go_back_to_properties_list
    then_expect.to_see_properties([:moroni, :sesame], updated: false)
    now.select_property(name: 'moroni')
    now.update_property
    then_expect.to_be_on_the_property_page_for(name: 'moroni')
    then_expect.to_see_the_correct_values_for_the_property(name: 'moroni', updated: true)
    now.save_the_document

    now.go_to_the_questionnaire_page
    now.fill_out_the_questionnaire
    now.save_the_document

    now.go_back_to_properties_list
    then_expect.to_see_properties([:moroni, :sesame], updated: true)
    now.select_property(name: 'moroni')
    then_expect.to_be_on_the_property_page_for(name: 'moroni')
    then_expect.to_see_the_correct_values_for_the_property(name: 'moroni', updated: true)
    now.go_to_the_questionnaire_page
    then_expect.to_see_the_filled_out_questionnaire

    now.go_back_to_properties_list
    then_expect.to_see_properties([:moroni, :sesame], updated: true)
    now.add_new_property
    now.select_property(name: 'banana')
    then_expect.to_be_on_the_property_page_for(name: 'banana')
    then_expect.to_see_the_correct_values_for_the_property(name: 'banana')

    now.go_back_to_properties_list
    then_expect.to_see_properties([:moroni, :sesame, :banana], updated: true)
    now.delete_property

    now.logout
    then_expect.to_see_choice_to_login_or_register
  end
end
