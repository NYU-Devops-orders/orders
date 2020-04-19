Feature: The order store service back-end
  As an Order Store Owner
  I need a RESTful catalog service
  So that I can keep track of all my orders

  Background:
    Given the following orders
      | Name           | product_id | product_name         | quantity | price | status   |
      | Jake           | 1          | protein bars         | 2        | 18.25 | received |
      | Dave           | 2          | airpods              | 1        | 199   | received |
      | Ally           | 3          | notebook             | 1        | 5.49  | shipped  |
      | Beth           | 4          | shirt                | 1        | 23.50 | received |

  Scenario: The server is running
    When I visit the "Home Page"
    Then I should see "Order RESTful Service" in the title
    And I should not see "404 Not Found"

  Scenario: List all orders
    When I visit the "Home Page"
    And I press the "list" order button
    Then I should see "protein bars" in the results
    And I should see "airpods" in the results
    And I should see "notebook" in the results
    And I should see "shirt" in the results
    Then I should see the message "Success"

  Scenario: List all shipped orders
    When I visit the "Home Page"
    And I select "shipped" in the "Status" field
    And I press the "search" order button
    Then I should see the message "Success"
    Then I should see "notebook" in the results

  Scenario: Create an order
    When I visit the "Home Page"
    And I set the "name" to "Jake"
    And I set the "product_id" to "1"
    And I set the "name" to "protein bars"
    And I set the "quantity" to "2"
    And I set the "price" to "18.25"
    And I select "received" in the "Status" field
    And I press the "Create" order button
    Then I should see the message "Success"

  Scenario: Update an order
    When I visit the "Home Page"
    And I set the "ID" to "1"
    And I press the "retrieve" order button
    Then I should see "protein bars" in the "name" field
    And I should see "2" in the "quantity" field
    When I set the "quantity" to "3"
    And I press the "update" order button
    Then I should see "3" in the "quantity" field
    Then I should see the message "Success"

  Scenario: Read an order
    When I visit the "Home Page"
    And I set the "ID" to "1"
    And I press the "retrieve" order button
    Then I should see "Jake" in the "Name" field
    Then I should see "1" in the "product_id" field
    Then I should see "protein bars" in the "name" field
    Then I should see "3" in the "quantity" field
    Then I should see "18.25" in the "price" field
    Then I should see "received" in the "status" field
    Then I should see the message "Success"

  Scenario: Delete an Order
    When I visit the "Home Page"
    And I set the "ID" to "4"
    And I press the "delete" order button
    Then I should see the message "Order Deleted!"

  Scenario: Cancel an Order
    When I visit the "Home Page"
    And I set the "ID" to "2"
    And I press the "cancel" order button
    Then I should see the message "Order Canceled!"
    Then I should see "canceled" in the "Status" field