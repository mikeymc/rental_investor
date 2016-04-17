class AddIncomeAndCostProjections < ActiveRecord::Migration
  def change
    create_table :income_and_cost_projections do |t|
      t.decimal :rent_increases, array:true, default: [0,0,0,0,0]
      t.decimal :operating_expense_increases, array:true, default: [0,0,0,0,0]
    end
    add_reference :income_and_cost_projections, :rental_property, index: true
  end
end
