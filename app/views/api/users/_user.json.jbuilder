json.id user.id
json.username user.username
json.score user.score

show_session ||= false
if show_session
  json.session_token = user.session_token
end
