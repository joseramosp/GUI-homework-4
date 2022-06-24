function validate (form) {
    $("#form").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            "min_multiplier": {
                required: true
            },
            max_multiplier: "required",
            min_multiplicand: "required",
            max_multiplicand: "required",
        },
        // Specify validation error messages
        messages: {
            min_multiplier: "Please enter a minimum multiplier.",
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        // submitHandler: function(form) {
        //     form.submit();
        // }
        success: function(form) {
            $("#min_multiplier-error.error").hide();
            $("#max_multiplier-error.error").hide();
            $("#min_multiplicand-error.error").hide();
            $("#max_multiplicand-error.error").hide();
            createTable(form);
        }
    });
    $("#form").valid();
}

function numberRange (start, end) {
    return new Array(end - start + 1).fill().map((d, i) => i + start);
}

function createTable (form) {

    var minMultiplier = Number(document.getElementById("min_multiplier").value);
    var maxMultiplier = Number(document.getElementById("max_multiplier").value);
    var multipliers = numberRange(minMultiplier, maxMultiplier);

    var minMultiplicand = Number(document.getElementById("min_multiplicand").value);
    var maxMultiplicand = Number(document.getElementById("max_multiplicand").value);
    var multiplicands = numberRange(minMultiplicand, maxMultiplicand)

    var $tabs = $("#tabs").tabs();
    var selected = $tabs.tabs('option', 'active');

    var table = document.getElementById("table-" + selected);
    table.innerHTML = "";
    var row;
    var cell;

    row = table.insertRow();
    cell = row.insertCell();
    cell.setAttribute("class", "table-header top-header empty-cell");
    for(var i=0; i < multipliers.length; i++) {
        cell = row.insertCell();
        cell.innerHTML = multipliers[i];
        cell.setAttribute("class", "table-header top-header");
    }

    for(var i=0; i < multiplicands.length; i++) {
        row = table.insertRow();
        for(var j=0; j < multipliers.length; j++) {
            if (j === 0) {
                cell = row.insertCell();
                cell.innerHTML = multiplicands[i];
                cell.setAttribute("class", "table-header left-header");
            }
            cell = row.insertCell();
            cell.innerHTML = multiplicands[i] * multipliers[j];
        }
    }
}

$("#min-multiplier-slider").slider({
    min:-100,
    max:100,
    slide: function(event, ui) {
        $("#min_multiplier").val(ui.value);
    }
});
$("#max-multiplier-slider").slider({
    min:-100,
    max:100,
    slide: function(event, ui) {
        $("#max_multiplier").val(ui.value);
    }
});
$("#min-multiplicand-slider").slider({
    min:-100,
    max:100,
    slide: function(event, ui) {
        $("#min_multiplicand").val(ui.value);
    }
});

$("#max-multiplicand-slider").slider({
    min:-100,
    max:100,
    slide: function(event, ui) {
        $("#max_multiplicand").val(ui.value);
    }
});

$(function() {
    $("#tabs").tabs();
    $(".ui-closable-tab").live( "click", function() {
        var tabContainerDiv=$(this).closest(".ui-tabs").attr("id");
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        $("#"+tabContainerDiv).tabs("refresh");
        var tabCount=$("#"+tabContainerDiv).find(".ui-closable-tab").length;
        if (tabCount<1) {
            $("#"+tabContainerDiv).hide();
        }
    });
});
