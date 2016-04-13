json.extract! source_file, :id, :name, :author_id, :project_id, :slug, :language, :created_at
json.author source_file.author.username
json.project_slug source_file.project.slug
json.project_title source_file.project.title

hide_file_changes ||= false
unless hide_file_changes
  json.body source_file.body
  json.contributor_count source_file.contributor_count
end
