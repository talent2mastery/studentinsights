require 'rails_helper'

RSpec.describe PrecomputedQueryDoc do
  describe '.authorized_students_digest' do
    it 'hashes a list of ids as a set down into a consistent space' do
      expect(PrecomputedQueryDoc.authorized_students_digest([2,1])).to eq '17f8af97ad4a7f7639a4c9171d5185cbafb85462877a4746c21bdb0a4f940ca0'
      expect(PrecomputedQueryDoc.authorized_students_digest([1,2])).to eq '17f8af97ad4a7f7639a4c9171d5185cbafb85462877a4746c21bdb0a4f940ca0'
      expect(PrecomputedQueryDoc.authorized_students_digest([1,2,7])).to eq '8e2e5906844adcae6ce8cea8ad8abacc85d08e77b04a2c847f4387350b375a80'
    end
  end

  describe '.precomputed_student_hashes_key' do
    it 'works for default' do
      key = PrecomputedQueryDoc.precomputed_student_hashes_key([1,2,7])
      expect(key).to eq 'continuous_for_student_ids:3:8e2e5906844adcae6ce8cea8ad8abacc85d08e77b04a2c847f4387350b375a80'
    end

    it 'works for force_deprecated_key' do
      expect(PrecomputedQueryDoc.precomputed_student_hashes_key([1,2,7], {
        time_now: TestPals.new.time_now,
        force_deprecated_key: true
      })).to eq 'precomputed_student_hashes_1520899200_1,2,7'
    end

    it 'works for force_deprecated_day_based_key' do
      expect(PrecomputedQueryDoc.precomputed_student_hashes_key([1,2,7], {
        time_now: TestPals.new.time_now,
        force_deprecated_day_based_key: true
      })).to eq 'short:1520899200:3:8e2e5906844adcae6ce8cea8ad8abacc85d08e77b04a2c847f4387350b375a80'
    end
  end
end
