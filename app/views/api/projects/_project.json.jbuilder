json.extract! project, :id, :title, :slug, :language, :created_at, :author_id
json.author project.author.username

hide_changes ||= false
unless hide_changes
  json.description project.body
  json.contributor_count project.contributor_count
end

show_files ||= false
if show_files
json.source_files project.source_files do |source_file|
  json.partial! '/api/source_files/source_file', source_file: source_file, hide_file_changes: true
end
end
