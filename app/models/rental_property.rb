class RentalProperty < ActiveRecord::Base
  has_one :financing_and_income_assumption, dependent: :destroy
end
