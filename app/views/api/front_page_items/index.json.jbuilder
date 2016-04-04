json.array! @front_page_items do |item|
	json.id item.id
	json.project_id item.project_id
	json.description item.description
	json.project item.project partial: 'api/projects/project', as: :project
end
