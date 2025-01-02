@test1
Feature: Verify search functionality

  Scenario: Verify Search Returns Accurate Results
    Given Navigate to Bright Horizons home page
    When  Click on search icon from top right corner
    Then  Verify search field is visible on the page
    And   Type 'Employee Education in 2018: Strategies to Watch' into the search field
    And   Click on the Search button
    Then  Verify the first search result is 'Employee Education in 2018: Strategies to Watch'