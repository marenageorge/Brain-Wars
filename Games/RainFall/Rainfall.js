//Get Element of game
var leftUm = document.querySelector('#leftUm')
var right = document.querySelector('#rightUm')
var centerUm = document.querySelector('#centerUm');
var rainContainer = document.querySelector("#rainContainer")
var umContainer  = document.querySelector("#umCont")
var myTimer = document.querySelector('#timer');
var myTable1 = document.querySelector("#disp")
var mainScreen = document.querySelector('#mainScreen')

//Get element of game over
var myGameOver = document.querySelector('#gameOver');
var myCorrect = document.querySelector('#gameOver  :nth-child(2)');
var myIncorrect = document.querySelector('#gameOver  :nth-child(3)');
var myAccuracy = document.querySelector('#gameOver  :nth-child(4)');
var myMeanTime = document.querySelector('#gameOver  :nth-child(5)');
var myBackBtn = document.querySelector('#backBtn');
var myRetryBtn = document.querySelector('#retryBtn');

//properities for set timer
var gameTime = 15;
var time = gameTime;
myTimer.innerHTML = time;


//flag to start timer
var isStarted = false;

// properities to calculate score
var correct = 0;
var incorrect = 0;
var score = 0;





//function create rain and thunder for the first time and also it can recreate them once if parameter has avalue 

function createRainandThunder(secondTime)
{
   var x = 0 ;
   var idName ;
   var imgSrc;
   while(x<4)
   {
      var left_OR_right = Math.floor((Math.random()*2))
      var rain_OR_thender = Math.floor((Math.random()*2))
      //if 0 img in left else img in right
      if(left_OR_right == 0)
      {
          idName = "leftimg"
      } 
      else
      {
          idName = "rightimg"
      }
      // if 0 then its rain else its 
      if (rain_OR_thender == 0)
      {
          imgSrc = "rain.PNG"

      }
      else
      {
        imgSrc = "Thunder.PNG"
      }

      var myImage = document.createElement("img")  
      myImage.src = imgSrc;
      myImage.id = idName;

      var newRow = document.createElement("td")
         newRow.appendChild(myImage)
         

       var newTr = document.createElement("tr")
          newTr.appendChild(newRow) 
     
          if(secondTime)
          {
             return newTr;
          }
          else
          {
            myTable1.append(newTr)
            x++;
          }
  
   }
}

function getExpectedKey()
{
    var expectedKey;
    var placeOfimg =myTable1.lastElementChild.childNodes[0].childNodes[0].id;
    var imgContent =myTable1.lastElementChild.childNodes[0].childNodes[0].src;


   
       if(imgContent.includes("Thunder")&&placeOfimg=="leftimg")
       {
           expectedKey = 39
             if(rightUm.style.opacity == 1)
              expectedKey = 38;

       }
       else if(imgContent.includes("rain")&&placeOfimg=="leftimg")
       {
            expectedKey = 37
            if(leftUm.style.opacity == 1)
              expectedKey = 38;
       }
       else if(imgContent.includes("rain")&&placeOfimg=="rightimg")
       {
            expectedKey = 39
           if(rightUm.style.opacity == 1)
           expectedKey = 38;
       }

       else
       {
          expectedKey = 37
          if(leftUm.style.opacity == 1)
              expectedKey = 38;
       }


       return expectedKey;

}



//Add Event for key down
document.onkeydown = function(e) {
 
     if(!isStarted)
       {
           isStarted = true   
            startGame();
       }
     

          if(getExpectedKey() == e.keyCode && e.keyCode == 37)
     {
        centerUm.style.display  = "none"
        leftUm.style.opacity = 1
        rightUm.style.opacity = .2
        correct++;
        fallAgain()
        //correct++;

     }
     else if(getExpectedKey() == e.keyCode && e.keyCode == 39)
     {
        centerUm.style.display  = "none"

        rightUm.style.opacity = 1
        leftUm.style.opacity = .2
        correct++;
        fallAgain()
     }
     else if(getExpectedKey() == e.keyCode && e.keyCode == 38)
     {
        centerUm.style.display  = "none"

        correct++; 
        fallAgain()

     }
     else
     {

       

        var hh = setTimeout(function(){
            mainScreen.style.background = "rgb(240, 240, 240)";
          clearInterval(hh);
        },20)
        mainScreen.style.background = "red"
        incorrect++;
     }
     
};

//start interval for game
function startGame()
{

    var h = setInterval(function(){
        if(time)
        {
            time--;
            myTimer.innerHTML = time;
        }
        else
        {
            clearInterval(h);
          
            myGameOver.style.display = "block";
            rainContainer.style.display = "none"
            umContainer.style.display = "none"

            var myUser = JSON.parse(localStorage.currentUser);
            if(correct > myUser.rfScore)
            {
                myUser.rfScore = correct;
                localStorage.setItem("currentUser",JSON.stringify(myUser))
            
                var allUsers = JSON.parse(localStorage.websiteUsers);
                for (var i = 0;i<allUsers.length;i++)
                {

                    if(myUser.email == allUsers[i].email)
                    {
                         allUsers[i].rfScore =  myUser.rfScore;
                         allUsers.push(allUsers[i]);
                         allUsers.splice(i,1)
                         localStorage.setItem("websiteUsers",JSON.stringify(allUsers))
                          break;
                      
                        // allUsers.remove(cuUser);
                        console.log("here"); 
                    }
                    
                }
            }


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
    },1000);

}



myBackBtn.addEventListener('click',function(){
    document.location.replace("../../OneOrTwo.html");
})

myRetryBtn.addEventListener('click',function(){
    document.location.replace("RainFall.html");
})






function fallAgain()
{
    myTable1.lastElementChild.remove()
    var x = createRainandThunder(1);
    myTable1.insertBefore(x,myTable1.children[0])
}



// create rain and thunder for the first time 
createRainandThunder()