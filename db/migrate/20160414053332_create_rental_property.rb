class CreateRentalProperty < ActiveRecord::Migration
  def change
    create_table :rental_properties do |t|
      t.string :street
      t.string :city
      t.string :state
      t.string :zip_code
    end
  end
end
