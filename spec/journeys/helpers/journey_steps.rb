require 'rails_helper'

class JourneySteps
  include ::RSpec::Matchers
  include Capybara::DSL

  def register
    find('button', text: 'Sign Up').click
    fill_in 'Email', with: 'bonobo@ape.com'
    fill_in 'Password', with: '4bananas'
    fill_in 'Confirm Password', with: '4bananas'
    find('button', text: 'Register').click
    expect(page).to have_content 'Sign Out'
  end
end
