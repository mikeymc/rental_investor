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

ActiveRecord::Schema.define(version: 20160510054241) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "closing_costs", force: :cascade do |t|
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

  create_table "financing_and_income_assumptions", force: :cascade do |t|
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

  create_table "income_and_cost_projections", force: :cascade do |t|
    t.decimal "rent_increases",              default: [#<BigDecimal:7fd92b7c5798,'0.0',9(18)>, #<BigDecimal:7fd92b7c56d0,'0.0',9(18)>, #<BigDecimal:7fd92b7c5540,'0.0',9(18)>, #<BigDecimal:7fd92b7c5090,'0.0',9(18)>, #<BigDecimal:7fd92b7c4f78,'0.0',9(18)>], array: true
    t.decimal "operating_expense_increases", default: [#<BigDecimal:7fd92b7bf6b8,'0.0',9(18)>, #<BigDecimal:7fd92b7bf640,'0.0',9(18)>, #<BigDecimal:7fd92b7bf5a0,'0.0',9(18)>, #<BigDecimal:7fd92b7bf500,'0.0',9(18)>, #<BigDecimal:7fd92b7bf3e8,'0.0',9(18)>], array: true
    t.integer "rental_property_id"
  end

  add_index "income_and_cost_projections", ["rental_property_id"], name: "index_income_and_cost_projections_on_rental_property_id", using: :btree

  create_table "operating_expenses_assumptions", force: :cascade do |t|
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

  create_table "rental_properties", force: :cascade do |t|
    t.string  "street"
    t.string  "city"
    t.string  "state"
    t.string  "zip_code"
    t.integer "user_id"
  end

  add_index "rental_properties", ["user_id"], name: "index_rental_properties_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.json     "tokens"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree

end
