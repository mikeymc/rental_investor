class Api::RentalPropertiesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    @rental_properties = current_user.rental_properties
    render json: serialize(@rental_properties)
  end

  def show
    begin
      @rental_property = RentalProperty.where("user_id = #{current_user.id}").find(params[:id])
      render json: serialize(@rental_property)
    rescue
      render json: {}, status: 404
    end
  end

  def create
    property = params[:rental_property]
    RentalProperty.new({
      user_id: current_user.id,
      street: property[:street],
      city: property[:city],
      state: property[:state],
      zip_code: property[:zip_code],
      financing_and_income_assumption: FinancingAndIncomeAssumption.new(
        land_cost: 0,
        building_cost: 0,
        improvements: 0,
        total_square_feet: 0,
        number_of_units: 0,
        average_monthly_rent_per_unit: 0,
        other_monthly_income: 00,
        equity_percentage: 0,
        loan_interest_rate: 3.25,
        amortization_period_in_years: 30
      ),
      operating_expenses_assumption: OperatingExpensesAssumption.new(
        vacancy_rate: 0,
        repairs_and_maintenance: 0,
        property_management_fees: 10,
        taxes: 0,
        insurance: 0,
        salaries_and_wages: 0,
        utilities: 0,
        water_and_sewer: 0,
        trash_removal: 0,
        professional_fees: 0,
        advertising: 0,
        landscaping: 0,
        capex: 8,
        other_expenses: 0,
        equipment_depreciation: 0,
        income_tax_rate: 0
      ),
      closing_cost: ClosingCost.new(
        origination_fee: 0,
        processing_fee: 400,
        discount_points: 0,
        underwriting_fee: 500,
        appraisal: 425,
        credit_report: 35,
        flood_certificate: 0,
        tax_services: 75,
        title_insurance: 175,
        title_fees: 180,
        survey: 175,
        government_recording_charges: 125,
        transfer_taxes: 0,
        homeowners_insurance: 1100,
        settlement_company_charges: 175,
        wire_charges: 55,
      ),
      income_and_cost_projection: IncomeAndCostProjection.new(
        rent_increases: [0, 2, 2, 2, 2],
        operating_expense_increases: [0, 0, 0, 0, 0]
      ),
      questionnaire: Questionnaire.new
    }).save!
    render json: serialize(current_user.rental_properties)
  end

  def update
    @rental_property = RentalProperty.find(params[:rental_property][:id])

    if @rental_property.user_id.to_s != current_user[:id].to_s
      render json: {}, status: 403
      return
    end

    finance_and_income_assumptions = params[:rental_property][:financing_and_income_assumption]
    operating_expenses_assumption = params[:rental_property][:operating_expenses_assumption]
    income_and_cost_projection = params[:rental_property][:income_and_cost_projection]
    questionnaire = params[:rental_property][:questionnaire]
    @rental_property.financing_and_income_assumption.update({
      land_cost: finance_and_income_assumptions[:land_cost],
      building_cost: finance_and_income_assumptions[:building_cost],
      improvements: finance_and_income_assumptions[:improvements],
      number_of_units: finance_and_income_assumptions[:number_of_units],
      average_monthly_rent_per_unit: finance_and_income_assumptions[:average_monthly_rent_per_unit],
      other_monthly_income: finance_and_income_assumptions[:other_monthly_income],
      equity_percentage: finance_and_income_assumptions[:equity_percentage],
      loan_interest_rate: finance_and_income_assumptions[:loan_interest_rate],
      amortization_period_in_years: finance_and_income_assumptions[:amortization_period_in_years],
      total_square_feet: finance_and_income_assumptions[:total_square_feet]
    })
    @rental_property.operating_expenses_assumption.update({
      vacancy_rate: operating_expenses_assumption[:vacancy_rate],
      repairs_and_maintenance: operating_expenses_assumption[:repairs_and_maintenance],
      property_management_fees: operating_expenses_assumption[:property_management_fees],
      taxes: operating_expenses_assumption[:taxes],
      insurance: operating_expenses_assumption[:insurance],
      salaries_and_wages: operating_expenses_assumption[:salaries_and_wages],
      utilities: operating_expenses_assumption[:utilities],
      water_and_sewer: operating_expenses_assumption[:water_and_sewer],
      trash_removal: operating_expenses_assumption[:trash_removal],
      professional_fees: operating_expenses_assumption[:professional_fees],
      advertising: operating_expenses_assumption[:advertising],
      landscaping: operating_expenses_assumption[:landscaping],
      capex: operating_expenses_assumption[:capex],
      other_expenses: operating_expenses_assumption[:other_expenses],
      income_tax_rate: operating_expenses_assumption[:income_tax_rate]
    })
    @rental_property.income_and_cost_projection.update({
      rent_increases: income_and_cost_projection[:rent_increases],
      operating_expense_increases: income_and_cost_projection[:operating_expense_increases],
    })
    @rental_property.questionnaire.update({
      reason_owner_is_selling: questionnaire[:reason_owner_is_selling],
      is_all_work_permitted: questionnaire[:is_all_work_permitted],
      current_market_rent: questionnaire[:current_market_rent],
      major_projects_in_the_area: questionnaire[:major_projects_in_the_area],
      major_employer_in_the_area: questionnaire[:major_employer_in_the_area],
      does_area_expect_wage_growth: questionnaire[:does_area_expect_wage_growth],
      would_tenants_pay_more_for_air_conditioning: questionnaire[:would_tenants_pay_more_for_air_conditioning],
      would_tenants_pay_more_for_a_pool: questionnaire[:would_tenants_pay_more_for_a_pool],
      is_the_property_in_a_flood_zone: questionnaire[:is_the_property_in_a_flood_zone],
      are_there_any_covenants_or_caveats: questionnaire[:are_there_any_covenants_or_caveats],
      what_defects_or_imperfections_exist: questionnaire[:what_defects_or_imperfections_exist],
      what_is_the_zoning: questionnaire[:what_is_the_zoning],
      what_fixtures_and_fittings_will_go_with_the_sale: questionnaire[:what_fixtures_and_fittings_will_go_with_the_sale],
      is_the_foundation_still_structurally_sound: questionnaire[:is_the_foundation_still_structurally_sound],
      are_there_wiring_or_plumbing_issues: questionnaire[:are_there_wiring_or_plumbing_issues],
      how_is_the_roof: questionnaire[:how_is_the_roof],
      is_there_nearby_retail_and_entertainment: questionnaire[:is_there_nearby_retail_and_entertainment],
      have_there_been_any_offers: questionnaire[:have_there_been_any_offers],
      are_there_sealant_or_moisture_problems: questionnaire[:are_there_sealant_or_moisture_problems],
      are_there_signs_of_covered_damage: questionnaire[:are_there_signs_of_covered_damage],
      is_work_needed_in_the_short_term: questionnaire[:is_work_needed_in_the_short_term],
      will_a_title_search_reveal_surprises: questionnaire[:will_a_title_search_reveal_surprises],
      does_the_property_match_what_is_on_the_title: questionnaire[:does_the_property_match_what_is_on_the_title],
      when_was_the_last_appraisal: questionnaire[:when_was_the_last_appraisal],
      has_the_owner_previously_tried_to_sell: questionnaire[:has_the_owner_previously_tried_to_sell],
      how_motivated_is_the_seller: questionnaire[:how_motivated_is_the_seller],
      has_another_buyer_failed_to_close_due_to_financing: questionnaire[:has_another_buyer_failed_to_close_due_to_financing],
      positive_attributes_of_the_property: questionnaire[:positive_attributes_of_the_property],
      negative_attributes_of_the_property: questionnaire[:negative_attributes_of_the_property],
      how_to_make_money_on_this_property: questionnaire[:how_to_make_money_on_this_property],
      who_set_the_price: questionnaire[:who_set_the_price],
      quality_of_finishes_and_fittings: questionnaire[:quality_of_finishes_and_fittings],
      is_property_under_lease: questionnaire[:is_property_under_lease],
      how_is_surrounding_property: questionnaire[:how_is_surrounding_property],
      is_furniture_etc_included: questionnaire[:is_furniture_etc_included],
      how_many_owners: questionnaire[:how_many_owners]
    })
    render json: serialize(@rental_property)
  end

  def destroy
    @rental_property = RentalProperty.find(params[:id])

    if @rental_property.user_id.to_s != current_user[:id].to_s
      render json: {}, status: 403
      return
    end

    RentalProperty.destroy(params[:id])
    render json: serialize(current_user.rental_properties)
  end

  private

  def serialize(object)
    object.to_json(include: [
      :financing_and_income_assumption,
      :operating_expenses_assumption,
      :closing_cost,
      :income_and_cost_projection,
      :questionnaire
    ])
  end
end
