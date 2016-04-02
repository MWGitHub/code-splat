json.array! @replies do |reply|
  json.partial! 'reply', reply: reply
end
