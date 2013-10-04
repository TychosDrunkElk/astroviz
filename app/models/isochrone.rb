class Isochrone < ActiveRecord::Base
  validates_uniqueness_of :mass, :scope => [:age]

  def self.lifecycle(initial_mass)
    select([:mass, :radius, :age, :temperature]).where(mass: initial_mass)
  end
end
