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

let hideTaskItem = function(el) {
  el.style.display = "none";
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

        lastTaskItem = $(".task-item:last");
        console.log(lastTaskItem);

        taskHideButton = "<div class='task-hide-button'></div>";
        $(".task-item:last").append(taskHideButton);

        taskLink = "https://app.asana.com/0/" + projectID + "/" + task.id;

        taskItemText = "<a class='task-item-text' href=" + taskLink + ">" + task.name + "</a>";
        $(".task-item:last").append(taskItemText);

      });

      taskItem = "<li class='task-item show-all-button-container'>" + "</li>";
      $("#task-list").append(taskItem);

      showAllButton = "<div id='show-all-button'>Show All</div>";
      $(".task-item:last").append(showAllButton);

      let taskButtonClick = function() {
        $(".task-hide-button").click(function() {
          console.log(this);
          $(this).parent().css("display","none");
        });
      };

      let showButtonClick = function() {
        $("#show-all-button").click(function() {
          $(".task-item").css('display','block');
        });
      };

      taskButtonClick();
      showButtonClick();

    }
  });
};

getProjectName();
getTasks();
