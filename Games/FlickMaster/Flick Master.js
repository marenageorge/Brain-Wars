var myArrow = document.querySelector('img');
var myTimer = document.querySelector('#timer');
var gameTime = 15;
var time = gameTime;
myTimer.innerHTML = time;


var allImages = new Array();
allImages.push(new Array(0,"b.png",37));   //left 37
allImages.push(new Array(90,"b.png",38));  //up 38
allImages.push(new Array(180,"b.png",39)); //right 39
allImages.push(new Array(270,"b.png",40)); //down 40
allImages.push(new Array(0,"r.png",39));   //right 39
allImages.push(new Array(90,"r.png",40));  //down 40
allImages.push(new Array(180,"r.png",37)); //left 37
allImages.push(new Array(270,"r.png",38)); //up 38
var rndm;

getNewArrow();

function getNewArrow(){
    rndm = Math.floor(Math.random()*8);
    myArrow.style.display = 'none';
    myArrow.className = 'rotate' + allImages[rndm][0];
    myArrow.src = allImages[rndm][1];
    var h = setTimeout(function(){myArrow.style.display = 'block'; clearInterval(h);},50)
}

var correct = 0;
var incorrect = 0;
var score = 0;

function checkAnswer(e){
    if(e.keyCode == allImages[rndm][2])
    {
            correct ++;
            getNewArrow();
    }
    else
    {
        console.log('false');
        incorrect++;
    }
}
document.addEventListener('keydown',checkAnswer);

var h = setInterval(function(){
    if(time)
    {
        time--;
        myTimer.innerHTML = time;
    }
    else
    {
        document.removeEventListener('keydown',checkAnswer);
        clearInterval(h);
        
        // open score page
        var myUser = JSON.parse(localStorage.currentUser);
        if(correct > myUser.fmScore)
        {
            myUser.fmScore = correct;
            
            localStorage.setItem("currentUser",JSON.stringify(myUser))
        
            var allUsers = JSON.parse(localStorage.websiteUsers);
            for (var i = 0;i<allUsers.length;i++)
            {

                if(myUser.email == allUsers[i].email)
                {
                     allUsers[i].fmScore =  myUser.fmScore;
                     allUsers.push(allUsers[i]);
                     allUsers.splice(i,1)
                     localStorage.setItem("websiteUsers",JSON.stringify(allUsers))
                      break;
                  
                }
                
            }
        }



        myGameOver.style.display = "block";
        myCorrect.innerHTML="Correct:    " + correct;
        myIncorrect.innerHTML="Incorrect:    " + incorrect;
        if(correct+incorrect == 0)
            myAccuracy.innerHTML="Accuracy:    -";
        else
            myAccuracy.innerHTML="Accuracy:    " + (correct/(correct+incorrect)*100).toPrecision(3) + " %";
        if(correct == 0)
        myMeanTime.innerHTML="Mean Time:    -";
        else
        myMeanTime.innerHTML="Mean Time:    " + (gameTime/correct).toPrecision(2) + " s";
    }
},1000)


// for game over

var myGameOver = document.querySelector('#gameOver');
var myCorrect = document.querySelector('#gameOver :nth-child(2)');
var myIncorrect = document.querySelector('#gameOver :nth-child(3)');
var myAccuracy = document.querySelector('#gameOver :nth-child(4)');
var myMeanTime = document.querySelector('#gameOver :nth-child(5)');
var myBackBtn = document.querySelector('#backBtn');
var myRetryBtn = document.querySelector('#retryBtn');

myBackBtn.addEventListener('click',function(){
    document.location.replace("../../OneOrTwo.html");
})
myRetryBtn.addEventListener('click',function(){
    document.location.replace("FlickMaster.html");
})




