class MakeOperatingExpensesTwoDecimalsByDefault < ActiveRecord::Migration
  def change
    change_column :operating_expenses_assumptions, :taxes, :decimal, :precision => 14, :scale => 2
  end
end
