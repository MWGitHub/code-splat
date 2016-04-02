json.array! @explanations do |explanation|
  json.partial! 'explanation', explanation: explanation
end
