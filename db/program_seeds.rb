class ProgramSeeds
	def self.generate
		user = User.find_by(username: 'demo')

		project = user.projects.create(
			title: 'Simple Sorting',
		)
		project.text_changes.create(
			author_id: user.id,
			body: 'Sorting algorithms implemented without optimizations in mind.'
		)
		project.front_page_items.create(
			description: 'Numerous sorting algorithms shown in an easy to understand way. No optimizations added in order to show the basic algorithms.'
		)
		file = project.source_files.create(
			name: 'merge_sort.rb',
			author_id: user.id
		)
		file.text_changes.create(
			author_id: user.id,
			body: <<-BODY
def merge_sort(arr)
	return arr if count < 2

	middle = count / 2

	left, right = arr.take(middle), arr.drop(middle)
	sorted_left, sorted_right = merge_sort(left), merge_sort(right)

	merge(sorted_left, sorted_right)
end

def merge(left, right)
	merged_array = []
	until left.empty? || right.empty?
		merged_array <<
			((left.first < right.first) ? left.shift : right.shift)
	end

	merged_array + left + right
end
			BODY
		)

		project = user.projects.create(
			title: 'Simple Data Structures',
		)
		project.text_changes.create(
			author_id: user.id,
			body: 'Data structures implemented in the simplest ways without optimizations.'
		)
		project.front_page_items.create(
			description: 'Read code for data structures in the most basic implementations.'
		)
	end
end
