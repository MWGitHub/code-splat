json.array! @text_changes do |text_change|
  json.partial! 'text_change', text_change: text_change
end
