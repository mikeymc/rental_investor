class OperatingExpensesAssumption < ActiveRecord::Base
  belongs_to :rental_property

  alias_attribute :vacancyRate, :vacancy_rate
  alias_attribute :repairsAndMaintenance, :repairs_and_maintenance
  alias_attribute :propertyManagementFees, :property_management_fees
  alias_attribute :salariesAndWages, :salaries_and_wages
  alias_attribute :waterAndSewer, :water_and_sewer
  alias_attribute :trashRemoval, :trash_removal
  alias_attribute :professionalFees, :professional_fees
  alias_attribute :otherExpenses, :other_expenses
  alias_attribute :equipmentDepreciation, :equipment_depreciation
  alias_attribute :incomeTaxRate, :income_tax_rate
end
