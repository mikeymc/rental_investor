class Api::RentalPropertiesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @rental_properties = RentalProperty.all
    render json: @rental_properties
  end

  def show
    @rental_property = RentalProperty.find(params[:id])
    render json: @rental_property.to_json(include: [
      :financing_and_income_assumption,
      :operating_expenses_assumption,
      :closing_cost,
      :income_and_cost_projection,
    ])
  end

  def update
    @rental_property = RentalProperty.find(params[:rental_property][:id])
    new_land_cost = params[:rental_property][:financing_and_income_assumption][:land_cost]

    @rental_property.financing_and_income_assumption.update(land_cost: new_land_cost)
    render json: @rental_property.to_json(include: [
      :financing_and_income_assumption,
      :operating_expenses_assumption,
      :closing_cost,
      :income_and_cost_projection,
    ])

    # begin
    #   @budget = Budget.find(params['id'])
    #   @budget.annual_savings_goal = params['annual_savings_goal']
    #   @budget.net_annual_salary = params['net_annual_salary']
    #   @budget.save!
    #   render json: @budget, serializer: BudgetSerializer
    # rescue
    #   render json: {}, status: 404
    # end
  end

  def create
    # begin
    #   @budget = Budget.create()
    #   @budget.save!
    #   render json: @budget, serializer: BudgetSerializer
    # rescue
    #   render json: {}, status: 404
    # end
  end
end
