const container = document.getElementById("container");
const questionBox = document.getElementById("questionBox");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const result = document.getElementById("result");

let counter = 0;
let maxCounter;
var quiz = [];

function setup() {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            quiz = JSON.parse(this.responseText);
            preload();
        }
    };
    xmlhttp.open("GET", "/sct/quiz/js/quiz_JSON.js", true);
    xmlhttp.send();
}

function preload() {
    //Do preload stuff
    document.getElementById("startBtn").style.display = "none";
    maxCounter = quiz.length;
    createQuestion();
}

function createQuestion() {
    question.innerHTML = "<h1>" + quiz[counter].question + "</h1><hr>";
    for(let i = 0; i < quiz[counter].answers.length; i++) {
        console.log(quiz[counter].answers[i].answer);
        answer.innerHTML += "<button class='button' onclick='checkAnswer(" + quiz[counter].answers[i].feedback + ", " + JSON.stringify(quiz[counter].answers[i].answer) + ")' id='answerBtn'>" + quiz[counter].answers[i].answer + "</button";
    }
}

function checkAnswer(feedback, ans) {
    console.log(ans);
    if(feedback) {
        //if answers is right
    }
    else if (!feedback) {
        //if answers was wrong
    }
    quiz[counter].response = feedback;
    quiz[counter].ans = ans;
    answer.innerHTML = "";
    counter++;
    if(counter < maxCounter)
        createQuestion();
    else
        showResults();
}

function showResults() {
    question.innerHTML = "";
    for(let i = 0; i < maxCounter; i++) {
        if(quiz[i].response == true) {
            result.innerHTML += "<h2>" + quiz[i].question + "<span id='correct'> " + quiz[i].correct + "</span>" + "</h2><p id='right'>Your answer: " + quiz[i].ans + "</p><hr>";
        } else {
            result.innerHTML += "<h2>" + quiz[i].question + "<span id='correct'> " + quiz[i].correct + "</span>" + "</h2><p id='wrong'>Your answer: " + quiz[i].ans + "</p><hr>";
        } 
    }
}