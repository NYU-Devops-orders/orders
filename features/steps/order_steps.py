"""
Order Steps
Steps file for orders.feature
"""
import json
import time
from os import getenv

import requests
from behave import given, when, then
from compare import expect, ensure
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait

WAIT_SECONDS = 20
BASE_URL = getenv('BASE_URL', 'http://localhost:5000')


@given(u'the following orders')
def step_impl(context):
    """ Delete all Orders and load new ones """
    headers = {'Content-Type': 'application/json'}
    # TODO fix resetting
    # right now removing orders screws up the auto increment count, so can't select by ID later in behave scenarios
    # context.resp = requests.delete(context.base_url + '/orders/reset')
    # expect(context.resp.status_code).to_equal(204)
    create_url = context.base_url + '/orders'
    for row in context.table:
        data = {
            "name": row['name'],
            "status": row['status'],
            "products": [{
                "product_id": row['product_id'],
                "product_name": row['product_name'],
                "quantity": row['quantity'],
                "price": row['price']
            }]
        }
        payload = json.dumps(data)
        context.resp = requests.post(create_url, data=payload, headers=headers)
        expect(context.resp.status_code).to_equal(201)


@when(u'I visit the "Home Page"')
def step_impl(context):
    """ Make a call to the base URL """
    context.driver.get(context.base_url)


@then(u'I should see "{message}" in the title')
def step_impl(context, message):
    """ Check the document title for a message """
    expect(context.driver.title).to_contain(message)


@then(u'I should not see "{message}"')
def step_impl(context, message):
    error_msg = "I should not see '%s' in '%s'" % (message, context.resp.text)
    ensure(message in context.resp.text, False, error_msg)


@when('I set the "{element_name}" to "{text_string}"')
def step_impl(context, element_name, text_string):
    element_id = 'order_' + element_name.lower()
    element = context.driver.find_element_by_id(element_id)
    element.clear()
    element.send_keys(text_string)


@then(u'I should see the message "{message}"')
def step_impl(context, message):
    found = WebDriverWait(context.driver, WAIT_SECONDS).until(
        expected_conditions.text_to_be_present_in_element(
            (By.ID, 'flash_message'),
            message
        )
    )
    expect(found).to_be(True)


@then(u'I should see "{text_string}" in the "{element_name}" field')
def step_impl(context, text_string, element_name):
    element_id = 'order_' + element_name.lower()
    found = WebDriverWait(context.driver, WAIT_SECONDS).until(
        expected_conditions.text_to_be_present_in_element_value(
            (By.ID, element_id),
            text_string
        )
    )
    expect(found).to_be(True)


@when('I select "{message}" in the "{element_name}" field')
def step_impl(context, message, element_name):
    element_id = 'order_' + element_name.lower()
    element = Select(context.driver.find_element_by_id(element_id))
    element.select_by_value(message)


##################################################################
# This code works because of the following naming convention:
# The buttons have an id in the html hat is the button text
# in lowercase followed by '-btn' so the Clear button has an id of
# id='clear-btn'. That allows us to lowercase the name and add '-btn'
# to get the element id of any button
##################################################################
@when(u'I press the "{button}" order button')
def step_impl(context, button):
    button_id = button.lower() + '-btn'

    if button == "retrieve":
        time.sleep(6)
        element = context.driver.find_element_by_id('order_id').text

        found = WebDriverWait(context.driver, WAIT_SECONDS).until(
            expected_conditions.text_to_be_present_in_element(
                (By.ID, 'order_id'), element
            )
        )
        expect(found).to_be(True)
        context.driver.find_element_by_id(button_id).click()
    else:
        context.driver.find_element_by_id(button_id).click()


@then('I should see "{name}" in the results')
def step_impl(context, name):
    found = WebDriverWait(context.driver, WAIT_SECONDS).until(
        expected_conditions.text_to_be_present_in_element(
            (By.ID, 'search_results'),
            name
        )
    )
    expect(found).to_be(True)