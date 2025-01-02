@test2
Feature: Verify comments

  Scenario: Verify Comment Visibility
    Given Navigate to Bright Horizons home page
    When  Click on Find a Center option from top header
    Then  Verify that the newly opened page contains child-care-locator as a part of its URL
    When  Type 'New York' into search box and press Enter
    Then  verify if a number of found centers is the same as a number of centers displayed on the below list
    When  Click on the first center on the list
    Then  Verify if center name and address are the same on pop up