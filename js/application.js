function getItems(){
  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=239',
    dataType: 'json',
    success: function (response, textStatus) {

      console.log(response);
      
      $('#contentList').empty();

      response.tasks.forEach(function(task){
        var taskHTML = `<div class="listItem">
        <ion-checkbox label-placement="start" checked=${task.completed}></ion-checkbox>
        <p>${task.content}</p>
        <button class="btn btn-light btn-sm remove" data-id="${task.id}">Remove</button>
        </div>`
        $('#contentList').append(taskHTML);
      });


    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

function sendNewItem(newItem){
  $.ajax({
    type: 'POST',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=239',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: newItem
      }
    }),
    success: function (response, textStatus) {
      console.log(response);
      getItems();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

function deleteItem(id){
  $.ajax({
    type: "DELETE",
    url: `https://fewd-todolist-api.onrender.com/tasks/${id}?api_key=239`,
    success: function (response, textStatus) {
      console.log(response);
      // getItems();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
      getItems();
    }
  });
}

function setItemCompleted(id){
  $.ajax({
    type: 'PUT',
    url: `https://fewd-todolist-api.onrender.com/tasks/${id}/mark_complete?api_key=239`,
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      // getItems();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  }); 

}

function setItemIncomplete(id){
  $.ajax({
    type: 'PUT',
    url: `https://fewd-todolist-api.onrender.com/tasks/${id}/mark_active?api_key=239`,
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      // getItems();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  }); 

}

function setAddItemEvent(){

  $('#addButton').on('click', function (event) {
    var newItem = $('#new-to-do-input').val();

    if (newItem === '') {
      alert("Please enter a task.");
      return;
    }

    $('#new-to-do-input input').val('');

    sendNewItem(newItem);

  });

}

function setToggleCompletedEvent(){
  $(document).on('click', 'ion-checkbox', function (event) {
    var id = $(this).data('id');
    if ($(this).checked()) {
      setItemCompleted(id);
    }
    else{
      setItemIncomplete(id);
    }
    
  });
}

function setDeleteEvent(){
  $(document).on('click', '.btn.remove', function (event) {
    var id = $(this).data('id'); 
    $(this).closest('.listItem').remove();
    deleteItem(id);
  });
}

$(document).ready(function () {

  getItems();
  setAddItemEvent();
  setToggleCompletedEvent();
  setDeleteEvent();
  
});