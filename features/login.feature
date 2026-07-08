Feature: Login functionality
  
  @smoke
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I login with valid credentials
    Then I should see the inventory page
 
  @negative
  Scenario: Login with invalid credentials
    Given I am on the login page
    When I login with invalid credentials
    Then I should see an error message
 
  Scenario: Login without credentials
    Given I am on the login page
    When I login without credentials
    Then I should see a required field validation
