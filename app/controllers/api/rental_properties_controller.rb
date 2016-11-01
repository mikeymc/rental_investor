class Api::RentalPropertiesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    @rental_properties = current_user.rental_properties
    render json: @rental_properties
  end

  def show
    begin
      @rental_property = RentalProperty.where("user_id = #{current_user.id}").find(params[:id])
      render json: @rental_property, each_serializer: RentalPropertySerializer, key_transform: :camel_lower
    rescue
      render json: {}, status: 404
    end
  end

  def create
    property = params[:rentalProperty]
    RentalProperty.new({
                           user_id: current_user.id,
                           street: property[:street],
                           city: property[:city],
                           state: property[:state],
                           zip_code: property[:zipCode],
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
    render json: current_user.rental_properties, each_serializer: RentalPropertySerializer, key_transform: :camel_lower
  end

  def update
    @rental_property = RentalProperty.find(params[:rentalProperty][:id])

    if @rental_property.user_id.to_s != current_user[:id].to_s
      render json: {}, status: 403
      return
    end

    rental_property = params[:rentalProperty]
    finance_and_income_assumption = rental_property[:financingAndIncomeAssumption]
    operating_expenses_assumption = rental_property[:operatingExpensesAssumption]
    income_and_cost_projection = rental_property[:incomeAndCostProjection]
    questionnaire = rental_property[:questionnaire]

    if @rental_property.questionnaire.nil?
      @rental_property.questionnaire = Questionnaire.new
    end

    financing_assumption_to_update = FinancingAndIncomeAssumption.new
    financing_assumption_to_update.from_json(finance_and_income_assumption.to_json)
    operating_expenses_assumption_to_update = OperatingExpensesAssumption.new
    operating_expenses_assumption_to_update.from_json(operating_expenses_assumption.to_json)
    income_and_cost_projection_to_update = IncomeAndCostProjection.new
    income_and_cost_projection_to_update.from_json(income_and_cost_projection.to_json)
    @rental_property.financing_and_income_assumption = financing_assumption_to_update
    @rental_property.operating_expenses_assumption = operating_expenses_assumption_to_update
    @rental_property.income_and_cost_projection = income_and_cost_projection_to_update
    if (questionnaire)
      questionnaire_to_update = Questionnaire.new
      questionnaire_to_update.from_json(questionnaire.to_json)
      @rental_property.questionnaire = questionnaire_to_update
    end
    @rental_property.save!
    render json: @rental_property, each_serializer: RentalPropertySerializer, key_transform: :camel_lower
  end

  def destroy
    @rental_property = RentalProperty.find(params[:id])

    if @rental_property.user_id.to_s != current_user[:id].to_s
      render json: {}, status: 403
      return
    end

    RentalProperty.destroy(params[:id])
    render json: current_user.rental_properties, each_serializer: RentalPropertySerializer, key_transform: :camel_lower
  end
end
