class OperatingExpensesAssumptions < ActiveRecord::Migration
  def change
    create_table :operating_expenses_assumptions do |t|
      t.decimal :vacancy_rate
      t.decimal :repairs_and_maintenance
      t.decimal :property_management_fees
      t.decimal :taxes
      t.decimal :insurance
      t.decimal :salaries_and_wages
      t.decimal :utilities
      t.decimal :water_and_sewer
      t.decimal :trash_removal
      t.decimal :professional_fees
      t.decimal :advertising
      t.decimal :landscaping
      t.decimal :capex
      t.decimal :other_expenses
      t.decimal :equipment_depreciation
      t.decimal :income_tax_rate
    end
    add_reference :operating_expenses_assumptions, :rental_property, index: true
  end
end
