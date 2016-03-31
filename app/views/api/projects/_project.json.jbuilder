json.extract! project, :title, :slug
json.source_files project.source_files do |source_file|
  json.partial! '/api/source_files/source_file', source_file: source_file
end
json.description project.body
