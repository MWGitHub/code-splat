json.meta do
  json.total_pages @search_results.total_pages
  json.query params[:query]
  json.page @search_results.current_page
	json.total_count @search_results.total_count
end

json.search_results do
  json.array! @search_results.map(&:searchable) do |search_result|
    case search_result
    when User
      json.partial! "api/users/user", user: search_result
    when Project
      json.partial! "api/projects/project", project: search_result
		when SourceFile
			json.partial! "api/source_files/source_file", source_file: search_result
    end
    json._type search_result.class.to_s
  end
end
