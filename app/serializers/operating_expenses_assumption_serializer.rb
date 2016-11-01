class OperatingExpensesAssumptionSerializer < ActiveModel::Serializer
  attributes :vacancy_rate,
             :repairs_and_maintenance,
             :property_management_fees,
             :taxes,
             :insurance,
             :salaries_and_wages,
             :utilities,
             :water_and_sewer,
             :trash_removal,
             :professional_fees,
             :advertising,
             :landscaping,
             :capex,
             :other_expenses,
             :equipment_depreciation,
             :income_tax_rate
end