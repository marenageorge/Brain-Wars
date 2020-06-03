
var myUser = JSON.parse(localStorage.currentUser);
console.log(myUser.firstName);
console.log(myUser.lastName);
console.log(myUser.email);

var nameField = document.querySelector('#profilename');
var mailField = document.querySelector('#profilemail');
var rfscore = document.querySelector('#rscore');
var fmscore = document.querySelector('#fscore');
var csscore = document.querySelector('#cscore');
var mgscore = document.querySelector('#mscore');

nameField.innerHTML = myUser.firstName + ' ' + myUser.lastName;
mailField.innerHTML = myUser.email;
rfscore.innerHTML = myUser.rfScore;
fmscore.innerHTML = myUser.fmScore;
csscore.innerHTML = myUser.csScore;
mgscore.innerHTML = myUser.mgScore;

// var signoutBtn = document.querySelector("#signOut");
// signoutBtn.addEventListener('click',function(){
//     localStorage.removeItem('currentUser');
//     var Backlen= history.length;   

//     history.go(-Backlen);
// })









