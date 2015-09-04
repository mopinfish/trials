require 'spec_helper'

module Codebreaker
  describe Marker do
    let(:secret) { '1234' }
    let(:target) { described_class.new(secret, guess) }

    describe '#exact_match_count' do
      subject { target.exact_match_count }

      context 'with no matches' do
        let(:guess) { '5555' }
        it 'returns 0' do
          expect(subject).to eq 0
        end
      end

      context 'with 1 exact match' do
        let(:guess) { '1555' }
        it 'returns 1' do
          expect(subject).to eq 1
        end
      end

      context 'with 1 number match' do
        let(:guess) { '2555' }
        it 'returns 0' do
          expect(subject).to eq 0
        end
      end

      context 'with 1 exact match and 1 number match' do
        let(:guess) { '1525' }
        it 'returns 1' do
          expect(subject).to eq 1
        end
      end
    end

    describe '#number_match_count' do
      subject { target.number_match_count }

      context 'with no matches' do
        let(:guess) { '5555' }
        it 'returns 0' do
          expect(subject).to eq 0
        end
      end

      context 'with 1 number match' do
        let(:guess) { '2555' }
        it 'returns 1' do
          expect(subject).to eq 1
        end
      end

      context 'with 1 exact match' do
        let(:guess) { '1555' }
        it 'returns 0' do
          expect(subject).to eq 0
        end
      end

      context 'with 1 exact match and 1 number match' do
        let(:guess) { '1525' }
        it 'returns 1' do
          expect(subject).to eq 1
        end
      end

      context 'with 1 exact match duplicated in guess' do
        let(:guess) { '1155' }
        it 'return 0' do
          expect(subject).to eq 0
        end
      end
    end
  end
end
