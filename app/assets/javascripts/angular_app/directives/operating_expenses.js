angular.module('rentals').directive('operatingExpenses', function(operating_expenses_service) {
  return {
    templateUrl: 'investment_properties_pages/operating_expenses.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.expenses = [
          {
            label: 'Repairs and Maintenance',
            percentage: operating_expenses_service.repairs_and_maintenance_percentage($scope.rental_property),
            monthly_cost: $scope.rental_property.operating_expenses_assumption.repairs_and_maintenance,
            yearly_costs: operating_expenses_service.projected_annual_maintenance_costs($scope.rental_property)
          },
          {
            label: 'Property Management Fees',
            percentage: $scope.rental_property.operating_expenses_assumption.property_management_fees,
            monthly_cost: operating_expenses_service.monthly_property_management_fee($scope.rental_property),
            yearly_costs: operating_expenses_service.annual_property_management_fees($scope.rental_property)
          },
          {
            label: 'Taxes',
            percentage: operating_expenses_service.monthly_taxes_percentage($scope.rental_property),
            monthly_cost: $scope.rental_property.operating_expenses_assumption.taxes,
            yearly_costs: operating_expenses_service.annual_taxes($scope.rental_property)
          },
          {
            label: 'Insurance',
            percentage: operating_expenses_service.monthly_insurance_percentage($scope.rental_property),
            monthly_cost: $scope.rental_property.operating_expenses_assumption.insurance,
            yearly_costs: operating_expenses_service.annual_insurance($scope.rental_property)
          },
          {
            label: 'Salaries and Wages',
            percentage: operating_expenses_service.monthly_salaries_and_wages_percentage($scope.rental_property),
            monthly_cost: $scope.rental_property.operating_expenses_assumption.salaries_and_wages,
            yearly_costs: operating_expenses_service.annual_salaries_and_wages($scope.rental_property)
          },
          {
            label: 'Utilities',
            percentage: operating_expenses_service.monthly_utilities_percentage($scope.rental_property),
            monthly_cost: $scope.rental_property.operating_expenses_assumption.utilities,
            yearly_costs: operating_expenses_service.annual_utilities($scope.rental_property)
          },
          {
            label: 'Water and Sewer',
            percentage: operating_expenses_service.monthly_water_and_sewer_percentage($scope.rental_property),
            monthly_cost: $scope.rental_property.operating_expenses_assumption.water_and_sewer,
            yearly_costs: operating_expenses_service.annual_water_and_sewer_costs($scope.rental_property)
          },
          {
            label: 'Trash Removal',
            percentage: operating_expenses_service.monthly_trash_removal_percentage($scope.rental_property),
            monthly_cost: $scope.rental_property.operating_expenses_assumption.trash_removal,
            yearly_costs: operating_expenses_service.annual_trash_removal_costs($scope.rental_property)
          },
          {
            label: 'Professional Fees',
            percentage: operating_expenses_service.monthly_professional_fees_percentage($scope.rental_property),
            monthly_cost: $scope.rental_property.operating_expenses_assumption.professional_fees,
            yearly_costs: operating_expenses_service.annual_professional_fees_costs($scope.rental_property)
          },
          {
            label: 'Advertising',
            percentage: operating_expenses_service.monthly_advertising_fees_percentage($scope.rental_property),
            monthly_cost: $scope.rental_property.operating_expenses_assumption.advertising,
            yearly_costs: operating_expenses_service.annual_advertising_fees($scope.rental_property)
          },
          {
            label: 'Landscaping',
            percentage: operating_expenses_service.monthly_landscaping_fees_percentage($scope.rental_property),
            monthly_cost: $scope.rental_property.operating_expenses_assumption.landscaping,
            yearly_costs: operating_expenses_service.annual_landscaping_fees($scope.rental_property)
          },
          {
            label: 'CapEx',
            percentage: $scope.rental_property.operating_expenses_assumption.capex,
            monthly_cost: operating_expenses_service.monthly_capex_cost($scope.rental_property),
            yearly_costs: operating_expenses_service.annual_capex_cost($scope.rental_property)
          },
          {
            label: 'Other',
            percentage: operating_expenses_service.monthly_other_expenses_percentage($scope.rental_property),
            monthly_cost: $scope.rental_property.operating_expenses_assumption.other_expenses,
            yearly_costs: operating_expenses_service.annual_other_operating_expenses($scope.rental_property)
          },
          {
            label: 'Total Operating Expenses',
            percentage: operating_expenses_service.total_monthly_expenses_percentage($scope.rental_property),
            monthly_cost: operating_expenses_service.total_operating_expenses($scope.rental_property),
            yearly_costs: operating_expenses_service.total_annual_operating_expenses_projections($scope.rental_property)
          }
        ];

      }, true);
    }
  }
});
