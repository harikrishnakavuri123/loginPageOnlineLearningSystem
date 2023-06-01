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
function removeSpecialCharacters(str) {
  const regex = /[^a-zA-Z0-9 ]/g;
  return str.replace(regex, '');
}
function signUp()
{
  var name = document.getElementById('name').value;
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var conpassword = document.getElementById('confirm-password').value;
  var answer = document.getElementById('security-question').value;
  var nonEmptyFields = (name != '' && username != '' && password != '' && answer != '' && conpassword != '')
  var passwordvalidation = (password === conpassword)
  var path = removeSpecialCharacters(username);

  if(nonEmptyFields && passwordvalidation)
  {
    writeDataToFirebase(db, path, {
      "name": name,
      "username": username,
      "password": password,
      "answer" : answer
    }).then(() => {
      alert('Signed up Successfully! Login Please');
      window.open('index.html','_self');
    }).catch(error => {
      alert(error);
    });
  }
  else
  {
    if(nonEmptyFields==false)
    {
      alert('All the fields are required for Signing up!');
    }
    else
    {
      alert('Sorry, Passwords did not match!');
    }
  }
}
function resetPassword() 
{
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var conpassword = document.getElementById('confirm-password').value;
  var answer = document.getElementById('security-question').value;
  var nonEmptyFields = (username != '' && password != '' && answer != '' && conpassword != '')
  var passwordvalidation = (password === conpassword)
  if(nonEmptyFields && passwordvalidation)
  {
    var path = removeSpecialCharacters(username)
    var ref = db.ref(path);
    ref.once("value")
      .then(function(snapshot) {
        var data = snapshot.val();
        console.log(data);
        console.log(data.answer);
        console.log(data.answer == answer);
        if(data.answer == answer)
        {
          writeDataToFirebase(db, path, {
            "name": name,
            "username": username,
            "password": password,
            "answer" : answer
          }).then(() => {
            alert('Password reset successfully!');
            window.open('index.html','_self');
          }).catch(error => {
            alert(error);
          });
        }
      })
      .catch(function(error) {
        console.error(error);
        alert(error);
      });      
  }
  else
  {
    if(nonEmptyFields==false)
    {
      alert('All the fields are required for Signing up!');
    }
    else
    {
      alert('Sorry, Passwords did not match!');
    }
  }
}

function getUserCredentials()
{
const ref = db.ref('/');
ref.on('value', function(snapshot) {
  data = snapshot.val();
  console.log(data);
});
}
async function logIn()
{
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var path = removeSpecialCharacters(username)
  var ref = db.ref(path);
  ref.once("value")
    .then(function(snapshot) {
      var data = snapshot.val();
      console.log(data.password);
      console.log(data.password == password);
      if(data.password == password)
      {
        window.open('landing_page.html','_self');
      }
    })
    .catch(function(error) {
      console.error(error);
    }); 
}

