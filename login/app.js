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

function gotoHome() {
  window.location.href = "/home";
}

function redirectResult() {
  var PcallBack = function(result){
    sessionStorage.setItem("user", JSON.stringify(result.user));
    gotoHome();
  };

  var NcallBack = function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorMessage);
    window.alert('there is an internal error please contact administrator\n' + errorMessage + '/n' + errorCode);
  };

  firebase.auth().getRedirectResult().then(PcallBack).catch(NcallBack);
}

function loginUser() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  firebase.auth().signInWithRedirect(provider).then(e=>redirectResult());
}

function checkUser() {

  firebase.auth().onAuthStateChanged( (user) => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      gotoHome();
    } else {
      loginUser();
    }
  });
}
window.onload = function() {
  checkUser();
}