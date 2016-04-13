require_relative './seed_texts.rb'

class ProgramSeeds
	def self.generate
		user = User.find_by(username: 'demo')


    project = user.projects.create(
			title: 'Empty Project',
		)
		project.text_changes.create(
			author_id: user.id,
			body: 'An initially empty project, anything goes!'
		)
		project.front_page_items.create(
			description: 'An empty project, put anything you want here!'
		)


    project = user.projects.create(
			title: 'CSS Styles',
		)
		project.text_changes.create(
			author_id: user.id,
			body: 'CSS styles to achieve certain effects.'
		)
		project.front_page_items.create(
			description: 'CSS styles to achieve certain effects.'
		)
    file = project.source_files.create(
      name: 'modal.css',
      language: 'css',
      author_id: user.id
    )
    file.text_changes.create(
      author_id: user.id,
      body: SeedTexts::CSS_MODAL
    )
    file = project.source_files.create(
      name: 'tooltip.css',
      language: 'css',
      author_id: user.id
    )
    file.text_changes.create(
      author_id: user.id,
      body: SeedTexts::CSS_TOOLTIP
    )


    project = user.projects.create(
			title: 'Code Splat',
		)
		project.text_changes.create(
			author_id: user.id,
			body: 'Some of the code used in this site.'
		)
		project.front_page_items.create(
			description: 'Read code for the site.'
		)
    file = project.source_files.create(
      name: 'home.jsx',
      language: 'jsx',
      author_id: user.id
    )
    file.text_changes.create(
      author_id: user.id,
      body: SeedTexts::CS_HOME
    )
    file = project.source_files.create(
      name: 'project.rb',
      language: 'ruby',
      author_id: user.id
    )
    file.text_changes.create(
      author_id: user.id,
      body: SeedTexts::CS_PROJECT
    )


		project = user.projects.create(
			title: 'Simple Data Structures',
		)
		project.text_changes.create(
			author_id: user.id,
			body: 'Data structures implemented in basic ways without optimizations.'
		)
		project.front_page_items.create(
			description: 'Read code for data structures in basic implementations.'
		)
    file = project.source_files.create(
      name: 'binarysearch.scm',
      language: 'scheme',
      author_id: user.id
    )
    file.text_changes.create(
      author_id: user.id,
      body: SeedTexts::DS_BINARY_TREE
    )
    file = project.source_files.create(
      name: 'linkedlist.rs',
      language: 'rust',
      author_id: user.id
    )
    file.text_changes.create(
      author_id: user.id,
      body: SeedTexts::DS_LINKED_LIST
    )


		project = user.projects.create(
			title: 'Simple Sorting',
			language: 'ruby'
		)
		project.text_changes.create(
			author_id: user.id,
			body: 'Sorting algorithms implemented without optimizations in mind.'
		)
		project.front_page_items.create(
			description: 'Numerous sorting algorithms shown with explanations. No optimizations added in order to show the basic algorithms.'
		)
		file = project.source_files.create(
			name: 'merge_sort.rb',
			language: 'ruby',
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
		file = project.source_files.create(
			name: 'bubble_sort.rb',
			language: 'ruby',
			author_id: user.id
		)
		file.text_changes.create(
			author_id: user.id,
			body: <<-BODY
def bubble_sort(array)
	arr = [].concat(array)
	loop do
		swapped = false

		(arr.length - 1).times do |i|
			if arr[i] > arr[i + 1]
				arr[i], arr[i + 1] = arr[i + 1], arr[i]
				swapped = true
			end
		end

		break unless swapped
	end

	arr
end
			BODY
		)
	end
end
