class RentalProperty < ActiveRecord::Base
  has_one :financing_and_income_assumption, dependent: :destroy
  has_one :operating_expenses_assumption, dependent: :destroy
  has_one :closing_cost, dependent: :destroy
end
