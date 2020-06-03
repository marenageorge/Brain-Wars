var signinBtn = document.querySelector('#signIn');
var registerIn = document.querySelector('#regIn');
var registerUp = document.querySelector('#regUp');

var fnameTxt = document.querySelector('#regFname');
var lnameTxt = document.querySelector('#regLname');
var emailTxt = document.querySelector('#regEmail');
var passTxt = document.querySelector('#regPass');
var login = document.querySelector('#getStart');


var accountSide = document.querySelector('#registerSide');


registerIn.style.opacity = "30%";

var signUpORsignIn = "signup"

function clearAllFields() {
    fnameTxt.value = ""
    lnameTxt.value = ""
    emailTxt.value = ""
    passTxt.value = ""

}


//create object for user
var UserAccount = function (f, l, e, p, rf = 0, fm = 0, cs = 0, mg = 0) {
    this.firstName = f,
        this.lastName = l,
        this.email = e,
        this.password = p,
        this.rfScore = rf,
        this.fmScore = fm,
        this.csScore = cs,
        this.mgScore = mg
}





var allUsers = new Array();
if (localStorage.websiteUsers)
    allUsers = JSON.parse(localStorage.websiteUsers);


//check if this account is founded on local storage
//is found not founded
function accountisFound(u, p) {

    var isFound = false;
    for (var i = 0; i < allUsers.length; i++) {
        if (arguments[1]) {
            if (allUsers[i].email == u && allUsers[i].password == p) {
                isFound = true;
                break;
            }
        }
        else {
            if (allUsers[i].email == u) {
                isFound = true;
                break;

            }

        }
    }
    return isFound;
}




signinBtn.addEventListener('click', function () {

    
    //registerIn.style.opacity = "30%";
    //registerUp.style.opacity = "100%";
  
    clearAllFields();
})
clearAllFields();



registerIn.addEventListener('click', function () {

    clearAllFields();
    registerIn.style.opacity = "100%";
    registerUp.style.opacity = "30%"
    fnameTxt.style.display = "none"
    lnameTxt.style.display = "none"
    signUpORsignIn = "signin"

})

registerUp.addEventListener('click', function () {

    clearAllFields();
    registerIn.style.opacity = "30%";
    registerUp.style.opacity = "100%"
    fnameTxt.style.display = "block"
    lnameTxt.style.display = "block"
    signUpORsignIn = "signup"
})







function checkWhenSignIn() {
    var allFieldsDone = true;

    if (emailTxt.validationMessage != "" && allFieldsDone) {
        allFieldsDone = false;
        emailTxt.reportValidity();

    }

    if (passTxt.validationMessage != "" && allFieldsDone) {
        allFieldsDone = false;
        passTxt.reportValidity();

    }
    if (allFieldsDone && !accountisFound(emailTxt.value, passTxt.value)) {
        allFieldsDone = false;
        alert("this User isnot Found");
    }

    return allFieldsDone;

}

function checkWhenSignUp() {
    var allFieldsDone = true;


    if (emailTxt.validationMessage != "" && allFieldsDone) {
        allFieldsDone = false;

        emailTxt.reportValidity();

    }
    else {
        if (accountisFound(emailTxt.value)) {
            allFieldsDone = false;
            alert("this account is used before");
            emailTxt.value = "";

        }

    }


    if (fnameTxt.validationMessage != "" && allFieldsDone == true) {
        allFieldsDone = false;
        fnameTxt.reportValidity();

    }
    if (lnameTxt.validationMessage != "" && allFieldsDone == true) {
        allFieldsDone = false;
        lnameTxt.reportValidity();
    }

    if (passTxt.validationMessage != "" && allFieldsDone) {
        allFieldsDone = false;
        passTxt.reportValidity();

    }

    return allFieldsDone;


}






login.addEventListener('click', function () {


    var allFieldsDone = true;
    var user;

    if (signUpORsignIn == "signup") {

        allFieldsDone = checkWhenSignUp();
        if (allFieldsDone) {
            user = new UserAccount(fnameTxt.value, lnameTxt.value, emailTxt.value, passTxt.value);
            allUsers.push(user);
            window.localStorage.setItem("websiteUsers", JSON.stringify(allUsers));

        }
    }

    else {
        allFieldsDone = checkWhenSignIn();
        if (allFieldsDone) {
            for (var i = 0; i < allUsers.length; i++) {

                if (allUsers[i].email == emailTxt.value && allUsers[i].password == passTxt.value) {
                    console.log(allUsers[i].rfScore)
                    user = new UserAccount(allUsers[i].firstName, allUsers[i].lastName,
                        allUsers[i].email, allUsers[i].password, allUsers[i].rfScore,
                        allUsers[i].fmScore, allUsers[i].csScore, allUsers[i].mgScore);

                    break;
                }
            }
        }
    }

    if (allFieldsDone == true) {



        window.localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.replace("OneOrTwo.html");
    }

})

