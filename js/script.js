var songs = [{name: "Fuyunohanashi", artist:"given", length:"3:30", imgUrl:"https://vignette.wikia.nocookie.net/given/images/e/e2/Winter_Story_Given.jpg/revision/latest/scale-to-width-down/340?cb=20190905165508", linkUrl:"https://www.youtube.com/watch?v=qnSziXvNJTQ"}, {name:"Lionhearted", artist:"Porter Robinson", length:"4:26", imgUrl:"https://upload.wikimedia.org/wikipedia/en/b/bb/PorterRobinsonLionheartedSingle.jpeg", linkUrl:"https://www.youtube.com/watch?v=hgKDu5pp_fU"}, {name:"veil", artist:"須田景凪", length:"3:38", imgUrl:"https://st.cdjapan.co.jp/pictures/l/08/08/WPCL-13090.jpg", linkUrl:"https://www.youtube.com/watch?v=n7VZxg9pxkg"}, {name:"Get your Wish", artist:"Porter Robinson", length:"3:38",imgUrl:"https://media.pitchfork.com/photos/5e3491ed0e7e92000921e0f4/1:1/w_500/Porter-Robinson.jpg", linkUrl:"https://www.youtube.com/watch?v=4SZEDBFPpgw"}];
$(".information").hide();
if (typeof(Storage) !== "undefined") {
  if (localStorage.userSongs) {
    songs = JSON.parse(localStorage.getItem("userSongs") || "[]");
  } else {
    localStorage.setItem("userSongs", JSON.stringify(songs))
  }
} else {
  // Sorry! No Web Storage support..
}




$(document).ready(function() {
  $(".expand").text(">");
  display();
  
  $(".add").click(function() {
    var songName = $(".nameInput").val();
    var artistName = $(".artistInput").val();
    var lengthIn = $(".lengthInput").val();
    var imgUrlIn = $(".imgUrlInput").val();
    var linkUrlIn = $(".linkUrlInput").val();

    var inputs = [songName, artistName, lengthIn, imgUrlIn, linkUrlIn];
    var invalid = 0;

    inputs.forEach(function(input) {
      if (input == "" || input == " ") {
        invalid += 1;
      }
    })

    if (invalid < 1) {
      songs.push({name:songName, artist:artistName, length: lengthIn, imgUrl:imgUrlIn, linkUrl:linkUrlIn});
    }

    console.log(songs);
    display();
    invalid = 0;
  });

  $(".shuffle").click(function() {
    songs = shuffle(songs);
    display();
  }); 

  $(".expand").click(function() {
    $(".information").toggle("slide");

    if ($(".expand").text() == ">") {
      $(".expand").text("<");
    } else {
      $(".expand").text(">");
    }
  })
});

function display() {
  localStorage.setItem("userSongs", JSON.stringify(songs));
  $(".column").empty();
  songs.forEach(function(song) {
    $("#imgUrl").append("<div><img src='"+song["imgUrl"]+"'></div>");
    $("#name").append("<p>"+song["name"]+"</p>");
    $("#artist").append("<p>"+song["artist"]+"</p>");
    $("#length").append("<p>"+song["length"]+"</p>");
    $("#linkUrl").append("<a href='"+song["linkUrl"]+"' target='blank'>Listen</a>");
    $("#delete").append("<div><button class='delButton' value='"+ song.name +"'>X</button></div>");
  });
  $(".playlistLength").text(songs.length);
  $(".delButton").click(function() {
    console.log("delete");
    var result = songs.find(obj => {
      return obj.name === $(this).val();
    })
    console.log(result);
    songs.splice(songs.indexOf(result), 1);
    display();
  });
}

function shuffle(array) {
  var current = array.length, tempVal, random;

  while (0 !== current) {
    random = Math.floor(Math.random() * current);
    current -= 1;

    tempVal = array[current];
    array[current] = array[random];
    array[random] = tempVal;
  }

  return array;
}

