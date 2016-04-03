class AddFragmentEndToExplanation < ActiveRecord::Migration
  def change
    add_column :explanations, :fragment_end, :integer
    Explanation.find_each do |explanation|
      explanation.fragment_end = 0
      explanation.save!
    end
    change_column :explanations, :fragment_end, :integer, null: false
  end
end
