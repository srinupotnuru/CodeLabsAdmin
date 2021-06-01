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
          window.alert('Question Posted Successfully');
          window.location.href = "/home/index.html";

  }