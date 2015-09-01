class RSpecGreeter
  def greet
    "Hello RSpec!"
  end
end

describe "RSpec Greeeter" do
  it "should say 'Hello Rspec!' where it receives the greet() message" do
    greeter = RSpecGreeter.new
    greeting = greeter.greet
    expect(greeting).to eq "Hello RSpec!"
  end
end
