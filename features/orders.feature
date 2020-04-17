Feature: The order service back-end
    As a customer
    I need a RESTful catalog service
    So that I can keep track of all my orders

Background:
    Given the following wishlists
        | name   | order_id|
        | A      | 1       |
        | B      | 2       |
        | C      | 3       |
        | D      | 4       |
        | E      | 5       |
     
Scenario: The server is running
    When I visit the "Home Page"
    Then I should see "Order Demo RESTful Service" in the title
    And I should not see "404 Not Found"
