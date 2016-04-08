json.array! @front_page_items do |item|
	json.extract! item, :id, :project_id, :description, :created_at
	json.project item.project partial: 'api/projects/project', as: :project
end
