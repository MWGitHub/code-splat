json.extract! source_file, :id, :name, :author_id, :project_id, :slug, :language, :created_at
json.body source_file.body
json.author source_file.author.username
json.project_slug source_file.project.slug
json.contributor_count source_file.contributor_count
