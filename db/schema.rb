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

ActiveRecord::Schema.define(version: 20160416062325) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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

  create_table "rental_properties", force: true do |t|
    t.string "street"
    t.string "city"
    t.string "state"
    t.string "zip_code"
  end

end
