$(function () {

    // ****************************************
    //  U T I L I T Y   F U N C T I O N S
    // ****************************************

    // Updates the form with data from the response
    function update_form_data(res) {
        $("#order_id").val(res._id);
        $("#name").val(res.name);
        $("#order_status").val(res.status);
        $("#order_product_id").val(res.products[0].product_id);
        $("#product_name").val(res.products[0].name);
        $("#order_quantity").val(res.products[0].quantity);
        $("#order_price").val(res.products[0].price);
    }

    /// Clears all form fields
    function clear_form_data() {
        $("#order_id").val("");
        $("#name").val("");
        $("#order_product_id").val("");
        $("#product_name").val("");
        $("#order_quantity").val("");
        $("#order_price").val("");
        $("#order_status").val("received");
    }

    // Updates the flash message area
    function flash_message(message) {
        $("#flash_message").empty();
        $("#flash_message").append(message);
    }

    // ****************************************
    // Create a order
    // ****************************************

    $("#create-btn").click(function () {
        var name = $("#name").val();
        var product_id = $("#order_product_id").val();
        var item_name = $("#product_name").val();
        var qty = $("#order_quantity").val();
        var price = $("#order_price").val();
        var order_status = $("#order_status").val();

        var data = {
            "name": name,
            "status": order_status,
            "products": [{
                "product_id": product_id,
                "name": item_name,
                "quantity": qty,
                "price": price
            }]
        };

        var ajax = $.ajax({
            type: "POST",
            url: "/orders",
            contentType: "application/json",
            data: JSON.stringify(data),
        });

        ajax.done(function(res){
            update_form_data(res)
            flash_message("Success")
        });

        ajax.fail(function(res){
            flash_message(res.responseJSON.message)
        });
    });


    // ****************************************
    // Update a order
    // ****************************************

    $("#update-btn").click(function () {
        var order_id = $("#order_id").val();
        if (order_id === "") {
            flash_message("Order ID is required to update!");
            return;
        }
        var name = $("#name").val();
        var product_id = $("#order_product_id").val();
        var item_name = $("#product_name").val();
        var qty = $("#order_quantity").val();
        var price = $("#order_price").val();
        var order_status = $("#order_status").val();

        var data = {
            "name": name,
            "status": order_status,
            "products": [{
                "product_id": product_id,
                "name": item_name,
                "quantity": qty,
                "price": price
            }]
        };

        var ajax = $.ajax({
                type: "PUT",
                url: "/orders/" + order_id,
                contentType: "application/json",
                data: JSON.stringify(data)
            })

        ajax.done(function(res){
            update_form_data(res)
            flash_message("Success")
        });

        ajax.fail(function(res){
            flash_message(res.responseJSON.message)
        });

    });

    // ****************************************
    // Retrieve a order
    // ****************************************

    $("#retrieve-btn").click(function () {

        var order_id = $("#order_id").val();

        var ajax = $.ajax({
            type: "GET",
            url: "/orders/" + order_id,
            contentType: "application/json",
            data: ''
        })

        ajax.done(function(res){
            //alert(res.toSource())
            update_form_data(res)
            flash_message("Success")
        });

        ajax.fail(function(res){
            clear_form_data()
            flash_message(res.responseJSON.message)
        });

    });

    // ****************************************
    // Delete a order
    // ****************************************

    $("#delete-btn").click(function () {

        var order_id = $("#order_id").val();

        var ajax = $.ajax({
            type: "DELETE",
            url: "/orders/" + order_id,
            contentType: "application/json",
            data: '',
        })

        ajax.done(function(res){
            clear_form_data()
            flash_message("order has been Deleted!")
        });

        ajax.fail(function(res){
            flash_message("Server error!")
        });
    });

    // ****************************************
    // Clear the form
    // ****************************************

    $("#clear-btn").click(function () {
        $("#order_id").val("");
        clear_form_data()
    });

    // ****************************************
    // Search for orders by status
    // ****************************************

    $("#search-btn").click(function() {
        var name = $("#name").val();
        var product_id = $("#order_product_id").val();
        var item_name = $("#product_name").val();
        var qty = $("#order_quantity").val();
        var price = $("#order_price").val();
        var order_status = $("#order_status").val();

        var query_params = {
            "name": name,
            "status": order_status,
            "products": [{
                "product_id": product_id,
                "name": item_name,
                "quantity": qty,
                "price": price
            }]
        };

        var ajax = $.ajax({
            type: "GET",
            url: "/orders?" + $.param(query_params),
            contentType: "application/json",
            data: ''
        });

        ajax.done(function(res) {
            $("#search_results").empty();
            $("#search_results").append('<table class="table-striped"> <thead><tr><th>Orders</th></tr>');
            var header = '<tr>'
            header += '<th style="width:10%">ID</th>';
            header += '<th style="width:20%">Name</th>';
            header += '<th style="width:20%">Product ID</th>';
            header += '<th style="width:20%">Product Name</th>';
            header += '<th style="width:13%">Quantity</th>';
            header += '<th style="width:10%">Price</th>';
            header += '<th style="width:10%">Status</th></tr>';
            $("#search_results").append(header);
            for (var i = 0; i < res.length; i++) {
                var order = res[i];
                var row = "<tr><td>" +
                    order.id + "</td><td>" +
                    order.name + "</td><td>" +
                    order.products[0].product_id + "</td><td>" +
                    order.products[0].name + "</td><td>" +
                    order.products[0].quantity + "</td><td>" +
                    order.products[0].price + "</td><td>" +
                    order.status + "</td></tr>";
                $("#search_results").append(row);
            }

            $("#search_results").append('</table>');

            flash_message("Success");
        });

        ajax.fail(function(res) {
            flash_message(res.responseJSON.message);
        });
    });
   
    // ****************************************
    // Cancel an order
    // ****************************************

    $("#cancel-btn").click(function() {
        var order_id = $("#order_id").val();

        var ajax = $.ajax({
            type: "PUT",
            url: "/orders/" + order_id + "/cancel",
            contentType: "application/json",
            data: '',
        })

        ajax.done(function(res) {
            update_form_data(res);
            flash_message("Order Canceled!");
        });

        ajax.fail(function(res) {
            clear_form_data();
            flash_message(res.responseJSON.message);
        });
    });
    // ****************************************
    // List all orders
    // ****************************************

    $("#list-btn").click(function() {
        var ajax = $.ajax({
            type: "GET",
            url: "/orders",
            contentType: "application/json",
            data: ''
        });

        ajax.done(function(res) {
            $("#search_results").empty();
            $("#search_results").append('<table class="table-striped"> <thead><tr><th>Orders</th></tr>');
            var header = '<tr>'
            header += '<th style="width:10%">ID</th>';
            header += '<th style="width:20%">Name</th>';
            header += '<th style="width:20%">Product ID</th>';
            header += '<th style="width:20%">Product Name</th>';
            header += '<th style="width:13%">Quantity</th>';
            header += '<th style="width:10%">Price</th>';
            header += '<th style="width:10%">Status</th></tr>';
            $("#search_results").append(header);
            for (var i = 0; i < res.length; i++) {
                var order = res[i];
                var row = "<tr><td>" +
                    order.id + "</td><td>" +
                    order.name + "</td><td>" +
                    order.products[0].product_id + "</td><td>" +
                    order.products[0].name + "</td><td>" +
                    order.products[0].quantity + "</td><td>" +
                    order.products[0].price + "</td><td>" +
                    order.status + "</td></tr>";
                $("#search_results").append(row);
            }

            $("#search_results").append('</table>');

            flash_message("Success");
        });

        ajax.fail(function(res) {
            flash_message(res.responseJSON.message);
        });
    });
})