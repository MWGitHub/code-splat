require 'rails_helper'

RSpec.describe Explanation, type: :model do
  it "should not allow overlapping explanations" do
    explanation = Explanation.first
    
    expect do
      Explanation.create!(
        source_file_id: explanation.source_file_id,
        fragment: explanation.fragment,
        fragment_start: explanation.fragment_start,
        fragment_end: explanation.fragment_end
      )
    end.to raise_error
  end
end
