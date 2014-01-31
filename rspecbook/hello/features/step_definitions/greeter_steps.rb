# require '../greeter'

class Greeter
  def greet
    "Hello Cucumber!"
  end
end
Given(/^a greeter$/) do
  @greeter = Greeter.new
end

When(/^I send it the greet message$/) do
  @message = @greeter.greet
end

Then(/^I should see "(.*?)"$/) do |arg1|
  @message.should == "Hello Cucumber!"
end

