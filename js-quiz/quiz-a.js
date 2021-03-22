// CODE USED FROM https://www.sitepoint.com/simple-javascript-quiz/

let questionNum = 0;

// FUNCTIONS
// define function to build quiz
function buildQuiz(){
    // immediately close popups when building quiz to prevent it displaying on start
    closePopup();
    closePopupFinal();

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
    closePopup();
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
    };
    
    // add message and score to final box
    if(numCorrect > 2) {
        finalBoxTitle.innerHTML = 'Well Done!'
        finalBoxText.innerHTML =  `You answered ${numCorrect} out of ${myQuestions.length} questions correctly!`
    }
    else if(numCorrect <= 2 && numCorrect > 1) {
        finalBoxTitle.innerHTML = 'So Close!'
        finalBoxText.innerHTML =  `You answered ${numCorrect} out of ${myQuestions.length} questions correctly, have another go and see if you can get them all right!`
    }
    else {
        finalBoxTitle.innerHTML = 'Unlucky!'
        finalBoxText.innerHTML = ` You only answered ${numCorrect} out of ${myQuestions.length} questions correctly, but don't worry I'm sure you'll do better next time!`
    }
    
    openPopupFinal();
});
}

// define function to show slides
function showSlide(n){
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;

    // hide next slide button when on last slide and add submit button
    if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else {
        submitButton.style.display = 'none';
    };
}

// define functions to make navigation buttons work
function showNextSlide() {
    closePopup();
    showSlide(currentSlide + 1);
    questionNum++;
    nextButton.style.display = 'none';
}

function showPrevSlide() {
    showSlide(currentSlide - 1);
}

// function to open and close answerbox
function closePopup() {
    answerBox.style.display = "none";
};

function openPopup() {
    answerBox.style.display = "inline-block";
};

// function to open and close finalbox
function closePopupFinal() {
    const finalBox = document.getElementById('finalbox');
    finalBox.style.display = "none";
};

function openPopupFinal() {
    const finalBox = document.getElementById('finalbox');

    finalBox.style.display = "inline-block";
};

// define function to show answer box on submit
function finalAnswer() {
    const answerContainers = quizContainer.querySelectorAll('.answers');

    const answerContainer = answerContainers[questionNum];
    const selector = `input[name=question${questionNum}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    const correctAnswer = myQuestions[questionNum].correctAnswer
    

    if(questionNum !== myQuestions.length - 1) {
        if(userAnswer === correctAnswer) {
            answerBoxTitle.innerHTML = answerCards[questionNum].correct.title;
            answerBoxText.innerHTML = answerCards[questionNum].correct.content;

            openPopup();
            nextButton.style.display = 'inline-block';
        }
        else{
            answerBoxTitle.innerHTML = answerCards[questionNum].incorrect.title;
            answerBoxText.innerHTML = answerCards[questionNum].incorrect.content;

            openPopup();
            nextButton.style.display = 'inline-block';
        }
    }
    else {
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
    }
};

// VARIABLEs
// define variables for HTML elements
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const answerBox = document.getElementById('answerbox');
const answerBoxTitle = document.getElementById('answerboxtitle');
const answerBoxText = document.getElementById('answerboxtext');
const finalBox = document.getElementById('finalbox');
const finalBoxTitle = document.getElementById('finalboxtitle');
const finalBoxText = document.getElementById('finalboxtext')

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
        question: 'In order to help stop the spread of Coronavirus, the UK needs a track and trace system to notify people who have been in contact with the virus and advise them to stay at home. There are a few options available for this, what do you choose? a) use the system that is already being used in the NHS b) build a brand new system c) use the google/ apple track track product d) auction the rights to produce the app',
        answers: {
            A: "Build upon the NHS' existing contact tracing system",
            B: "Hire Tory peer and wife of Tory MP, Dido Harding, to develop a new system",
            C: "Hold an auction to determine who will develop the app through a competitive bidding process",
            D: "Follow other countries in adopting the widely popylar Google or Apple models"
        },
        correctAnswer: 'B'
    },
    {
        question: "In line with the Track and Trace programme, data concerning the results of Coronavirus tests must be collected and stored in order to inform people of when they may have come into contact with the virus. In order to store these large quantities of data, do you:",
        answers: {
            A: "Design a bespoke solution to store the data in the safest, most effective way",
            B: "Use existing NHS databases and systems",
            C: "Store the data on paper",
            D: "Use Microsoft Excel"
        },
        correctAnswer: "D"
    },
    {
        question: 'In order for the track and trace scheme to work, the vast majority of the UK population have relinquished control of their data, in order for it to be used to help combat the spread of the disease. With all this data now in your hands, what do you do with it? a) use it to for other public benefit b) respect GDPR and keep it private c) use it solely for track and trace and then delete it once finished d) sell to a US databroker',
        answers: {
            A: "Sell the data to a US databroker",
            B: "Respect GDPR regulations and citizens' right to privacy and keep the data private",
            C: "Use the data solely for track and trace purposes and destroy the dataset once this has been accomplished",
            D: "Use the data in other schemes to benefit the public"
        },
        correctAnswer: 'A'
    },
    {
        question: "Due to the increased strain on the NHS and increased demand for medical supplies, as a result of the Coronavirus pandemic, the government must allocate contracts for the supply of these crucial services. In order to make sure that these contracts are allocated as efficiently as possible, do you: a) give the contracts to companies/ individuals who have donated to the convservative party? b) award the contract to the most suitable company? ",
        answers: {
            A: "Pick randomly",
            B: "Prioritise companies with political connections and hold the majority of negotiations in closed channels",
            C: "Carefully select companies based on their due diligence records and their suitability for the task",
            D: "Put the contracts out to open tender and allow the free market to function effectively"
        },
        correctAnswer: "B"
    },
    {
        question: "Due to schools and other child care services being closed due to Coronavirus, many of the most vulnerable members of society have been unable to access meals which they would normally depend on, with almost 2 million children going hungry in the UK in 2020. In order to prevent vulnerable children suffering, do you:",
        answers: {
            A: "Extend the existing voucher schemes to provide support for vulnerable families",
            B: "Subsidise discount cards for people to use to buy food and essential items",
            C: "Pay private contractors to supply food packages to vulnerable families",
            D: "Provide hardship grants to vulnerable families so that they can afford to eat"
        },
        correctAnswer: "C"
    }
];

// define dictionary for answer cards
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
    },
    {
        correct: {
            title: 'Correct!',
            content: 'blah'
        },
        incorrect: {
            title: 'Incorrect!',
            content: 'blah blah'
        }
    },
    {
        correct: {
            title: 'Correct!',
            content: 'blah blah'
        },
        incorrect: {
            title: 'Incorrect!',
            content: 'blah'
        }
    }
];

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

// on button click show answer card
const finalAnswerButton = document.getElementById('final-answer');
finalAnswerButton.addEventListener('click', finalAnswer);