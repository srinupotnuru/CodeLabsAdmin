  $('document').ready(function () {
    function logOut() {
        var callBack = (e) => {
          gotoLogin();
        };
        sessionStorage.clear();
        firebase.auth().signOut().finally(callBack);
      }
    var firebaseConfig = {
        apiKey: "AIzaSyCxTHYADPh8vbN4cYw9YMB4tvvi_d7VXmg",
        authDomain: "codelabs-4373c.firebaseapp.com",
        databaseURL: "https://codelabs-4373c-default-rtdb.firebaseio.com",
        projectId: "codelabs-4373c",
        storageBucket: "codelabs-4373c.appspot.com",
        messagingSenderId: "835368477952",
        appId: "1:835368477952:web:f0a339b55b5dc460bdffe5",
        measurementId: "G-9KHLDL9H2H"
      };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    function logOut() {
      var callBack = (e) => {
        gotoLogin();
      };
      sessionStorage.clear();
      firebase.auth().signOut().finally(callBack);
    }
    const data=firebase.firestore().collection('questions').get();
        data.then(querySnapshot => {
          const arr = querySnapshot.docs.map(doc => doc.data())
          var cards='';
          var len = Object.keys(arr).length;
          var u = sessionStorage.getItem('user');
          u=JSON.parse(u);
          for(var i=0;i<len;i++)
          { var v1=arr[i].email;
            var v2=u.email;
              if(arr[i].email==u.email)
              {
                 
              
              console.log(arr[i]);
            console.log(arr[i]['author']);
            cards += '<div class="card">';
            cards += '<div class="card-header">';
            cards += arr[i].title;
            cards += '</div>';
            cards += '<div class="card-body">';
            cards += '<b>'+ '<p class="card-title">' + "Description" + '</p>' +'</b>';
            cards += '<div id="copy">';
            cards += '<h6>@' + arr[i].author + '</h6>';
            cards += '<h6>@' + arr[i].lab + '</h6>';
            cards += '</div>';
            cards += '<a href="https://eswar2001.github.io/shareBin/#' + i + '"class="btnbtn-primary">SeePaste</a>';
            cards += '</div>';
            cards += '</div>';
              }
          }
          console.log(cards);
        $('#card_paste').append(cards);
        });
    
});
function logOut() {
  var callBack = (e) => {
    gotoLogin();
  };
  sessionStorage.clear();
  firebase.auth().signOut().finally(callBack);
}
function gotoLogin() {
  window.location.href = "/";
}