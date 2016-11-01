class FinancingAndIncomeAssumption < ActiveRecord::Base
  belongs_to :rental_property

  alias_attribute :landCost, :land_cost
  alias_attribute :buildingCost, :building_cost
  alias_attribute :totalSquareFeet, :total_square_feet
  alias_attribute :numberOfUnits, :number_of_units
  alias_attribute :averageMonthlyRentPerUnit, :average_monthly_rent_per_unit
  alias_attribute :otherMonthlyIncome, :other_monthly_income
  alias_attribute :equityPercentage, :equity_percentage
  alias_attribute :loanInterestRate, :loan_interest_rate
  alias_attribute :amortizationPeriodInYears, :amortization_period_in_years
end
