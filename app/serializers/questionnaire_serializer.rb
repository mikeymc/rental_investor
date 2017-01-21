class QuestionnaireSerializer < ActiveModel::Serializer
  attributes :reason_owner_is_selling,
             :is_all_work_permitted,
             :current_market_rent,
             :is_the_property_in_a_flood_zone,
             :are_there_any_covenants_or_caveats,
             :what_defects_or_imperfections_exist,
             :what_is_the_zoning,
             :what_fixtures_and_fittings_will_go_with_the_sale,
             :is_the_foundation_still_structurally_sound,
             :how_is_the_roof,
             :are_there_wiring_or_plumbing_issues,
             :is_there_nearby_retail_and_entertainment,
             :have_there_been_any_offers,
             :are_there_sealant_or_moisture_problems,
             :are_there_signs_of_covered_damage,
             :is_work_needed_in_the_short_term,
             :will_a_title_search_reveal_surprises,
             :does_the_property_match_what_is_on_the_title,
             :when_was_the_last_appraisal,
             :has_the_owner_previously_tried_to_sell,
             :how_motivated_is_the_seller,
             :has_another_buyer_failed_to_close_due_to_financing,
             :positive_attributes_of_the_property,
             :negative_attributes_of_the_property,
             :how_to_make_money_on_this_property,
             :who_set_the_price,
             :quality_of_finishes_and_fittings,
             :is_property_under_lease,
             :how_is_surrounding_property,
             :is_furniture_etc_included,
             :how_many_owners
end