class FinancingAndIncomeAssumptionSerializer < ActiveModel::Serializer
  attributes :land_cost,
             :building_cost,
             :improvements,
             :total_square_feet,
             :number_of_units,
             :average_monthly_rent_per_unit,
             :other_monthly_income,
             :equity_percentage,
             :loan_interest_rate,
             :amortization_period_in_years
end