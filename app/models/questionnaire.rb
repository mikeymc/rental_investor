class Questionnaire < ActiveRecord::Base
  belongs_to :rental_property

  alias_attribute :reasonOwnerIsSelling, :reason_owner_is_selling
  alias_attribute :currentMarketRent, :current_market_rent
  alias_attribute :isAllWorkPermitted, :is_all_work_permitted
  alias_attribute :isThePropertyInAFloodZone, :is_the_property_in_a_flood_zone
  alias_attribute :areThereAnyCovenantsOrCaveats, :are_there_any_covenants_or_caveats
  alias_attribute :whatDefectsOrImperfectionsExist, :what_defects_or_imperfections_exist
  alias_attribute :whatIsTheZoning, :what_is_the_zoning
  alias_attribute :whatFixturesAndFittingsWillGoWithTheSale, :what_fixtures_and_fittings_will_go_with_the_sale
  alias_attribute :isTheFoundationStillStructurallySound, :is_the_foundation_still_structurally_sound
  alias_attribute :howIsTheRoof, :how_is_the_roof
  alias_attribute :areThereWiringOrPlumbingIssues, :are_there_wiring_or_plumbing_issues
  alias_attribute :isThereNearbyRetailAndEntertainment, :is_there_nearby_retail_and_entertainment
  alias_attribute :haveThereBeenAnyOffers, :have_there_been_any_offers
  alias_attribute :areThereSealantOrMoistureProblems, :are_there_sealant_or_moisture_problems
  alias_attribute :areThereSignsOfCoveredDamage, :are_there_signs_of_covered_damage
  alias_attribute :isWorkNeededInTheShortTerm, :is_work_needed_in_the_short_term
  alias_attribute :willATitleSearchRevealSurprises, :will_a_title_search_reveal_surprises
  alias_attribute :doesThePropertyMatchWhatIsOnTheTitle, :does_the_property_match_what_is_on_the_title
  alias_attribute :whenWasTheLastAppraisal, :when_was_the_last_appraisal
  alias_attribute :hasTheOwnerPreviouslyTriedToSell, :has_the_owner_previously_tried_to_sell
  alias_attribute :howMotivatedIsTheSeller, :how_motivated_is_the_seller
  alias_attribute :hasAnotherBuyerFailedToCloseDueToFinancing, :has_another_buyer_failed_to_close_due_to_financing
  alias_attribute :positiveAttributesOfTheProperty, :positive_attributes_of_the_property
  alias_attribute :negativeAttributesOfTheProperty, :negative_attributes_of_the_property
  alias_attribute :howToMakeMoneyOnThisProperty, :how_to_make_money_on_this_property
  alias_attribute :whoSetThePrice, :who_set_the_price
  alias_attribute :qualityOfFinishesAndFittings, :quality_of_finishes_and_fittings
  alias_attribute :isPropertyUnderLease, :is_property_under_lease
  alias_attribute :howIsSurroundingProperty, :how_is_surrounding_property
  alias_attribute :isFurnitureEtcIncluded, :is_furniture_etc_included
  alias_attribute :howManyOwners, :how_many_owners
end
