//jshint esversion:6
var allItems = [];

function newItem() {

  var description = document.getElementById("description").value;
  if (description != "") {
    var date = document.getElementById("deadline").value;
    var storageLength = sessionStorage.length;
    var items = {
      description,
      date
    };
    sessionStorage.setItem("item" + storageLength, JSON.stringify(items));
    setList();
    displayItems();
    clearValue();
  }
}

function setList() {
  allItems = [];
  var todayDate = new Date();
  for (var i = 0; i < sessionStorage.length; i++) {
    var item = JSON.parse(sessionStorage.getItem('item' + i));
    var itemDate = new Date(item.date);

    if (isNaN(itemDate.getTime())) {
      var tempo = {
        key: i,
        description: item.description,
        allMinutes: Infinity
      };
      allItems.push(tempo);
    } else {
      var data = new DateMeasure(itemDate - todayDate);
      // console.log("Days: " + data.days + " Hours: " + data.hours + " Minutes: " + data.minutes);
      var alltime = (data.days * 1440) + (data.hours * 60) + data.minutes;
      var temp = {
        key: i,
        description: item.description,
        days: data.days,
        hours: data.hours,
        minutes: data.minutes,
        allMinutes: alltime
      };
      allItems.push(temp);
    }
  }
}

function displayItems() {
  if (!allItems.length) {
    setList();
  }
  if (document.getElementById(0) != 'undefined' && document.getElementById(0) != null) {
    for (var g = 0; g < allItems.length; g++) {
      var object = document.getElementById(g).remove();
    }
  }
  for (var x = 0; x < allItems.length; x++) {
    var t, h;
    if (allItems[x].allMinutes < 0) {
      h = document.createElement("h4");
      h.setAttribute("id", x);
      t = document.createTextNode(allItems[x].description + " " + "0 d. 0 h. 0 min. ");
      h.appendChild(t);
      document.body.appendChild(h);
    } else if (allItems[x].allMinutes === Infinity) {
      h = document.createElement("h4");
      h.setAttribute("id", x);
      t = document.createTextNode(allItems[x].description);
      h.appendChild(t);
      document.body.appendChild(h);
    } else {
      h = document.createElement("h4");
      h.setAttribute("id", x);
      t = document.createTextNode(allItems[x].description + " " + allItems[x].days + "d. " + allItems[x].hours + "h. " + allItems[x].minutes + "min. ");
      h.appendChild(t);
      document.body.appendChild(h);
    }
  }
}

function sortdid() {
  if (!allItems.length) {
    setList();
  }
  allItems.sort((a, b) => {
    if (a.allMinutes > b.allMinutes) {
      return 1;
    } else {
      return -1;
    }
  });
  displayItems();
}

function sortmaz() {
  allItems.sort((a, b) => {
    if (a.allMinutes < b.allMinutes) {
      return 1;
    } else {
      return -1;
    }
  });
  displayItems();
}

function clearValue() {
  document.getElementById("description").value = '';
  document.getElementById("deadline").value = '';
}

function DateMeasure(ms) {
  var d, h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  this.days = d;
  this.hours = h;
  this.minutes = m;
  this.seconds = s;
}
