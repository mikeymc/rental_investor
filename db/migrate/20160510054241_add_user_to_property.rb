class AddUserToProperty < ActiveRecord::Migration
  def change
    add_reference :rental_properties, :user, index: true
  end
end
