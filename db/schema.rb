# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160417061633) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "closing_costs", force: true do |t|
    t.decimal "origination_fee"
    t.decimal "processing_fee"
    t.decimal "discount_points"
    t.decimal "underwriting_fee"
    t.decimal "appraisal"
    t.decimal "credit_report"
    t.decimal "flood_certificate"
    t.decimal "tax_services"
    t.decimal "title_insurance"
    t.decimal "title_fees"
    t.decimal "survey"
    t.decimal "government_recording_charges"
    t.decimal "transfer_taxes"
    t.decimal "homeowners_insurance"
    t.decimal "settlement_company_charges"
    t.decimal "wire_charges"
    t.integer "rental_property_id"
  end

  add_index "closing_costs", ["rental_property_id"], name: "index_closing_costs_on_rental_property_id", using: :btree

  create_table "financing_and_income_assumptions", force: true do |t|
    t.decimal "land_cost"
    t.decimal "building_cost"
    t.decimal "improvements"
    t.decimal "total_square_feet"
    t.decimal "number_of_units"
    t.decimal "average_monthly_rent_per_unit"
    t.decimal "other_monthly_income"
    t.decimal "equity_percentage"
    t.decimal "loan_interest_rate"
    t.decimal "amortization_period_in_years"
    t.integer "rental_property_id"
  end

  add_index "financing_and_income_assumptions", ["rental_property_id"], name: "index_financing_and_income_assumptions_on_rental_property_id", using: :btree

  create_table "income_and_cost_projections", force: true do |t|
    t.decimal "rent_increases",              default: [#<BigDecimal:7f8939fea758,'0.0',9(18)>, #<BigDecimal:7f8939fea708,'0.0',9(18)>, #<BigDecimal:7f8939fea6b8,'0.0',9(18)>, #<BigDecimal:7f8939fea668,'0.0',9(18)>, #<BigDecimal:7f8939fea618,'0.0',9(18)>], array: true
    t.decimal "operating_expense_increases", default: [#<BigDecimal:7f8939fe9e48,'0.0',9(18)>, #<BigDecimal:7f8939fe9df8,'0.0',9(18)>, #<BigDecimal:7f8939fe9da8,'0.0',9(18)>, #<BigDecimal:7f8939fe9d58,'0.0',9(18)>, #<BigDecimal:7f8939fe9d08,'0.0',9(18)>], array: true
    t.integer "rental_property_id"
  end

  add_index "income_and_cost_projections", ["rental_property_id"], name: "index_income_and_cost_projections_on_rental_property_id", using: :btree

  create_table "operating_expenses_assumptions", force: true do |t|
    t.decimal "vacancy_rate"
    t.decimal "repairs_and_maintenance"
    t.decimal "property_management_fees"
    t.decimal "taxes"
    t.decimal "insurance"
    t.decimal "salaries_and_wages"
    t.decimal "utilities"
    t.decimal "water_and_sewer"
    t.decimal "trash_removal"
    t.decimal "professional_fees"
    t.decimal "advertising"
    t.decimal "landscaping"
    t.decimal "capex"
    t.decimal "other_expenses"
    t.decimal "equipment_depreciation"
    t.decimal "income_tax_rate"
    t.integer "rental_property_id"
  end

  add_index "operating_expenses_assumptions", ["rental_property_id"], name: "index_operating_expenses_assumptions_on_rental_property_id", using: :btree

  create_table "rental_properties", force: true do |t|
    t.string "street"
    t.string "city"
    t.string "state"
    t.string "zip_code"
  end

end
