require 'rails_helper'
require_relative 'helpers/expectations'
require_relative 'helpers/journey_steps'

RSpec.describe 'the rental investment tool' do
  before(:each) do
    Rails.application.load_seed
  end

  let(:now) { JourneySteps.new }
  let(:then_expect) { Expectations.new }

  it 'lets a user register and go straight to using app' do
    now.go_home
    then_expect.to_see_choice_to_login_or_register
    now.register
    then_expect.to_be_on_properties_list_page
    now.logout
  end

  it 'shows a user only his properties' do
    now.go_home
    now.login_as(:monkey)
    then_expect.to_be_signed_in_as('monkey@ape.com')
    then_expect.to_see_properties([:moroni, :sesame])
    now.logout

    now.go_home
    now.login_as(:fish)
    then_expect.to_be_signed_in_as('carp@fish.com')
    then_expect.to_see_properties([:seaside])
    now.logout
  end

  it 'enables the user to evaluate investment properties' do
    now.go_home
    then_expect.to_see_choice_to_login_or_register
    now.try_going_to_a_property
    then_expect.to_see_choice_to_login_or_register
    now.login_as(:monkey)

    then_expect.to_see_properties([:moroni, :sesame])
    now.select_property(name: 'moroni')
    then_expect.to_see_the_correct_values_for_the_property(name: 'moroni')

    now.go_home
    then_expect.to_see_properties([:moroni, :sesame])
    now.select_property(name: 'sesame')
    then_expect.to_see_the_correct_values_for_the_property(name: 'sesame')

    now.go_home
    then_expect.to_see_properties([:moroni, :sesame])
    now.select_property(name: 'moroni')
    now.update_property
    then_expect.to_see_the_correct_values_for_the_property(name: 'moroni', updated: true)
    now.save_the_document

    now.go_home
    then_expect.to_see_properties([:moroni, :sesame])
    now.select_property(name: 'moroni')
    then_expect.to_see_the_correct_values_for_the_property(name: 'moroni', updated: true)

    now.go_home
    then_expect.to_see_properties([:moroni, :sesame])
    now.add_new_property
    now.select_property(name: 'banana')
    then_expect.to_see_the_correct_values_for_the_property(name: 'banana')

    now.go_home
    then_expect.to_see_properties([:moroni, :sesame, :banana])
    now.delete_property

    now.logout
    then_expect.to_see_choice_to_login_or_register
  end
end
