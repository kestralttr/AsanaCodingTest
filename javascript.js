let tasks;
let taskItem;
let taskItemText;
let taskHideButton;
let showAllButton;
let project;
let projectName;
let projectID = "329693362346934";
let taskLink;
let lastTaskItem;

// AJAX request to receive name of Project from API via ProjectID
const getProjectName = function() {
  $.ajax({
    type: "GET",
    url: "https://app.asana.com/api/1.0/projects/329693362346934",
    headers: {
      "Authorization": "Bearer 0/1696f4026aa7f671ef57fd9e29026244"
    },
    crossDomain: true,
    dataType: 'json',
    success: function(result) {

      project = result;
      projectName = project.data.name;

      $("#project-title").html(projectName);
      $("#project-title").removeClass("loading");

    }
  });
};

// AJAX request to receive task data in JSON format
const getTasks = function() {
  $.ajax({
    type: "GET",
    url: "https://app.asana.com/api/1.0/projects/329693362346934/tasks",
    headers: {
      "Authorization": "Bearer 0/1696f4026aa7f671ef57fd9e29026244"
    },
    crossDomain: true,
    dataType: 'json',
    success: function(result) {

      tasks = result;
      tasks.data.forEach(function(task,idx) {

        //jQuery used to build out tasks as list items
        taskItem = "<li class='task-item'>" + "</li>";
        $("#task-list").append(taskItem);

        lastTaskItem = $(".task-item:last");

        taskHideButton = "<div class='task-hide-button'></div>";
        $(".task-item:last").append(taskHideButton);

        taskLink = "https://app.asana.com/0/" + projectID + "/" + task.id;

        taskItemText = "<a class='task-item-text' href=" + taskLink + ">" + task.name + "</a>";
        $(".task-item:last").append(taskItemText);

      });

      // Show All button added to allow for retrieval of hidden tasks
      taskItem = "<li class='task-item show-all-button-container'>" + "</li>";
      $("#task-list").append(taskItem);

      showAllButton = "<div id='show-all-button'>Show All</div>";
      $(".task-item:last").append(showAllButton);

      // Sets display to none for task list item when button is clicked
      let taskButtonClick = function() {
        $(".task-hide-button").click(function() {
          $(this).parent().css("display","none");
        });
      };

      // Resets all task list item display values to 'block' on click
      let showButtonClick = function() {
        $("#show-all-button").click(function() {
          $(".task-item").css('display','block');
        });
      };

      taskButtonClick();
      showButtonClick();

    },
    error: function(error) {
      // Shows an error message if AJAX request fails
      taskItem = "<li class='task-item error-message'>" + "Error: " + error.responseJSON.errors[0].message + "</li>";
      $("#task-list").append(taskItem);
    }
  });
};

getProjectName();
getTasks();
