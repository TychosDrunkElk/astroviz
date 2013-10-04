require 'continuous_array'
class HomeController < ApplicationController
  def index
    masses = [0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 8.3, 9.0, 9.5, 10.0, 12.0, 15.0, 20.0, 30.0, 50.0, 70.0, 100.0]
    @data = {}
    masses.each do |m|
      data = Isochrone.lifecycle(m)
      max_temp = data.map(&:temperature).max
      min_temp = data.map(&:temperature).min
      scaled_temps = data.map{|d| (d.temperature - min_temp)/(max_temp - min_temp)}
      temps = ContinuousArray.new(scaled_temps)
      r = (0..data.length-1).step(data.length/100.0)
      temp_set = temps.select_set(r)
      @data["sm-#{m}"] = {data: data, temps: temp_set}
    end
    # @data = Isochrone.lifecycle(1.7)
    # max_temp = @data.map(&:temperature).max
    # min_temp = @data.map(&:temperature).min
    # scaled_temps = @data.map{|d| (d.temperature - min_temp)/(max_temp - min_temp)}
    # temps = ContinuousArray.new(scaled_temps)
    # r = (0..@data.length-1).step(@data.length/100.0)
    # @temp_set = temps.select_set(r)
  end
end
