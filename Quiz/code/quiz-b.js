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
    if(numCorrect == myQuestions.length) {
        finalBoxTitle.innerHTML = 'Well Done!'
        finalBoxText.innerHTML =  `You answered ${numCorrect} out of ${myQuestions.length} questions correctly! Nobody's been able to pull the wool over your eyes!`
    }
    else if(numCorrect <= myQuestions.length-1 && numCorrect > myQuestions.length-5) {
        finalBoxTitle.innerHTML = 'So Close!'
        finalBoxText.innerHTML =  `You answered ${numCorrect} out of ${myQuestions.length} questions correctly, but don't worry it only goes to show how much of the government's actions throughout the pandemic have been obscured from public view!`
    }
    else {
        finalBoxTitle.innerHTML = 'Unlucky!'
        finalBoxText.innerHTML = ` You only answered ${numCorrect} out of ${myQuestions.length} questions correctly, but don't worry it only goes to show how much of the government's actions throughout the pandemic have been obscured from public view!`
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
        question: "By the end of 2020, how much money had been spent on the track and trace system? Was it:",
        answers: {
            A: '£37 billion',
            B: '£51 million',
            C: '£22 billion',
            D: '£82 billion'
        },
        correctAnswer: 'C'
    },
    {
        question: 'On average, how long did it take for track and trace to alert members of the public that they had been in contact with COVID-19? Was it:',
        answers: {
            A: "24 hours",
            B: "7 days",
            C: "10 days",
            D: "2 days"
        },
        correctAnswer: 'B'
    },
    {
        question: "In October 2020, it was revealed that large amounts of data concerning the results of COVID tests had been lost, due to human error involving the use of Microsoft Excel. Roughly how much data was lost?",
        answers: {
            A: "20,000 test results",
            B: "5,000 test results",
            C: "11,000 test results",
            D: "16,000 test results"
        },
        correctAnswer: "D"
    },
    {
        question: 'In April 2020, amidst worldwide shortages of PPE, the UK government ordered 400,000 protective gowns from Turkey, which ultimately failed UK safety standards and had to be returned. What product did the company traditionally specialise in producing? Was it:',
        answers: {
            A: "T-Shirts",
            B: "Children's toys",
            C: "Ventilators",
            D: "Protective equipment"
        },
        correctAnswer: 'A'
    },
    {
        question: "When allocating contracts for the supply of essential products and services throughout the pandemic, the UK government reportedly established a 'high-priority lane' for companies with political connections. How much more likely would you be to receive a contract if you were in the high-priority lane compared to normal channels?",
        answers: {
            A: "Twice as likely",
            B: "5 times more likely",
            C: "10 times more likely",
            D: "12 times more likely"
        },
        correctAnswer: "C"
    },
    {
        question: "As of December 2020, there has been a total of £48 billion worth of contracts awarded to companies to provide much needed supplies and services relating to the pandemic. What percentage of these contracts were granted without competition?",
        answers: {
            A: "91%",
            B: "29%",
            C: "58%",
            D: "67%"
        },
        correctAnswer: "D"
    },
    {
        question: "While schools were closed due to the pandemic, many of the UK's most vulnerable families received food parcels intended to replace the previous scheme of weekly vouchers worth £15. The food parcels supposedly contained £30 worth of food, intended to last for 10 days, what was the estimated actual value of produce in the food parcels people received?",
        answers: {
            A: "£27.99",
            B: "£5.22",
            C: "£14.99",
            D: "£11.22"
        },
        correctAnswer: "B"
    },
    {
        question: "The £22bn 'world beating' test and trace app was released in September 2020, after several delays. It was reported that between September and February the app prevented 600,000 cases, but what percentage of total cases does this amount to?",
        answers: {
            A: "52%",
            B: "79%",
            C: "15.7%",
            D: "9.3%"
        },
        correctAnswer: "C"
    }
];

// define dictionary for answer cards
const answerCards = [
    {
        correct: {
            title: 'Correct!',
            content: "So far the Track and Trace system has cost £22 billion, with some consultants being paid more than £6,000 a day. Test and Trace has admitted it employs 2,500 consultants, at an estimated daily rate of around £1,100, with the highest paid consultants earning £6,624 a day (equivalent to annual salary of £1.5m). The government has spent at least £375m on private consultancy services for Test and Trace. Meanwhile, the Royal College of Nursing general secretary Dame Donna Kinnair said nurses, who have been proposed a 1% pay cut in 2021, 'will be furious to hear of the millions of pounds being spent on private sector consultants'."
        },
        incorrect: {
            title: 'Incorrect!',
            content: "So far the Track and Trace system has cost £22 billion, with some consultants being paid more than £6,000 a day. Test and Trace has admitted it employs 2,500 consultants, at an estimated daily rate of around £1,100, with the highest paid consultants earning £6,624 a day (equivalent to annual salary of £1.5m). The government has spent at least £375m on private consultancy services for Test and Trace. Meanwhile, the Royal College of Nursing general secretary Dame Donna Kinnair said nurses, who have been proposed a 1% pay cut in 2021, 'will be furious to hear of the millions of pounds being spent on private sector consultants'."
        }
    },
    {
        correct: {
            title: 'Correct!',
            content: "Between May 28 and November 4, on average it took contact-tracers a week to trace contacts of people who tested positive for COVID-19 - too long to be effective given the transmission rate of the virus. On top of that, they were only able to and obtain details of contacts from two-thirds of the 767,074 people who had a positive test. The same data show that most of the people who were contacted by Track and Trace lived in the same household; just one person reached for every two cases was a non-household contact."
        },
        incorrect: {
            title: 'Incorrect!',
            content: "Between May 28 and November 4, on average it took contact-tracers a week to trace contacts of people who tested positive for COVID-19 - too long to be effective given the transmission rate of the virus. On top of that, they were only able to and obtain details of contacts from two-thirds of the 767,074 people who had a positive test. The same data show that most of the people who were contacted by Track and Trace lived in the same household; just one person reached for every two cases was a non-household contact."
        }
    },
    {
        correct: {
            title: 'Correct!',
            content: "Whilst the logic behind this decision remains unclear, the Government opted to use Microsoft Excel to store results from Covid tests, which had been analysed by commercial firms. Although the use of Excel is not inherently problematic, issues arose due to the use of an old file format - developers used the XLS format which dates back to 1987, rather than the newer XLSX format - which can only store 65,000 rows of data, compared to the newer format which can store over 1 million. This ultimately resulted in the loss of around 15,000 cases over the 8 day period in which the events took place - with almost 2,000 cases being missed each day. This costly mistake left experts baffled, with Professor John Crowcroft of the University of Cambridge claiming the government should have opted for a bespoke solution, as 'nobody would start with [XLS]'."
        },
        incorrect: {
            title: 'Incorrect!',
            content: "Whilst the logic behind this decision remains unclear, the Government opted to use Microsoft Excel to store results from Covid tests, which had been analysed by commercial firms. Although the use of Excel is not inherently problematic, issues arose due to the use of an old file format - developers used the XLS format which dates back to 1987, rather than the newer XLSX format - which can only store 65,000 rows of data, compared to the newer format which can store over 1 million. This ultimately resulted in the loss of around 15,000 cases over the 8 day period in which the events took place - with almost 2,000 cases being missed each day. This costly mistake left experts baffled, with Professor John Crowcroft of the University of Cambridge claiming the government should have opted for a bespoke solution, as 'nobody would start with [XLS]'."
        }
    },
    {
        correct: {
            title: 'Correct!',
            content: 'In April 2020, the UK government ordered a shipment of 400,000 gowns from a Turkish T-Shirt manufacturer in order to deal with the huge demand for Personal Protective Equipment for NHS staff. Unfortunately, the gowns failed to meet UK standards and had to be returned to the supplier, leaving vulnerable NHS staff still desperately short of PPE.'
        },
        incorrect: {
            title: 'Incorrect!',
            content: 'In April 2020, the UK government ordered a shipment of 400,000 gowns from a Turkish T-Shirt manufacturer in order to deal with the huge demand for Personal Protective Equipment for NHS staff. Unfortunately, the gowns failed to meet UK standards and had to be returned to the supplier, leaving vulnerable NHS staff still desperately short of PPE.'
        }
    },
    {
        correct: {
            title: 'Correct!',
            content: "Rather than going through a competitive tender process - where bid for the right to run a service or gain a contract - a report by the National Audit Office found that the British government prioritised companies with political connections when allocating contracts. Reportedly, the government established a 'high-priority lane' for companies who were referred by government officials and ministers, with suppliers in this lane being roughly ten times more likely to obtain contracts than those processed through ordinary channels." 
        },
        incorrect: {
            title: 'Incorrect!',
            content: "Rather than going through a competitive tender process - where bid for the right to run a service or gain a contract - a report by the National Audit Office found that the British government prioritised companies with political connections when allocating contracts. Reportedly, the government established a 'high-priority lane' for companies who were referred by government officials and ministers, with suppliers in this lane being roughly ten times more likely to obtain contracts than those processed through ordinary channels."
        }
    },
    {
        correct: {
            title: 'Correct!',
            content: "Of the £17.3 billion worth of contracts which were awarded, roughly 67% of these contracts were awarded without a competitive process, which has ultimately lead to contracts being granted to companies with little suitability to the task. Most notably, US jewellery company, Saiger, was granted £250 million worth of PPE contracts despite having no experience in supplying in PPE, which resulted in the Department for Health and Social Care overpaying by almost £2.50 per gown. According to the Good Law Project, the government received over 24,000 offers from 16,000 suppliers, many of whom had experience in providing PPE, yet three of the biggest beneficiaries of government contracts were companies specialising in jewellery (Saiger), pest control (Pestfix), and an opaque 'family office' owned through a tax haven (Ayanda)."
        },
        incorrect: {
            title: 'Incorrect!',
            content: "Of the £17.3 billion worth of contracts which were awarded, roughly 67% of these contracts were awarded without a competitive process, which has ultimately lead to contracts being granted to companies with little suitability to the task. Most notably, US jewellery company, Saiger, was granted £250 million worth of PPE contracts despite having no experience in supplying in PPE, which resulted in the Department for Health and Social Care overpaying by almost £2.50 per gown. According to the Good Law Project, the government received over 24,000 offers from 16,000 suppliers, many of whom had experience in providing PPE, yet three of the biggest beneficiaries of government contracts were companies specialising in jewellery (Saiger), pest control (Pestfix), and an opaque 'family office' owned through a tax haven (Ayanda)."
        }
    },
    {
        correct: {
            title: 'Correct!',
            content: "While some of the UK’s most vulnerable children went hungry due to COVID-19, the UK government replaced their existing voucher scheme - which gave vulnerable families £15 per week per child whilst schools were closed - with food parcels intended to last the whole week. Whilst the food packages were supposed to last 10 days and contain food worth around £30, in reality the produce in the packages was sparse and lacking in nutritional value, with the actual value of each parcel coming in at less than £10. The government paid £208 million to private firm, Chartwells, to carry out the scheme, with 4,724,611 boxes being distributed in England alone. Whilst there has been no comment on the cost of each individual box, based on the total cost of the scheme and the total number of boxes delivered, the New Statesman have estimated that each box cost the taxpayer over £44, despite their underwhelming contents."
        },
        incorrect: {
            title: 'Incorrect!',
            content: "While some of the UK’s most vulnerable children went hungry due to COVID-19, the UK government replaced their existing voucher scheme - which gave vulnerable families £15 per week per child whilst schools were closed - with food parcels intended to last the whole week. Whilst the food packages were supposed to last 10 days and contain food worth around £30, in reality the produce in the packages was sparse and lacking in nutritional value, with the actual value of each parcel coming in at less than £10. The government paid £208 million to private firm, Chartwells, to carry out the scheme, with 4,724,611 boxes being distributed in England alone. Whilst there has been no comment on the cost of each individual box, based on the total cost of the scheme and the total number of boxes delivered, the New Statesman have estimated that each box cost the taxpayer over £44, despite their underwhelming contents."
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
