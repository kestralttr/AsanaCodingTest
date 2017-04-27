let tasks;
let taskItem;
let taskItemText;
let taskHideButton;
let project;
let projectName;
let projectID = "329693362346934";
let taskLink;


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

    }
  });
};

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

        taskItem = "<li class='task-item'>" + "</li>";
        $("#task-list").append(taskItem);

        taskHideButton = "<div class='task-hide-button'></div>";
        $(".task-item:last").append(taskHideButton);

        taskLink = "https://app.asana.com/0/" + projectID + "/" + task.id;

        taskItemText = "<a class='task-item-text' href=" + taskLink + ">" + task.name + "</a>";
        $(".task-item:last").append(taskItemText);

      });
    }
  });
};

getProjectName();
getTasks();
