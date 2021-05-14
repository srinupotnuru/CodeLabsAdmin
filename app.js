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
  window.location.href = '/home'
}

function gotoLogin() {
  window.location.href='/login';
}

function checkUser() {
  var callBack = (user) => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      gotoHome();
    }
  };
  firebase.auth().onAuthStateChanged(callBack);
}
