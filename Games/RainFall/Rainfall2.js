RFgame('#timer2', 87, 65, 68, '#gameOver2', '#retryBtn2', '#backBtn2', '#leftUm2', '#rightUm2',
    '#centerUm2', '#rainContainer2', '#umCont2', '#disp2', '#mainScreen2');


RFgame('#timer', 38, 37, 39, '#gameOver', '#retryBtn', '#backBtn', '#leftUm', '#rightUm',
    '#centerUm', '#rainContainer', '#umCont', '#disp', '#mainScreen', '#left');




function RFgame(timer, upkey, leftkey, rightkey, gameOver, retryBtn, backBtn, leftum, rightum, centerum,
    raincontainer, umcont, disp, mainscreen) {

    //Get Element of game
    var leftUm = document.querySelector(leftum)
    var rightUm = document.querySelector(rightum)
    var centerUm = document.querySelector(centerum);
    var rainContainer = document.querySelector(raincontainer);
    var umContainer = document.querySelector(umcont)
    var myTimer = document.querySelector(timer);
    var myTable1 = document.querySelector(disp);
    var mainScreen = document.querySelector(mainscreen);

    //Get element of game over
    var myGameOver = document.querySelector(gameOver);
    var myCorrect = document.querySelector(gameOver + ' :nth-child(2)');
    var myIncorrect = document.querySelector(gameOver + ' :nth-child(3)');
    var myAccuracy = document.querySelector(gameOver + ' :nth-child(4)');
    var myMeanTime = document.querySelector(gameOver + ' :nth-child(5)');
    var myBackBtn = document.querySelector(backBtn);
    var myRetryBtn = document.querySelector(retryBtn);

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

    function createRainandThunder(secondTime) {
        var x = 0;
        var idName;
        var imgSrc;
        while (x < 4) {
            var left_OR_right = Math.floor((Math.random() * 2))
            var rain_OR_thender = Math.floor((Math.random() * 2))
            //if 0 img in left else img in right
            if (left_OR_right == 0) {
                idName = "leftimg"
            }
            else {
                idName = "rightimg"
            }
            // if 0 then its rain else its 
            if (rain_OR_thender == 0) {
                imgSrc = "rain.PNG"

            }
            else {
                imgSrc = "Thunder.PNG"
            }

            var myImage = document.createElement("img")
            myImage.src = imgSrc;
            myImage.id = idName;

            var newRow = document.createElement("td")
            newRow.appendChild(myImage)

            var newTr = document.createElement("tr")
            newTr.appendChild(newRow)

            if (secondTime) {
                return newTr;
            }
            else {
                myTable1.append(newTr)
                x++;
            }
        }
    }

    function getExpectedKey() {
        var expectedKey = leftkey;
        var placeOfimg = myTable1.lastElementChild.childNodes[0].childNodes[0].id;
        var imgContent = myTable1.lastElementChild.childNodes[0].childNodes[0].src;
        if (expectedKey == leftkey || expectedKey == rightkey || expectedKey == upkey) {

            if (imgContent.includes("Thunder") && placeOfimg == "leftimg") {
                expectedKey = rightkey
                if (rightUm.style.opacity == 1)
                    expectedKey = upkey;

            }
            else if (imgContent.includes("rain") && placeOfimg == "leftimg") {
                expectedKey = leftkey
                if (leftUm.style.opacity == 1)
                    expectedKey = upkey;
            }
            else if (imgContent.includes("rain") && placeOfimg == "rightimg") {
                expectedKey = rightkey
                if (rightUm.style.opacity == 1)
                    expectedKey = upkey;
            }
            else {
                expectedKey = leftkey
                if (leftUm.style.opacity == 1)
                    expectedKey = upkey;
            }
            return expectedKey;
        }
    }

    //Add Event for key down

    document.addEventListener('keydown', checkanswer);

    function checkanswer (e) {
        if (!isStarted) {
            isStarted = true
            startGame();
        }
        if (e.keyCode == leftkey || e.keyCode == rightkey || e.keyCode == upkey) {
            var exK = getExpectedKey();


            if (exK== e.keyCode && e.keyCode == leftkey) {
                centerUm.style.display = "none"
                leftUm.style.opacity = 1
                rightUm.style.opacity = .2
                correct++;
                fallAgain()
            }
            else if (exK == e.keyCode && e.keyCode == rightkey) {
                centerUm.style.display = "none"

                rightUm.style.opacity = 1
                leftUm.style.opacity = .2
                correct++;
                fallAgain()
            }
            else if (exK == e.keyCode && e.keyCode == upkey) {
                centerUm.style.display = "none"
                correct++;
                fallAgain()
            }
            else {
                var hh = setTimeout(function () {
                    mainScreen.style.background = "rgb(240, 240, 240)";
                    clearInterval(hh);
                }, 20)
                mainScreen.style.background = "red"
                incorrect++;
            }
        }

    };


//start interval for game
function startGame() {

    var h = setInterval(function () {
        if (time) {
            time--;
            myTimer.innerHTML = time;
        }
        else {
            removeEventListener('keydown',checkanswer);

            clearInterval(h);

            
            myGameOver.style.display = "block";
            rainContainer.style.display = "none"
            umContainer.style.display = "none"
            
            
            
            myCorrect.innerHTML = "Correct:    " + correct;
            myIncorrect.innerHTML = "Incorrect:    " + incorrect;
            if (correct + incorrect == 0)
            myAccuracy.innerHTML = "Accuracy:    -";
            else
            myAccuracy.innerHTML = "Accuracy:    " + (correct / (correct + incorrect) * 100).toPrecision(3) + " %";
            if (correct == 0)
            myMeanTime.innerHTML = "Mean Time:    -";
            else
            myMeanTime.innerHTML = "Mean Time:    " + (gameTime / correct).toPrecision(2) + " s";
            
            //removeEventListener(hkey);
        }
    }, 1000);
    
}

myBackBtn.addEventListener('click', function () {
    document.location.replace("../../OneOrTwo.html");
})

myRetryBtn.addEventListener('click', function () {
    document.location.replace("RainFall2.html");
})

function fallAgain() {
    myTable1.lastElementChild.remove()
    var x = createRainandThunder(1);
    myTable1.insertBefore(x, myTable1.children[0])
}

// create rain and thunder for the first time 
createRainandThunder()
}