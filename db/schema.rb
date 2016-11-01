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

 ActiveRecord::Schema.define(version: 20161030184257) do

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
    t.decimal "rent_increases",              default: [#<BigDecimal:7ffb381da638,'0.0',9(18)>, #<BigDecimal:7ffb381da5c0,'0.0',9(18)>, #<BigDecimal:7ffb381da548,'0.0',9(18)>, #<BigDecimal:7ffb381da4d0,'0.0',9(18)>, #<BigDecimal:7ffb381da458,'0.0',9(18)>], array: true
    t.decimal "operating_expense_increases", default: [#<BigDecimal:7ffb381d9ad0,'0.0',9(18)>, #<BigDecimal:7ffb381d9a58,'0.0',9(18)>, #<BigDecimal:7ffb381d99e0,'0.0',9(18)>, #<BigDecimal:7ffb381d9968,'0.0',9(18)>, #<BigDecimal:7ffb381d98f0,'0.0',9(18)>], array: true
    t.integer "rental_property_id"
  end

  add_index "income_and_cost_projections", ["rental_property_id"], name: "index_income_and_cost_projections_on_rental_property_id", using: :btree

  create_table "operating_expenses_assumptions", force: :cascade do |t|
    t.decimal "vacancy_rate",             precision: 14, scale: 2
    t.decimal "repairs_and_maintenance",  precision: 14, scale: 2
    t.decimal "property_management_fees", precision: 14, scale: 2
    t.decimal "taxes",                    precision: 14, scale: 2
    t.decimal "insurance",                precision: 14, scale: 2
    t.decimal "salaries_and_wages",       precision: 14, scale: 2
    t.decimal "utilities",                precision: 14, scale: 2
    t.decimal "water_and_sewer",          precision: 14, scale: 2
    t.decimal "trash_removal",            precision: 14, scale: 2
    t.decimal "professional_fees",        precision: 14, scale: 2
    t.decimal "advertising",              precision: 14, scale: 2
    t.decimal "landscaping",              precision: 14, scale: 2
    t.decimal "capex",                    precision: 14, scale: 2
    t.decimal "other_expenses",           precision: 14, scale: 2
    t.decimal "equipment_depreciation",   precision: 14, scale: 2
    t.decimal "income_tax_rate",          precision: 14, scale: 2
    t.integer "rental_property_id"
  end

  add_index "operating_expenses_assumptions", ["rental_property_id"], name: "index_operating_expenses_assumptions_on_rental_property_id", using: :btree

  create_table "questionnaires", force: :cascade do |t|
    t.text    "reason_owner_is_selling"
    t.text    "is_all_work_permitted"
    t.text    "current_market_rent"
    t.text    "is_the_property_in_a_flood_zone"
    t.text    "are_there_any_covenants_or_caveats"
    t.text    "what_defects_or_imperfections_exist"
    t.text    "what_is_the_zoning"
    t.text    "what_fixtures_and_fittings_will_go_with_the_sale"
    t.text    "is_the_foundation_still_structurally_sound"
    t.text    "how_is_the_roof"
    t.text    "are_there_wiring_or_plumbing_issues"
    t.text    "is_there_nearby_retail_and_entertainment"
    t.text    "have_there_been_any_offers"
    t.text    "are_there_sealant_or_moisture_problems"
    t.text    "are_there_signs_of_covered_damage"
    t.text    "is_work_needed_in_the_short_term"
    t.text    "will_a_title_search_reveal_surprises"
    t.text    "does_the_property_match_what_is_on_the_title"
    t.text    "when_was_the_last_appraisal"
    t.text    "has_the_owner_previously_tried_to_sell"
    t.text    "how_motivated_is_the_seller"
    t.text    "has_another_buyer_failed_to_close_due_to_financing"
    t.text    "positive_attributes_of_the_property"
    t.text    "negative_attributes_of_the_property"
    t.text    "how_to_make_money_on_this_property"
    t.text    "who_set_the_price"
    t.text    "quality_of_finishes_and_fittings"
    t.text    "is_property_under_lease"
    t.text    "how_is_surrounding_property"
    t.text    "is_furniture_etc_included"
    t.text    "how_many_owners"
    t.integer "rental_property_id"
  end

  add_index "questionnaires", ["rental_property_id"], name: "index_questionnaires_on_rental_property_id", using: :btree

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
