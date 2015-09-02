require 'spec_helper'

module Codebreaker
  describe Game do
    let(:output) { double('output').as_null_object }
    let(:target) { described_class.new(output) }
    let(:secret) { '1234' }

    describe '#start' do
      subject { target.start(secret) }

      it 'sends a welcome message' do
        expect(output).to receive(:puts).with('Welcome to Codebreaker!')
        subject
      end

      it 'prompts for the first guess' do
        expect(output).to receive(:puts).with('Enter guess:')
        subject
      end
    end

    describe '#guess' do
      let(:guess) { '1234' }
      subject { target.guess(guess) }

      before :each do
        target.start(secret)
      end

      it 'sends the mark to output' do
        expect(output).to receive(:puts).with('++++')
        subject
      end
    end
  end
end
