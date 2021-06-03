
var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  mode: "python",
  theme: "dracula",
  lineNumbers: true,
  autoCloseTags: true,
  autoCloseBrackets: true,
});

var firebaseConfig = {
  apiKey: "AIzaSyCxTHYADPh8vbN4cYw9YMB4tvvi_d7VXmg",
  authDomain: "codelabs-4373c.firebaseapp.com",
  projectId: "codelabs-4373c",
  storageBucket: "codelabs-4373c.appspot.com",
  messagingSenderId: "835368477952",
  appId: "1:835368477952:web:f0a339b55b5dc460bdffe5",
  measurementId: "G-9KHLDL9H2H"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

function gotoLogin() {
  window.location.href = "/";
}

function setHome() {
  let d = document.getElementById('name');
  let u = sessionStorage.getItem('user');
  u = JSON.parse(u);
  d.innerHTML =  u.displayName;
}

function logOut() {
  var callBack = (e) => {
    gotoLogin();
  };
  sessionStorage.clear();
  firebase.auth().signOut().finally(callBack);
}

function checkUser() {
  var callBack = (user) => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      setHome();
    } else {
      gotoLogin();
    }
  };
  firebase.auth().onAuthStateChanged(callBack);
}

window.onload = function() {
  checkUser();
}
function push()
{
  var qt=document.getElementById('title').value;
  var cat=document.getElementById("cat").value;
  var des=document.getElementById('desc').value;
  var t=document.getElementById('tag').value;
  var u = sessionStorage.getItem('user');
  u=JSON.parse(u);
  console.log(u);
  var id=u.email;
  id=id.substring(0,id.length-4);
  var dt=new Date().getTime();
  id=id+dt;
  const ref_obj = firebase.firestore().collection('questions').doc(id);
        ref_obj.set({
            "title": qt,
            "lab": cat,
            "description":des,
            "tags":t,
            "author":u.displayName,
            "email":u.email,
    
        });
        var temp=firebase.firestore().collection('questions').get();
        temp.then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => doc.data())
          console.log(documents);
        });
}

$("document").ready(function () {
 
  
  const data = firebase.firestore().collection("questions").get();
  data.then((querySnapshot) => {
    const arr = querySnapshot.docs.map((doc) => doc.data());
    var item = "";
    var len = Object.keys(arr).length;
    var u = sessionStorage.getItem("user");
    u = JSON.parse(u);
    for (var i = 0; i < len; i++) {
      var v1 = arr[i].email;
      var v2 = u.email;

      console.log(arr[i]);
      console.log(arr[i]["author"]);

      item += '<div class="wrapper"><button class="toggle">';
      item += arr[i].title;
      item +=
        '<i class="fas fa-plus icon"></i></button><div class="content"><p>';
      item += arr[i].description;
      item += "</p></div></div>";
    }
    // console.log(cards);

    $("#accordian").append(item);

    let toggles = document.getElementsByClassName("toggle");
    let contentDiv = document.getElementsByClassName("content");
    let icons = document.getElementsByClassName("icon");
    for (let i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener("click", () => {
        if (
          parseInt(contentDiv[i].style.height) != contentDiv[i].scrollHeight
        ) {
          contentDiv[i].style.height = contentDiv[i].scrollHeight + "px";
          toggles[i].style.color = "#0084e9";
          icons[i].classList.remove("fa-plus");
          icons[i].classList.add("fa-minus");
        } else {
          contentDiv[i].style.height = "0px";
          toggles[i].style.color = "#111130";
          icons[i].classList.remove("fa-minus");
          icons[i].classList.add("fa-plus");
        }

        for (let j = 0; j < contentDiv.length; j++) {
          if (j !== i) {
            contentDiv[j].style.height = 0;
            toggles[j].style.color = "#111130";
            icons[j].classList.remove("fa-minus");
            icons[j].classList.add("fa-plus");
          }
        }
      });
    }
  });
});


var bt = document.getElementById("submit");

function run() {
  bt.disabled = true;
  let code = editor.getValue();
  var e = document.getElementById("langs");
  var value = e.options[e.selectedIndex].value;
  axios
    .post("/evaluate", {
      lan: value,
      program: code,
    })
    .then((res) => {
      alert(res.data);
      bt.disabled = false;
    })
    .catch((err) => {
      alert(err.data);
      bt.disabled = false;
    });
}

