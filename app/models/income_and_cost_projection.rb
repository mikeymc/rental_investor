class IncomeAndCostProjection < ActiveRecord::Base
  belongs_to :rental_property

  alias_attribute :rentIncreases, :rent_increases
  alias_attribute :operatingExpenseIncreases, :operating_expense_increases
end
