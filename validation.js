function firebaseReady() {
    var firebaseConfig = {
      apiKey: "AIzaSyA3eokbfX6drKo_WVVwFlqblqxZzp5cmQE",
      authDomain: "lms-app-4271.firebaseapp.com",
      databaseURL: "https://lms-app-4271-default-rtdb.firebaseio.com",
      projectId: "lms-app-4271",
      storageBucket: "lms-app-4271.appspot.com",
      messagingSenderId: "848170129257",
      appId: "1:848170129257:web:268c66e07371f9a5e24ff8",
      measurementId: "G-P3E3DFD74P"
    };
    
    firebase.initializeApp(firebaseConfig);
      
    var db = firebase.database();
    return db;
}

var db= firebaseReady();

function writeDataToFirebase(db, path, data) {
    db.ref("data").on("value", function(snapshot) {
        var data = snapshot.val();
    });
    return new Promise((resolve, reject) => {
      db.ref(path).set(data, function(error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
}
function signUp()
{
    var name = document.getElementById('name').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var answer = document.getElementById('security-question').value;
    writeDataToFirebase(db, name, {
        "username": username,
        "password": password,
        "answer" : answer
      }).then(() => {
        alert('Signed up Successfully! Login Please');
        window.open('login.html','_self');
      }).catch(error => {
        alert(error);
      });
}
function resetPassword() 
{
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;

      if (username === "" || password === "") {
        alert("Please enter your username and password.");
        return;
      }
      var firebase = firebase.initializeApp();
      var auth = firebase.auth();
      auth.sendPasswordResetEmail(username).then(function() {
        alert("A password reset email has been sent to your email address.");
      }, function(error) {
        alert("An error occurred while resetting your password.");
      });
}


function signIn() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  
  checkEmailAndPassword(username, password).then(function(exists) {
    if (exists) {
      alert("You are signed in!");
      window.location.href = "/";
    } else {
      alert("The email or password is incorrect.");
    }
  });
  
}