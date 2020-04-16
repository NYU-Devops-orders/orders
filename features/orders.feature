Feature: The order service back-end
    As a customer
    I need a RESTful catalog service
    So that I can keep track of all my orders

Background:
    Given the following wishlists
        | name   | customer_email          |
        | A      | kunal@stern.nyu.edu     |
        | B      | prat@stern.nyu.edu      |
        | C      | kiril@stern.nyu.edu     |
        | D      | michelle@stern.nyu.edu  |
        | E      | pratyush@stern.nyu.edu  |
     
Scenario: The server is running
    When I visit the "Home Page"
    Then I should see "Order Demo RESTful Service" in the title
    And I should not see "404 Not Found"
