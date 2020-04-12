# Orders 
[![Build Status](https://travis-ci.org/NYU-Devops-orders/orders.svg?branch=master)](https://travis-ci.org/NYU-Devops-orders/orders)
[![codecov](https://codecov.io/gh/NYU-Devops-orders/orders/branch/master/graph/badge.svg)](https://codecov.io/gh/NYU-Devops-orders/orders)

Orders Microservice for DevOps and Agile Methodologies Stern MBA Class

This repository contains sample code for customer orders for an e-commerce web site. This shows how to create a REST API with subordinate resources like orders that have products:
**Note:** The base service code is contained in `service.py` while the business logic for manipulating Orders is in the `models.py` file. This follows the popular Model View Controller (MVC) separation of duities by keeping the model separate from the controller. As such, we have two tests suites: one for the model (`test_orders.py`) and one for the serveice itself (`test_server.py`)

**Note:** This repo uses `python3` as opposed to past repos for this class which used `python2`

**Note:** This repo uses `pytest` as opposed to past repos for this class which used `nosetests`. Nosetests hasn't been updated in years and does not work well with `python3`. See below for instructions on running tests.

## Installation using Vagrant

The easiest way to use this repo is with Vagrant and VirtualBox. if you don't have this software the first step is down download and install it.

Download [VirtualBox](https://www.virtualbox.org/)

Download [Vagrant](https://www.vagrantup.com/)

Then all you have to do is clone this repo and invoke vagrant:

    git clone https://github.com/devopsorders/orders.git
    cd orders
    vagrant up
    vagrant ssh
    cd /vagrant

You can now run `pytest` to run the tests. As developers we always want to run the tests before we change any code so that we know if we brike the code or perhaps someone before us did? Always run the test cases first!

## Manually running the Tests

Run the tests using `pytest`

    $ pytest

pytest is configured via the included `pytest.ini` file to automatically include the flags `--with-spec --spec-color` so that red-green-refactor is meaningful. If you are in a command shell that supports colors, passing tests will be green while failing tests will be red.

pytest is also configured to automatically run the `coverage` tool and you should see a percentage of coverage report at the end of your tests. If you want to see what lines of code were not tested use:

    $ coverage report -m

This is particularly useful because it reports the line numbers for the code that is not covered so that you can write more test cases to get higher code coverage.
    $ exit
    $ vagrant halt

If the VM is no longer needed you can remove it with:

    $ vagrant destroy


## What's featured in the project?

    * service/service.py -- the main Service using Python Flask
    * service/models.py -- the data model using SQLAlchemy
    * tests/test_server.py -- test cases against the service
    * tests/test_models.py -- test cases against the Order model
    
    #### API calls
URL | Operation | Description
-- | -- | --
`GET /orders` | READ | List all available routes
`POST /orders` | CREATE | Create new order
`GET /orders/:id` | READ | Fetch information for particular order
`PUT /orders/:id` | UPDATE | Update particular order
`DELETE /orders/:id` | DELETE | Delete particular order
`GET /orders/products/:product_id` | READ | Fetch orders for given product
`PUT /orders/:id/cancel` | PUT | Cancel order for given order id
`GET /orders/customers/:customer_id` | GET | Fetch orders for a given customer


The test cases have 95% test coverage and can be run with nosetests
