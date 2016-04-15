class Api::RentalPropertiesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @rental_properties = RentalProperty.all
    render json: @rental_properties
  end

  def show
    # begin
    #   @budget = Rental.find(params['id'])
    #   render json: @budget, serializer: BudgetSerializer
    # rescue
    #   render json: {}, status: 404
    # end
  end

  def update
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
