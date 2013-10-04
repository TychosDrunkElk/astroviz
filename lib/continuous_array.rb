class ContinuousArray
  attr_accessor :array
  def initialize(array)
    @array = array
  end

  def [](index)
    low_i = index.floor
    high_i = index.ceil
    if (low_i == high_i)
      return array[index]
    else
      return array[low_i] + (array[high_i] - array[low_i])*(index % 1)
    end
  end

  def select_set(selectors)
    vals = []
    selectors.each {|i| vals << self[i]}
    return vals
  end
end