class MakeTheRestOfOperatingExpensesTwoDecimalsByDefault < ActiveRecord::Migration
  def change
    change_column :operating_expenses_assumptions, :vacancy_rate, :decimal, :precision => 14, :scale => 2
    change_column :operating_expenses_assumptions, :repairs_and_maintenance, :decimal, :precision => 14, :scale => 2
    change_column :operating_expenses_assumptions, :property_management_fees, :decimal, :precision => 14, :scale => 2
    change_column :operating_expenses_assumptions, :insurance, :decimal, :precision => 14, :scale => 2
    change_column :operating_expenses_assumptions, :salaries_and_wages, :decimal, :precision => 14, :scale => 2
    change_column :operating_expenses_assumptions, :utilities, :decimal, :precision => 14, :scale => 2
    change_column :operating_expenses_assumptions, :water_and_sewer, :decimal, :precision => 14, :scale => 2
    change_column :operating_expenses_assumptions, :trash_removal, :decimal, :precision => 14, :scale => 2
    change_column :operating_expenses_assumptions, :professional_fees, :decimal, :precision => 14, :scale => 2
    change_column :operating_expenses_assumptions, :advertising, :decimal, :precision => 14, :scale => 2
    change_column :operating_expenses_assumptions, :landscaping, :decimal, :precision => 14, :scale => 2
    change_column :operating_expenses_assumptions, :capex, :decimal, :precision => 14, :scale => 2
    change_column :operating_expenses_assumptions, :other_expenses, :decimal, :precision => 14, :scale => 2
    change_column :operating_expenses_assumptions, :equipment_depreciation, :decimal, :precision => 14, :scale => 2
    change_column :operating_expenses_assumptions, :income_tax_rate, :decimal, :precision => 14, :scale => 2
  end
end
