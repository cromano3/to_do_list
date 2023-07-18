function getItems(){
  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=239',
    dataType: 'json',
    success: function (response, textStatus) {

      console.log(response);
      
      $('#contentList').empty();

      response.tasks.forEach(function(task){
        var taskHTML = `<div class="listItem"><p>${task.content}</p></div>`;
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

$(document).ready(function () {

  getItems();
  setAddItemEvent();
  
});