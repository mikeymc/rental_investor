angular.module('rentals').controller('QuestionnaireController', function($scope, $stateParams, property_repository, $timeout) {
  $scope.persistence_state = 'Save';

  property_repository.find($stateParams.rental_id).then(function(response) {
    $scope.rental_property = response.data;
  }, function() {
    $state.go('404');
  });

  $scope.save = function() {
    property_repository.update($stateParams.rental_id, $scope.rental_property).then(function(response) {
      $scope.rental_property = response.data;
      displaySavedFlag();
    });
  };

  $scope.$watch('rental_property', function() {
    if(!$scope.rental_property) {
      return;
    }

    $scope.questions = [
      {
        prompt: 'Why do the owners want to sell?',
        name: 'reason-owner-is-selling',
        field: 'reason_owner_is_selling'
      },
      {
        prompt: 'What is the current market rent for this type of property?',
        name: 'current-market-rent',
        field: 'current_market_rent'
      },
      {
        prompt: 'What major projects are happening in the area?',
        name: 'major-projects-in-the-area',
        field: 'major_projects_in_the_area'
      },
      {
        prompt: 'Has all work done on the property been permitted?',
        name: 'is-all-work-permitted',
        field: 'is_all_work_permitted'
      },
      {
        prompt: 'Who is the major employer in the area? Are they likely to upsize or downsize?',
        name: 'major-employer-in-the-area',
        field: 'major_employer_in_the_area'
      },
      {
        prompt: 'Does the local industry have expected wage growth?',
        name: 'does-area-expect-wage-growth',
        field: 'does_area_expect_wage_growth'
      },
      {
        prompt: 'Would tenants pay more for air conditioning?',
        name: 'would-tenants-pay-more-for-air-conditioning',
        field: 'would_tenants_pay_more_for_air_conditioning'
      },
      {
        prompt: 'Would tenants pay more for a pool?',
        name: 'would-tenants-pay-more-for-a-pool',
        field: 'would_tenants_pay_more_for_a_pool'
      },
      {
        prompt: 'Is the property in a known flood zone?',
        name: 'is-the-property-in-a-flood-zone',
        field: 'is_the_property_in_a_flood_zone'
      },
      {
        prompt: 'Are there any covenants, caveats or any regulatory impositions on the property?',
        name: 'are-there-any-covenants-or-caveats',
        field: 'are_there_any_covenants_or_caveats'
      },
      {
        prompt: 'What defects or imperfections exist?',
        name: 'what-defects-or-imperfections-exist',
        field: 'what_defects_or_imperfections_exist'
      },
      {
        prompt: 'What is the zoning of the property? What is the potential for this zoning to change?',
        name: 'what-is-the-zoning',
        field: 'what_is_the_zoning'
      },
      {
        prompt: 'What fixtures and fittings are part of the purchase and what aren’t?',
        name: 'what-fixtures-and-fittings-will-go-with-the-sale',
        field: 'what_fixtures_and_fittings_will_go_with_the_sale'
      },
      {
        prompt: 'Is the foundation still structurally sound?',
        name: 'is-the-foundation-still-structurally-sound',
        field: 'is_the_foundation_still_structurally_sound'
      },
      {
        prompt: 'How old is the roof and what condition is it in?',
        name: 'how-is-the-roof',
        field: 'how_is_the_roof'
      },
      {
        prompt: 'Are there known wiring or plumbing issues?',
        name: 'are-there-wiring-or-plumbing-issues',
        field: 'are_there_wiring_or_plumbing_issues'
      },
      {
        prompt: 'Is the property near major shopping centres, cafes, restaurants and so on?',
        name: 'is-there-nearby-retail-and-entertainment',
        field: 'is_there_nearby_retail_and_entertainment'
      },
      {
        prompt: 'Have there been any offers?',
        name: 'have-there-been-any-offers',
        field: 'have_there_been_any_offers'
      },
      {
        prompt: 'Does the property have any known sealant or moisture problems?',
        name: 'are-there-sealant-or-moisture-problems',
        field: 'are_there_sealant_or_moisture_problems'
      },
      {
        prompt: 'Are there signs of internal or external damage that has been covered over?',
        name: 'are-there-signs-of-covered-damage',
        field: 'are_there_signs_of_covered_damage'
      },
      {
        prompt: 'Is there potential work that may need doing in the short to medium term?',
        name: 'is-work-needed-in-the-short-term',
        field: 'is_work_needed_in_the_short_term'
      },
      {
        prompt: 'Will a title search reveal something that will affect the purchase?',
        name: 'will-a-title-search-reveal-surprises',
        field: 'will_a_title_search_reveal_surprises'
      },
      {
        prompt: 'Do the actual physical property and the dwellings on it match what is delineated on the Certificate of Title?',
        name: 'does-the-property-match-what-is-on-the-title',
        field: 'does_the_property_match_what_is_on_the_title'
      },
      {
        prompt: 'When was the last appraisal?',
        name: 'when-was-the-last-appraisal',
        field: 'when_was_the_last_appraisal'
      },
      {
        prompt: 'Has the owner previously tried to sell the property?',
        name: 'has-the-owner-previously-tried-to-sell',
        field: 'has_the_owner_previously_tried_to_sell'
      },
      {
        prompt: 'How motivated is the seller?',
        name: 'how-motivated-is-the-seller',
        field: 'how_motivated_is_the_seller'
      },
      {
        prompt: 'Has another buyer failed to close due to financing?',
        name: 'has-another-buyer-failed-to-close-due-to-financing',
        field: 'has_another_buyer_failed_to_close_due_to_financing'
      },
      {
        prompt: 'What are the positive attributes of the property?',
        name: 'positive-attributes-of-the-property',
        field: 'positive_attributes_of_the_property'
      },
      {
        prompt: 'What are the negative attributes of the property?',
        name: 'negative-attributes-of-the-property',
        field: 'negative_attributes_of_the_property'
      },
      {
        prompt: 'How can money be made off this property?',
        name: 'how-to-make-money-on-this-property',
        field: 'how_to_make_money_on_this_property'
      },
      {
        prompt: 'Who set the price, the seller or the agent?',
        name: 'who-set-the-price',
        field: 'who_set_the_price'
      },
      {
        prompt: 'What is the quality of the finishes and fittings?',
        name: 'quality-of-finishes-and-fittings',
        field: 'quality_of_finishes_and_fittings'
      },
      {
        prompt: 'Is the property under lease?',
        name: 'is-property-under-lease',
        field: 'is_property_under_lease'
      },
      {
        prompt: 'What is the surrounding property like?',
        name: 'how-is-surrounding-property',
        field: 'how_is_surrounding_property'
      },
      {
        prompt: 'Is any furniture etc being sold with the property?',
        name: 'is-furniture-etc-included',
        field: 'is_furniture_etc_included'
      },
      {
        prompt: 'How many owners has the property had since it was built?',
        name: 'how-many-owners',
        field: 'how_many_owners'
      }
    ];
  });

  /* --- Private --- */

  function displaySavedFlag() {
    toggleSaved(true);
    $timeout(function() {
      toggleSaved(false);
    }, 3000);
  }

  function toggleSaved(flag) {
    if (flag) {
      $scope.persistence_state = 'Saved!';
    } else {
      $scope.persistence_state = 'Save';
    }
    $timeout(function() {
      $scope.$apply();
    }, 0);
  }
});
