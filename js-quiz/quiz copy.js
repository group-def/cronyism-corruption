// CODE USED FROM https://www.sitepoint.com/simple-javascript-quiz/ nad https://stackoverflow.com/questions/36232733/javascript-quiz-when-user-gets-to-the-result-display-a-popup

let questionNum = 0

// FUNCTIONS
// define function to build quiz
function buildQuiz(){
    closePopup();
    
    // variable to store HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
        // variable to store list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){
            // add a HTML radio button
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} : 
                    ${currentQuestion.answers[letter]}
                </label>
                <br>`
            );
        }

        // add question and answers to the output
        output.push(
            `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>
            </div>`
        );

        
    });

    // combine output list into one string of HTML
    quizContainer.innerHTML = output.join('');
}

// define function to show results
function showResults(){
    // gather answer containers from quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question
    myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
            // increasing user's score
            numCorrect++;

            // make answers green
            //answerContainers[questionNumber].style.color = 'lightgreen'; 
            // show answer card

        }
        // if answer is wrong or blank
        else{
            // colour answers red
            answerContainers[questionNumber].style.color = 'red';
        }
    });
    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

// define function to show slides
function showSlide(n){
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    /* // hide previous button when on first slide
    if(currentSlide === 0){
        previousButton.style.display = 'none';
    }
    else{
        previousButton.style.display = 'inline-block';
    }
    // hide next slide button when on last slide and add submit button
    if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    } */
}

// define functions to make navigation buttons work
function showNextSlide() {
    showSlide(currentSlide + 1);
    questionNum++;
    nextButton.style.display = 'none';
}

function showPrevSlide() {
    showSlide(currentSlide - 1);
    questionNum--;
}

// function to open and close answerbox
function closePopup() {
    document.getElementById('answerbox').style.display = 'none';
}

function openPopup() {
    const answerBox = document.getElementById('answerbox');

    answerBox.style.display = "inline-block";
};

/* function openPopupWrong() {
    document.getElementById('answerbox').style.display = "inline-block";
} */

// define function to show answer box on submit
function finalAnswer() {
    const answerContainers = quizContainer.querySelectorAll('.answers');

    const answerContainer = answerContainers[questionNum];
    const selector = `input[name=question${questionNum}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    const correctAnswer = myQuestions[questionNum].correctAnswer
    const answerBoxTitle = document.getElementById('answerboxtitle');
    const answerBoxText = document.getElementById('answerboxtext');

    if(userAnswer === correctAnswer) {
        answerBoxTitle.innerHTML = answerCards[questionNum].correct.title;
        answerBoxText.innerHTML = answerCards[questionNum].correct.content;

        openPopup();
    }
    else{
        answerBoxTitle.innerHTML = answerCards[questionNum].incorrect.title;
        answerBoxText.innerHTML = answerCards[questionNum].incorrect.content;

        openPopup();
    }
};




// VARIABLEs
// define variables for HTML elements
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

// define dictionary of questions and answers
const myQuestions = [
    {
        question: "During the first few months of the pandemic the UK saw an ever-growing demand for Personal Protective Equipment. As a government Minister for the Department of Health, you have been tasked with supplying the NHS with PPE to help keep their vital staff members safe whilst treating those suffering from COVID-19. In order to supply this essential PPE to doctors and nurses throughout the country, do you:",
        answers: {
            A: 'Choose a well-established company with experience producing and supplying PPE',
            B: 'Accept offers of help from companies who have volunteered their services during the pandemic',
            C: 'Utilise various local companies around the country in order to get the PPE to where it is needed as quickly as possible',
            D: 'Buy 400,000 gowns from a Turkish T-Shirt manufacturer'
        },
        correctAnswer: 'D'
    },
    {
        question: '2',
        answers: {
            a: 'placeholder',
            b: 'placeholder',
            c: 'placeholder',
            d: 'placeholder'
        },
        correctAnswer: 'b'
    },
    {
        question: '3',
        answers: {
            a: 'placeholder',
            b: 'placeholder',
            c: 'placeholder',
            d: 'placeholder'
        },
        correctAnswer: 'c'
    }
];

const answerCards = [
    {
        correct: {
            title: 'Correct!',
            content: 'blah blah blah'
        },
        incorrect: {
            title: 'Incorrect!',
            content: 'blah blah'
        }

    }
]

// display quiz
buildQuiz();

// PAGINATION
// define variables
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(currentSlide);

// EVENT LISTENERS
// on submit, show results
submitButton.addEventListener('click', showResults);

// on button click change slides
previousButton.addEventListener('click', showPrevSlide);
nextButton.addEventListener('click', showNextSlide)

const finalAnswerButton = document.getElementById('final-answer')
finalAnswerButton.addEventListener('click', finalAnswer)