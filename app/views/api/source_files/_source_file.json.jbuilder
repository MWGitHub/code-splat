json.extract! source_file, :id, :name, :author_id, :project_id, :slug, :language
json.body source_file.body
json.author source_file.author.username
