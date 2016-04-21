json.meta do
  json.total_pages @projects.total_pages
  json.page @projects.current_page
	json.total_count @projects.total_count
end

json.search_results do
  json.array! @projects do |project|
    json.partial! 'project', project: project, hide_changes: true
  end
end
