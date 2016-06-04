class AddQuestionnaire < ActiveRecord::Migration
  def change
    create_table :questionnaires do |t|
      t.text :reason_owner_is_selling
      t.text :is_all_work_permitted
      t.text :current_market_rent
      t.text :major_projects_in_the_area
      t.text :major_employer_in_the_area
      t.text :does_area_expect_wage_growth
      t.text :would_tenants_pay_more_for_air_conditioning
      t.text :would_tenants_pay_more_for_a_pool
      t.text :is_the_property_in_a_flood_zone
      t.text :are_there_any_covenants_or_caveats
      t.text :what_defects_or_imperfections_exist
      t.text :what_is_the_zoning
      t.text :what_fixtures_and_fittings_will_go_with_the_sale
      t.text :is_the_foundation_still_structurally_sound
      t.text :how_is_the_roof
      t.text :are_there_wiring_or_plumbing_issues
      t.text :is_there_nearby_retail_and_entertainment
      t.text :have_there_been_any_offers
      t.text :are_there_sealant_or_moisture_problems
      t.text :are_there_signs_of_covered_damage
      t.text :is_work_needed_in_the_short_term
      t.text :will_a_title_search_reveal_surprises
      t.text :does_the_property_match_what_is_on_the_title
      t.text :when_was_the_last_appraisal
      t.text :has_the_owner_previously_tried_to_sell
      t.text :how_motivated_is_the_seller
      t.text :has_another_buyer_failed_to_close_due_to_financing
      t.text :positive_attributes_of_the_property
      t.text :negative_attributes_of_the_property
      t.text :how_to_make_money_on_this_property
      t.text :who_set_the_price
      t.text :quality_of_finishes_and_fittings
      t.text :is_property_under_lease
      t.text :how_is_surrounding_property
      t.text :is_furniture_etc_included
      t.text :how_many_owners
    end
    add_reference :questionnaires, :rental_property, index: true
  end
end
