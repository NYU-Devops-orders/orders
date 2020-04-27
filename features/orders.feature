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

Scenario: Read a Order
    When I visit the "Home Page"
    And I set the "Name" to "Jake"
    And I press the "Search" button
    Then I should see "Jake" in the results
    When I copy the "ID" field
    And I paste the "ID" field
    And I press the "Retrieve" button
    Then I should see the message "Success!"

  Scenario: Create an order
    When I visit the "Home Page"
    And I set the "Name" to "Kiril"
    And I set the "product_id" to "15"
    And I set the "name" to "Hair Dye"
    And I set the "quantity" to "7"
    And I set the "price" to "4.99"
    And I select "RECEIVED" in the "Status" dropdown
    And I press the "Create" button
    Then I should see the message "Success"

Scenario: Cancel a Order
    When I visit the "Home Page"
    And I set the "Name" to "Jake"
    And I press the "Search" button
    Then I should see "Jake" in the results
    When I copy the "ID" field
    And I paste the "ID" field
    And I press the "Cancel" button
    And I paste the "ID" field
    And I press the "Retrieve" button
    Then I should see "CANCELED" in the "Status" dropdown

  Scenario: Delete an Order
    When I visit the "Home Page"
    And I set the "Name" to "Jake"
    And I press the "Search" button
    Then I should see "Jake" in the results
    When I copy the "ID" field
    And I paste the "ID" field
    And I press the "Delete" button
    Then I should see the message "order has been Deleted!"
    
  Scenario: Update an order
    When I visit the "Home Page"
    And I set the "Name" to "Jake"
    And I press the "Search" button
    Then I should see "Jake" in the results
    When I copy the "ID" field
    And I paste the "ID" field
    And I press the "Retrieve" button
    Then I should see "1" in the "product_id" field
    And I should see "2" in the "quantity" field
    When I set the "quantity" to "3"
    And I press the "update" button
    Then I should see "3" in the "quantity" field
    Then I should see the message "Success"