module Changeable
  extend ActiveSupport::Concern

  included do
    def body
      result = ''
      recent = self.text_changes.last
      if recent && recent[:body]
        result = recent[:body]
      end
      result
    end
  end
end
