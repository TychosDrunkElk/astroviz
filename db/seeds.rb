# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'csv'

SIGMA = 5.67040 * 10**-5 # erg * cm^−2 * s^−1 * K^−4
LNAUGHT = 3.842 * 10**33 # erg * s^−1

def parse_filename(name)
  data = name.split('/').last[2..6].to_f/100

  {:mass => data}
end

def luminosity(log_L)
 10**(log_L)
end

def effective_T(log_Teff)
  10**(log_Teff)/5777
end

def stellar_radius(lum, t_eff)
  Math.sqrt(lum)*((1/t_eff)**2)
end

files = Dir.glob('db/fixtures/z0/*')

files.each do |f|
  file_data = parse_filename(f)
  CSV.foreach(f, :headers=>true, :col_sep => " ") do |row|
    dat = row.to_hash
    lum = luminosity(dat["logL"].to_f)
    t_eff = effective_T(dat["logTef"].to_f)

    iso = Isochrone.new
    iso.mass = file_data[:mass]
    iso.radius = stellar_radius(lum, t_eff)
    iso.temperature = t_eff
    iso.age = dat["#age/yr"]
    iso.log_L_Lo = dat["logL"]
    iso.save!
  end
end
