class FinancingAndIncomeAssumptions < ActiveRecord::Migration
  def change
    create_table :financing_and_income_assumptions do |t|
      t.decimal :land_cost
      t.decimal :building_cost
      t.decimal :improvements
      t.decimal :total_square_feet
      t.decimal :number_of_units
      t.decimal :average_monthly_rent_per_unit
      t.decimal :other_monthly_income
      t.decimal :equity_percentage
      t.decimal :loan_interest_rate
      t.decimal :amortization_period_in_years
    end
    add_reference :financing_and_income_assumptions, :rental_property, index: true
  end
end
