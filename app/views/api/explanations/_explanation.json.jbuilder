json.extract!(
	explanation,
	:id,
	:fragment,
	:fragment_start,
	:fragment,
	:fragment_end,
	:source_file_id
)
json.body explanation.body
json.contributor_count explanation.contributor_count
