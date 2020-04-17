$(function () {

    // ****************************************
    //  U T I L I T Y   F U N C T I O N S
    // ****************************************

    // Updates the form with data from the response
    function update_form_data(res) {
        $("#order_id").val(res._id);
        $("#order_name").val(res.name);
        $("#order_status").val(res.status);
        $("#order_products").val(res.products);
    }

    /// Clears all form fields
    function clear_form_data() {
        $("#order_name").val("");
        $("#order_status").val("");
        $("#order_products").val("");
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

        var name = $("#order_name").val();
        var status = $("#order_status").val();
        var products = $("#order_products").val();

        var data = {
            "name": name,
            "status": status,
            "products": products
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
        var name = $("#order_name").val();
        var status = $("#order_status").val();
        var products = $("#order_products").val();

        var data = {
            "name": name,
            "status": status,
            "products": products
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
    // Search for a order
    // ****************************************

    $("#search-btn").click(function () {

        var name = $("#order_name").val();
        var status = $("#order_status").val();
        var products = $("#order_products").val();

        var queryString = ""

        if (name) {
            queryString += 'name=' + name
        }
        if (status) {
            if (queryString.length > 0) {
                queryString += '&status=' + status
            } else {
                queryString += 'status=' + status
            }
        }
        if (products) {
            if (queryString.length > 0) {
                queryString += '&products=' + products
            } else {
                queryString += 'products=' + products
            }
        }

        var ajax = $.ajax({
            type: "GET",
            url: "/orders?" + queryString,
            contentType: "application/json",
            data: ''
        })

        ajax.done(function(res){
            //alert(res.toSource())
            $("#search_results").empty();
            $("#search_results").append('<table class="table-striped" cellpadding="10">');
            var header = '<tr>'
            header += '<th style="width:10%">ID</th>'
            header += '<th style="width:40%">Name</th>'
            header += '<th style="width:40%">status</th>'
            header += '<th style="width:10%">Products</th></tr>'
            $("#search_results").append(header);
            var firstorder = "";
            for(var i = 0; i < res.length; i++) {
                var order = res[i];
                var row = "<tr><td>"+order._id+"</td><td>"+order.name+"</td><td>"+order.status+"</td><td>"+order.products+"</td></tr>";
                $("#search_results").append(row);
                if (i == 0) {
                    firstorder = order;
                }
            }

            $("#search_results").append('</table>');

            // copy the first result to the form
            if (firstorder != "") {
                update_form_data(firstorder)
            }

            flash_message("Success")
        });

        ajax.fail(function(res){
            flash_message(res.responseJSON.message)
        });

    });

})