class CreateClosingCosts < ActiveRecord::Migration
  def change
    create_table :closing_costs do |t|
      t.decimal :origination_fee
      t.decimal :processing_fee
      t.decimal :discount_points
      t.decimal :underwriting_fee
      t.decimal :appraisal
      t.decimal :credit_report
      t.decimal :flood_certificate
      t.decimal :tax_services
      t.decimal :title_insurance
      t.decimal :title_fees
      t.decimal :survey
      t.decimal :government_recording_charges
      t.decimal :transfer_taxes
      t.decimal :homeowners_insurance
      t.decimal :settlement_company_charges
      t.decimal :wire_charges
    end
    add_reference :closing_costs, :rental_property, index: true
  end
end
