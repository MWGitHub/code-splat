json.array! @projects do |project|
  json.partial! 'project', project: project, hide_changes: true
end
