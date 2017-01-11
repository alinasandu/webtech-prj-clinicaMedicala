/*global $*/

// READ recods on page load
$(document).ready(function () {
    readRecords(); // calling function
});

// READ records
function readRecords(){
    $.get("/doctors", {}, function (data, status) {
        data.forEach(function(value){
            var row= '<tr id="row_id_'+ value.id +'">'
                         + displayColumns(value)
                         + '</tr>';
            $('#doctors').append(row);
        });
    });
}

function displayColumns(value) {
    return 	'<td>'+value.id+'</td>'
            + '<td class="name">'+value.name+'</td>'
			+ '<td class="specialization">'+ value.specialization+ '</td>'
			+ '<td class="price">'+ value.price +'</td>'
			+ '<td class="note">'+ value.note +'</td>'
		    + '<td class="opinions">'+ value.opinions +'</td>'
			+ '<td align="center">'
			+	'<button onclick="viewRecord('+ value.id +')" class="btn btn-edit">Update</button>'
			+ '</td>'
			+ '<td align="center">'
			+	'<button onclick="deleteRecord('+ value.id +')" class="btn btn-danger">Exclude</button>'
			+ '</td>';
}

//show the modal window
function addRecord() {
    $('#id').val('');
    $('#name').val('');
    $('#specialization').val('');
    $('#price').val('');
    $('#note').val('');
    $('#opinions').val('');
    
    $('#myModalLabel').html('Add New Doctor');
    $('#add_new_record_modal').modal('show');
}


//get one record
function viewRecord(id) {
    var url = "/doctors/" + id;
    
    $.get(url, {}, function (data, status) {
        //bind the values to the form fields
        $('#name').val(data.name);
        $('#specialization').val(data.specialization);
        $('#price').val(data.price);
        $('#note').val(data.note);
        $('#opinions').val(data.opinions);
        
        $('#id').val(id);
        $('#myModalLabel').html('Edit Doctor');
        
        $('#add_new_record_modal').modal('show');
    });
}


//create and update records
function saveRecord() {
    var formData = $('#record_form').serializeObject();
    if(formData.id) {
        updateRecord(formData);
    } else {
        createRecord(formData);
    }
}


function createRecord(formData) {
    $.ajax({
        url: '/doctors/',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#add_new_record_modal').modal('hide');
            
            var row = '<tr id="row_id_'+ data.id +'">'
            			+ displayColumns(data)
        				+ '</tr>';
            $('#doctors').append(row);
        } 
    });
}

function updateRecord(formData) {
    $.ajax({
        url: '/doctors/'+formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#row_id_'+formData.id+'>td.name').html(formData.name);
            $('#row_id_'+formData.id+'>td.specialization').html(formData.specialization);
            $('#row_id_'+formData.id+'>td.price').html(formData.price);
            $('#row_id_'+formData.id+'>td.note').html(formData.note);
            $('#row_id_'+formData.id+'>td.opinions').html(formData.opinions);
            $('#add_new_record_modal').modal('hide');
        } 
    });
}

//delete record
function deleteRecord(id) {
    $.ajax({
        url: '/doctors/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}

//extending jQuery with a serializeObject method so that form values can be retrieved as JSON objects
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};