class CreateIsochrones < ActiveRecord::Migration
  def up
    create_table :isochrones do |t|
      t.float :mass
      t.float :radius
      t.float :temperature
      t.float :age
      t.float :log_L_Lo
      t.timestamps
    end
  end

  def down
    drop_table :isochrones
  end
end
