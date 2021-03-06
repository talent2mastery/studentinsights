# Stateful, only current value from latest export.
class EducatorSectionAssignment < ApplicationRecord
  belongs_to :educator
  belongs_to :section

  validates :educator_id, presence: true
  validates :section_id, presence: true
end
