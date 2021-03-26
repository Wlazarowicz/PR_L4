let next = document.querySelector('.next');
let previous = document.querySelector('.previous');

let question = document.querySelector('.question');
let answers = document.querySelectorAll('.list-group-item');

let pointsElem = document.querySelector('.score');
let restart = document.querySelector('.restart');

let results = document.querySelector('.results');
let list = document.querySelector('.list');

let pts = document.querySelector('.userScorePoint');
let ave = document.querySelector('.average');

let index = 0;
let points = 0;

let games = localStorage.getItem('games');
let average = localStorage.getItem('average');
document.querySelector('#index');

fetch('https://quiztai.herokuapp.com/api/quiz')
    	.then(resp => resp.json())
    	.then(resp => {
        	   preQuestions = resp;
                next.addEventListener('click', function () {
                    index++;
                    if (index < preQuestions.length){
                        setQuestion(index);
                        activateAnswers();
                    }else{
                        saveData();
                        list.style.display = 'none';
                        results.style.display = 'block';
                        pts.innerHTML = points;
                        ave.innerHTML = average;
                        //userScorePoint.innerHTML = points;
                    }
                });

                previous.addEventListener('click', function () {
                    if (index > 0){
                        index--;
                        setQuestion(index);
                        activateAnswers();
                    }
                })

                restart.addEventListener('click', function (event) {
                    event.preventDefault();

                    index = 0;
                    points = 0;
                    let userScorePoint = document.querySelector('.score');
                    userScorePoint.innerHTML = points;
                    setQuestion(index);
                    activateAnswers();
                    list.style.display = 'block';
                    results.style.display = 'none';
                });
    
                setQuestion(index);
                activateAnswers();
    	});


for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener('click', doAction);
}

function doAction(event) {
    //event.target - Zwraca referencję do elementu, do którego zdarzenie zostało pierwotnie wysłane.
    if (event.target.innerHTML === preQuestions[index].correct_answer) {
        os++;
        pointsElem.innerText = points;
        markCorrect(event.target);
    }
    else {
        markInCorrect(event.target);
    }
    disableAnswers();
}


function setQuestion(index) {
   clearClass();
   question.innerHTML = (index+1) + ". " + preQuestions[index].question;

   answers[0].innerHTML = preQuestions[index].answers[0];
   answers[1].innerHTML = preQuestions[index].answers[1];
   answers[2].innerHTML = preQuestions[index].answers[2];
   answers[3].innerHTML = preQuestions[index].answers[3];
    
    if (preQuestions[index].answers.length === 2) {
       answers[2].style.display = 'none';
       answers[3].style.display = 'none';
   } else {
       answers[2].style.display = 'block';
       answers[3].style.display = 'block';
   }

}


/*next.addEventListener('click', function () {
    index++;
    if (index < preQuestions.length){
        setQuestion(index);
        activateAnswers();
   }else{
        saveData();
        list.style.display = 'none';
        results.style.display = 'block';
        pts.innerHTML = points;
        ave.innerHTML = average;
        //userScorePoint.innerHTML = points;
   }
});

previous.addEventListener('click', function () {
    if (index > 0){
        index--;
        setQuestion(index);
        activateAnswers();
   }
})

restart.addEventListener('click', function (event) {
    event.preventDefault();

    index = 0;
    points = 0;
    let userScorePoint = document.querySelector('.score');
    userScorePoint.innerHTML = points;
    setQuestion(index);
    activateAnswers();
    list.style.display = 'block';
    results.style.display = 'none';
});*/


function activateAnswers() {
   for (let i = 0; i < answers.length; i++) {
      answers[i].addEventListener('click', doAction);
   }
}


function markCorrect(elem) {
   elem.classList.add('correct');
}

function markInCorrect(elem) {
   elem.classList.add('incorrect');
}

function disableAnswers() {
   for (let i = 0; i < answers.length; i++) {
      answers[i].removeEventListener('click', doAction);
   }
}

function clearClass() {
    for (let i = 0; i < answers.length; i++) {
        answers[i].classList.remove('correct')
        answers[i].classList.remove('incorrect')
    }
}

function saveData() {
    average *= games;
    average += points;
    games++;
    average = average / games;
    localStorage.setItem('games', games);
    localStorage.setItem('average', average);
}

//setQuestion(index);
//activateAnswers();