json.extract! project, :id, :title, :slug, :language
json.description project.body
json.author project.author.username

show_files ||= false
  if show_files
  json.source_files project.source_files do |source_file|
    json.partial! '/api/source_files/source_file', source_file: source_file
  end
end
