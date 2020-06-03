FMgame('#timer',38,40,37,39,'#gameOver','#retryBtn','#backBtn','#arrow');
FMgame('#timer2',87,83,65,68,'#gameOver2','#retryBtn2','#backBtn2','#arrow2');

function FMgame(timer, up, down, left, right, gameOver, retryBtn, backBtn,arrow) {


    var myArrow = document.querySelector(arrow);
    var myTimer = document.querySelector(timer);
    var gameTime = 15;
    var time = gameTime;
    myTimer.innerHTML = time;


    var allImages = new Array();
    allImages.push(new Array(0, "b.png", left));    //left 37      a   65
    allImages.push(new Array(90, "b.png", up));     //up 38        w   87
    allImages.push(new Array(180, "b.png", right)); //right 39     d   68
    allImages.push(new Array(270, "b.png", down));  //down 40      s   83
    allImages.push(new Array(0, "r.png", right));   //right 39     d   68
    allImages.push(new Array(90, "r.png", down));   //down 40      s   83
    allImages.push(new Array(180, "r.png", left));  //left 37      a   65
    allImages.push(new Array(270, "r.png", up));    //up 38        w   87
    var rndm;

    getNewArrow();

    function getNewArrow() {
        rndm = Math.floor(Math.random() * 8);
        myArrow.style.display = 'none';
        myArrow.className = 'rotate' + allImages[rndm][0];
        myArrow.src = allImages[rndm][1];
        var h = setTimeout(function () { myArrow.style.display = 'block'; clearInterval(h); }, 50)
    }

    var correct = 0;
    var incorrect = 0;
    var score = 0;

    function checkAnswer(e) {
        if (e.keyCode == allImages[rndm][2]) {
            correct++;
            getNewArrow();
        }
        else if(e.keyCode == up ||e.keyCode == down ||e.keyCode == left ||e.keyCode == right) {
            // console.log('false');
            incorrect++;
        }
    }
    document.addEventListener('keydown', checkAnswer);
    
    var myGameOver = document.querySelector(gameOver);
    var myCorrect = document.querySelector(gameOver+' :nth-child(2)');
    var myIncorrect = document.querySelector(gameOver+' :nth-child(3)');
    var myAccuracy = document.querySelector(gameOver+' :nth-child(4)');
    var myMeanTime = document.querySelector(gameOver+' :nth-child(5)');
    var myBackBtn = document.querySelector(backBtn);
    var myRetryBtn = document.querySelector(retryBtn);

    var h = setInterval(function () {
        if (time) {
            time--;
            myTimer.innerHTML = time;
        }
        else {
            document.removeEventListener('keydown', checkAnswer);
            clearInterval(h);

            // open score page

            myGameOver.style.display = "block";
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
        }
    }, 1000)


    // for game over


    myBackBtn.addEventListener('click', function () {
        document.location.replace("../../OneOrTwo.html");
    })
    myRetryBtn.addEventListener('click', function () {
        document.location.replace("FlickMaster2.html");
    })

}



