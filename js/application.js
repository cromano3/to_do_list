var currentFilter = ""; 

function getItems(){
  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=239',
    dataType: 'json',
    success: function (response, textStatus) {

      console.log(response);
      
      $('#contentList').empty();

      response.tasks.forEach(function(task){
        if((task.completed && currentFilter === "complete") ||
          (!task.completed && currentFilter === "active") ||
          (currentFilter === "all") ||
          (!currentFilter)
        ){
          var taskHTML = `<div class="listItem">
          <input type="checkbox" class="checkbox" data-id="${task.id}" ${task.completed ? "checked" : ""}>
          <p>${task.content}</p>
          <button class="btn btn-light btn-sm remove" data-id="${task.id}">Remove</button>
          </div>`
          $('#contentList').append(taskHTML);
        }
        
      });

      var completedTasksCount = response.tasks.reduce(function(count, task) {
        return task.completed ? count : count + 1;
      }, 0);
      
      $("#itemsLeft").text(completedTasksCount);

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
      getItems();
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
      getItems();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
      getItems();
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
      getItems();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
      getItems();
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

    $('#new-to-do-input').val('');

    sendNewItem(newItem);

  });

}

function setToggleCompletedEvent(){
  $(document).on('click', '.checkbox', function (event) {
    var id = $(this).data('id');
    if ($(this).is(':checked')) {
      setItemCompleted(id);
    } else {
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

function setFilters(){

  $('.filterButton').on('click', function () {

    $('.filterButton').removeClass('active-filter');
    $(this).addClass('active-filter');

    var filter = $(this).attr('id');

    if (filter === 'allFilter') {
      currentFilter = "all";
    } else if (filter === 'activeFilter') {
      currentFilter = "active";
    } else if (filter === 'completeFilter') {
      currentFilter = "complete";
    }

    getItems();

  });

}

$(document).ready(function () {

  getItems();
  setAddItemEvent();
  setToggleCompletedEvent();
  setDeleteEvent();
  setFilters();
  
});