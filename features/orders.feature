Feature: The order store service back-end
  As an Order Store Owner
  I need a RESTful catalog service
  So that I can keep track of all my orders

  Background:
    Given the following orders
      | name           | product_id | product_name         | quantity | price | status   | 
      | Jake           | 1          | protein bars         | 2        | 18.25 | shipped  | 
      | Dave           | 2          | airpods              | 1        | 199   | received | 
      | Ally           | 3          | notebook             | 1        | 5.49  | shipped  | 
      | Beth           | 4          | shirt                | 1        | 23.50 | received | 

  Scenario: The server is running
    When I visit the "Home Page"
    Then I should see "Order RESTful Service" in the title
    And I should not see "404 Not Found"

  Scenario: List all orders
    When I visit the "Home Page"
    And I press the "List" button
    Then I should see "protein bars" in the results
    And I should see "airpods" in the results
    And I should see "notebook" in the results
    And I should see "shirt" in the results
    Then I should see the message "Success" 


  Scenario: Query a Order
    When I visit the "Home Page"
    And I select "SHIPPED" in the "Status" dropdown
    And I set the "Name" to "Jake"
    And I press the "Search" button
    Then I should see "Jake" in the results
    And I should see "protein bars" in the results
    Then I should see the message "Success"