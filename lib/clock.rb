require File.expand_path('../../config/boot',        __FILE__)
require File.expand_path('../../config/environment', __FILE__)
require 'clockwork'

include Clockwork

every(10.minutes, 'Running my reoccurring process...') do
  StockDataAggregator.new.aggregate
end
