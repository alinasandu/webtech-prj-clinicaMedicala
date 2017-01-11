/*global $*/

// READ recods on page load
$(document).ready(function () {
    readRecords(); // calling function
});

// READ records
function readRecords(){
    $.get("/appointments", {}, function (data, status) {
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
            + '<td class="doctor">'+ value.doctor +'</td>'
			+ '<td class="specialization">'+ value.specialization+ '</td>'
			+ '<td class="Investigation">'+ value.Investigation +'</td>'
			+ '<td class="email">'+ value.email +'</td>'
		    + '<td class="details">'+ value.details +'</td>'
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
    $('#doctor').val('');
    $('#specialization').val('');
    $('#Investigation').val('');
    $('#email').val('');
    $('#details').val('');
    
    $('#myModalLabel').html('Add New Appointment');
    $('#add_new_record_modal').modal('show');
}


//get one record
function viewRecord(id) {
    var url = "/appointments/" + id;
    
    $.get(url, {}, function (data, status) {
        //bind the values to the form fields
        $('#name').val(data.name);
         $('#doctor').val(data.doctor);
        $('#specialization').val(data.specialization);
        $('#Investigation').val(data.Investigation);
        $('#email').val(data.email);
        $('#details').val(data.details);
        
        $('#id').val(id);
        $('#myModalLabel').html('Edit Appointment');
        
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
        url: '/appointments/',
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
            $('#appointments').append(row);
        } 
    });
}

function updateRecord(formData) {
    $.ajax({
        url: '/appointments/'+formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#row_id_'+formData.id+'>td.name').html(formData.name);
            $('#row_id_'+formData.id+'>td.doctor').html(formData.doctor);
            $('#row_id_'+formData.id+'>td.specialization').html(formData.specialization);
            $('#row_id_'+formData.id+'>td.Investigation').html(formData.Investigation);
            $('#row_id_'+formData.id+'>td.email').html(formData.email);
            $('#row_id_'+formData.id+'>td.details').html(formData.details);
            $('#add_new_record_modal').modal('hide');
        } 
    });
}

//delete record
function deleteRecord(id) {
    $.ajax({
        url: '/appointments/'+id,
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