const dogPics =[
"images\\dog1.jpg",
"images\\dog2.jpg",
"images\\dog3.jpg",
"images\\dog4s.jpg",
"images\\dog5.jpg",
"images\\dog6.jpg",
"images\\dog7.jpg",
"images\\dog8.jpg",
"images\\dog9.jpg",
"images\\dog10.jpg",
];


let dogData;
  // process the result data, that came back from the api
  // if successful, this is an array of JSON objects
const process = (data) => {
  // Storing in a global variable for access later
  dogData = data;
 
  // Iterate through the array, adding <option> to the <select>
  data.forEach((dog) => {

    let dogInfo =`<option>${dog.name}</option>`;
   
    // Add the dogInfo to the select list
    $("#dogList").append(dogInfo);
  });
};
// This issues the GET request
const getDogData = () => {
  $.ajax({
    type: "GET",
    url: "https://cit-doghouse-api.uc.r.appspot.com/api/v1/dogs/limit/10",
    dataType: "json",
    success: function (result, status, xhr) {
      process(result);
    },
    error: function (xhr, status, error) {
      alert(
        "Result: " +
          status +
          " " +
          error +
          " " +
          xhr.status +
          " " +
          xhr.statusText
      );
    },
  });
};

// setUp, establishes the controls needed
const setUp = () => {
  // add the select listbox
  let listBox = $("<fieldset><legend><i class='bi bi-hearts'></i>Choose a dog you want to visit:</legend><select id='dogList' name='doglist' Size=5></fieldset>");
  $(".lists").append(listBox);
  getDogData();
  // bind the click event to an anonymous function
  listBox.on("click", function () {

      // when click happens, get the index of the item selected
      let index = $("select[name='doglist'] option:selected").index();
      console.log("index is", index);

      let dogImg = document.createElement("img");
      dogImg.src = dogPics[index];
      let container0 = document.getElementById('dogImg');
      container0.replaceChildren();
      $("#dogImg").append(dogImg);

      // set the information in the popup
      let name = `My name is  <span class="name">${dogData[index].name}</span>`
      let container = document.getElementById('name');
      container.replaceChildren();

      $("#name").append(name);

      let breed = `<i class='bi bi-hearts'></i> I'm a (${dogData[index].gender}) <span class="breed">${dogData[index].breed}</span>.`
      let container1 = document.getElementById('breed');
      container1.replaceChildren();
      $("#breed").append(breed);

      let age = `<i class='bi bi-hearts'></i> I'm <span class="age">${dogData[index].age}</span> years old.` 
      let container2 = document.getElementById('age');
      container2.replaceChildren();
      $("#age").append (age);

      let treat = `<i class='bi bi-hearts'></i> My favorite treat is <span class="treat">${dogData[index].treat}</span>. <br><br>
      <span class="message">Want to play with me today?</span> <i class="bi bi-chat-heart"></i>`;
      let container3 = document.getElementById('treat');
      container3.replaceChildren();
      $("#treat").append(treat)
    

      // note the use of animation here, fade in
      $('.popup').fadeIn(300); 
  });

  
// establish the modal, register as a dialog with jQuery
  $(function () {
    $("#dialog").dialog();
  });
};

$(document).ready(setUp);