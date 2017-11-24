Feature: User journey search automation
  As a customer
  I should be able to search a journey
  depending on my preferences

  Scenario: Journey search through the Home page
    Given I am a customer on the Homepage
    When I have the following search preferences
    When From: Any London To: Turkey, Any
    When Days to Departure: > 200 days
    When Duration: I don't mind
    When Room 1: 2 Adults, 1 Child, 1 Infant
    When I search using the above preferences 
    Then The search results page displays results