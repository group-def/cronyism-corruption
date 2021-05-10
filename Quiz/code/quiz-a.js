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
                `<div class='answer-container'>
                    <label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>
                </div>
                <br>`
            );
        }

        // add question and answers to the output
        output.push(
            `<div class="slide">
                <div class="question">
                    <h4 class='text-center'>${currentQuestion.question}</h3>
                </div>
                <br>
                <div class="answers text-center">${answers.join('')} </div>
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
        finalBoxText.innerHTML =  `You answered ${numCorrect} out of ${myQuestions.length} questions correctly! You're clearly well-suited to being a corrupt politician!`
    }
    else if(numCorrect <= myQuestions.length-1 && numCorrect > myQuestions.length-4) {
        finalBoxTitle.innerHTML = 'So Close!'
        finalBoxText.innerHTML =  `You answered ${numCorrect} out of ${myQuestions.length} questions correctly, have another go and see if you can get them all right!`
    }
    else {
        finalBoxTitle.innerHTML = 'Oh Dear!'
        finalBoxText.innerHTML = ` You only answered ${numCorrect} out of ${myQuestions.length} questions correctly, but don't take it to heart, it probably just means you're not cut out to try to exploit a pandemic, which most people would say is a good thing!`
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
        question: "During the first few months of the pandemic the UK saw an ever-growing demand for Personal Protective Equipment. As a government Minister for the Department of Health, you have been tasked with supplying the NHS with PPE to help keep their vital staff members safe while treating those suffering from COVID-19. In order to supply this essential PPE to doctors and nurses throughout the country, do you:",
        answers: {
            A: 'Choose a well-established company with experience producing and supplying PPE',
            B: 'Accept offers of help from companies who have volunteered their services during the pandemic',
            C: 'Utilise various local companies around the country in order to get the PPE to where it is needed as quickly as possible',
            D: 'Buy 400,000 gowns from a Turkish T-Shirt manufacturer'
        },
        correctAnswer: 'D'
    },
    {
        question: 'In order to help stop the spread of COVID-19, the UK needs a track and trace system to notify people who have been in contact with the virus and advise them to stay at home. There are a few options available for this, what do you choose?',
        answers: {
            A: "Build upon the NHS' existing contact tracing system",
            B: "Hire Tory peer and wife of Tory MP, Dido Harding, to develop a new system",
            C: "Hold an auction to determine who will develop the app through a competitive bidding process",
            D: "Follow other countries in adopting the widely popular Google and Apple models"
        },
        correctAnswer: 'B'
    },
    {
        question: "In line with the Track and Trace programme, data concerning the results of COVID-19 tests must be collected and stored in order to inform people of when they may have come into contact with the virus. In order to store these large quantities of data, do you:",
        answers: {
            A: "Design a bespoke solution to store the data in the safest, most effective way despite the increased cost of this",
            B: "Use existing NHS databases and systems",
            C: "Store the data on paper",
            D: "Use Microsoft Excel"
        },
        correctAnswer: "D"
    },
    {
        question: 'In order for the track and trace scheme to work, the vast majority of the UK population have relinquished control of their data, in order for it to be used to help combat the spread of the disease. With all this data now in your hands, what do you do with it?',
        answers: {
            A: "Grant a US spy-tech firm access to the data in order for them to train their systems and enhance their profits",
            B: "Respect GDPR regulations and citizens' right to privacy and keep the data private",
            C: "Use the data solely for track and trace purposes and destroy the dataset once this has been accomplished",
            D: "Use the data in other schemes to benefit the public"
        },
        correctAnswer: 'A'
    },
    {
        question: "Due to the increased strain on the NHS and increased demand for medical supplies, as a result of the COVID-19 pandemic, the government must allocate contracts for the supply of these crucial services. In order to make sure that these contracts are allocated as efficiently as possible, do you:",
        answers: {
            A: "Pick randomly",
            B: "Prioritise companies with political connections and hold the majority of negotiations in closed channels",
            C: "Carefully select companies based on their due diligence records and their suitability for the task",
            D: "Put the contracts out to open tender and allow the free market to function effectively"
        },
        correctAnswer: "B"
    },
    {
        question: "Due to schools and other child care services being closed due to COVID-19, many of the most vulnerable members of society have been unable to access meals which they would normally depend on, with almost 2 million children going hungry in the UK in 2020. In order to prevent vulnerable children suffering, do you:",
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
            content: 'In April 2020, <a href="https://www.theguardian.com/world/2020/may/07/all-400000-gowns-flown-from-turkey-for-nhs-fail-uk-standards">the UK government ordered a shipment of 400,000 gowns from a Turkish T-Shirt manufacturer</a> in order to deal with the huge demand for Personal Protective Equipment for NHS staff. Unfortunately, the gowns failed to meet UK standards and had to be returned to the supplier, leaving vulnerable NHS staff still desperately short of PPE.'
        },
        incorrect: {
            title: `Incorrect! The correct answer is D!`,
            content: 'In April 2020, <a href="https://www.theguardian.com/world/2020/may/07/all-400000-gowns-flown-from-turkey-for-nhs-fail-uk-standards">the UK government ordered a shipment of 400,000 gowns from a Turkish T-Shirt manufacturer</a> in order to deal with the huge demand for Personal Protective Equipment for NHS staff. Unfortunately, the gowns failed to meet UK standards and had to be returned to the supplier, leaving vulnerable NHS staff still desperately short of PPE.'
        }
    },
    {
        correct: {
            title: 'Correct!',
            content: "Rather than using the widely-adopted Apple and Google model, or adapting the existing NHS system, the UK government decided to develop their own contact-tracing app. The government then appointed Baroness Dido Harding - a Tory peer and wife of Tory MP, John Penrose, who is best known for being the CEO of TalkTalk, where, in 2015, she presided over a data breach which lead to the loss of the financial and personal information of over 150,000 customers - to lead development of the app, despite her lack of experience in the public health sector. Inevitably, following numerous delays to the app's release and countless other mishaps, <a href='https://www.theguardian.com/world/2020/jun/18/uk-poised-to-abandon-coronavirus-app-in-favour-of-apple-and-google-models'>the government abandoned their 'world-beating' app and decided to instead use the Google and Apple model.</a>"
        },
        incorrect: {
            title: `Incorrect! The correct answer is B!`,
            content: "Rather than using the widely-adopted Apple and Google model, or adapting the NHS existing system, the UK government decided to develop their own contact-tracing app. The government then appointed Baroness Dido Harding - a Tory peer and wife of Tory MP, John Penrose, who is best known for being the CEO of TalkTalk, where, in 2015, she presided over a data breach which lead to the loss of the financial and personal information of over 150,000 customers - to lead development of the app, despite her lack of experience in public health. Inevitably, following numerous delays to the app's release and countless other mishaps, <a href='https://www.theguardian.com/world/2020/jun/18/uk-poised-to-abandon-coronavirus-app-in-favour-of-apple-and-google-models'>the government abandoned their 'world-beating' app and decided to instead use the Google and Apple model.</a>"
        }
    },
    {
        correct: {
            title: 'Correct!',
            content: "Although the logic behind this decision remains unclear, the Government opted to use Microsoft Excel to store results from COVID-19 tests, which had been analysed by commercial firms. Although the use of Excel is not inherently problematic, issues arose due to the use of an old file format - developers used the XLS format which dates back to 1987, rather than the newer XLSX format - which can only store 65,000 rows of data, compared to the newer format which can store over 1 million. This ultimately resulted in the loss of around 15,000 cases over the 8 day period in which the events took place - with almost 2,000 cases being missed each day. This costly mistake left experts baffled, with Professor John Crowcroft of the University of Cambridge claiming the government should have opted for a bespoke solution, as 'nobody would start with [XLS]'."
        },
        incorrect: {
            title: `Incorrect! The correct answer is D!`,
            content: "Although the logic behind this decision remains unclear, the Government opted to use Microsoft Excel to store the results from COVID-19 tests which had been analysed by commercial firms. Although the use of Excel is not inherently problematic, issues arose due to the use of an old file format - developers used the XLS format which dates back to 1987, rather than the newer XLSX format - which can only store 65,000 rows of data, compared to the newer format which can store over 1 million. This ultimately resulted in the loss of around 15,000 cases over the 8 day period in which the events took place - with almost 2,000 cases being missed each day. This costly mistake left experts baffled, with Professor John Crowcroft of the University of Cambridge claiming the government should have opted for a bespoke solution, as 'nobody would start with [XLS]'."
        }
    },
    {
        correct: {
            title: 'Correct!',
            content: "According to a contract posted online, the UK government gave American spy-tech firm, Palantir, access to sensitive medical records of COVID-19 patients including information on their health conditions, treatments and medicines, X-ray results, test results, and whether a person smokes or drinks. According to Open Democracy, Palantir were granted intellectual property rights and ‘and were allowed to train their models and profit off their unprecedented access to NHS data’. The exact details of the deal and the uses of the data are, however, still shrouded in mystery, with the UK government only publishing details of the agreement after several Freedom of Information requests and the threat of legal action from Open Democracy and Foxglove."
        },
        incorrect: {
            title: `Incorrect! The correct answer is A!`,
            content: "According to a contract posted online, the UK government gave American spy-tech firm, Palantir, access to sensitive medical records of COVID-19 patients including information on their health conditions, treatments and medicines, X-ray results, test results, and whether a person smokes or drinks. According to Open Democracy, Palantir were granted intellectual property rights and ‘and were allowed to train their models and profit off their unprecedented access to NHS data’. The exact details of the deal and the uses of the data are, however, still shrouded in mystery, with the UK government only publishing details of the agreement after several Freedom of Information requests and the threat of legal action from Open Democracy and Foxglove."
        }
    },
    {
        correct: {
            title: 'Correct!',
            content: "Rather than going through a competitive tender process - where companies bid for the rights to contracts - a report by the National Audit Office found that the British government prioritised companies with political connections when allocating contracts throughout the pandemic. Reportedly, the government established a 'high-priority lane' for companies who were referred by government officials and ministers, with suppliers in this lane being roughly ten times more likely to obtain contracts than those processed through ordinary channels. Of the £17.3 billion worth of contracts which were awarded, 60% of these contracts were awarded without a competitive process, which has ultimately lead to contracts being granted to companies with little suitability to the task. Most notably, US jewellery company, Saiger, was granted £250 million worth of PPE contracts despite having no experience in supplying in PPE, which resulted in the Department for Health and Social Care overpaying by almost £2.50 per gown. According to the Good Law Project, the government received over 24,000 offers from 16,000 suppliers, many of whom had experience in providing PPE, yet three of the biggest beneficiaries of government contracts were companies specialising in jewellery (Saiger), pest control (Pestfix), and an opaque 'family office' owned through a tax haven (Ayanda)."
        },
        incorrect: {
            title: `Incorrect! The correct answer is B!`,
            content: "Rather than going through a competitive tender process - where companies bid for the rights to contracts - a report by the National Audit Office found that the British government prioritised companies with political connections when allocating contracts. Reportedly, the government established a 'high-priority lane' for companies who were referred by government officials and ministers, with suppliers in this lane being roughly ten times more likely to obtain contracts than those processed through ordinary channels. Of the £17.3 billion worth of contracts which were awarded, 60% of these contracts were awarded without a competitive process, which has ultimately lead to contracts being granted to companies with little suitability to the task. Most notably, US jewellery company, Saiger, was granted £250 million worth of PPE contracts despite having no experience in supplying in PPE, which resulted in the Department for Health and Social Care overpaying by almost £2.50 per gown. According to the Good Law Project, the government received over 24,000 offers from 16,000 suppliers, many of whom had experience in providing PPE, yet three of the biggest beneficiaries of government contracts were companies specialising in jewellery (Saiger), pest control (Pestfix), and an opaque 'family office' owned through a tax haven (Ayanda)."
        }
    },
    {
        correct: {
            title: 'Correct!',
            content: "While some of the UK’s most vulnerable children went hungry due to COVID-19, the UK government replaced their existing voucher scheme - which gave vulnerable families £15 per week per child while schools were closed - with food parcels intended to last the whole week. Although the food packages were supposed to last 10 days and contain food worth around £30, in reality the produce in the packages was sparse and lacking in nutritional value, with the actual value of each parcel coming in at less than £10. The government paid £208 million to private firm, Chartwells, to carry out the scheme, with over 4.7 million boxes being distributed in England alone. Despite the government not revealing the cost of each individual box, based on the total cost of the scheme and the total number of boxes delivered, the New Statesman have estimated that each box cost the taxpayer over £44, despite their underwhelming contents."
        },
        incorrect: {
            title: `Incorrect! The correct answer is C!`,
            content: "While some of the UK’s most vulnerable children went hungry due to COVID-19, the UK government replaced their existing voucher scheme - which gave vulnerable families £15 per week per child while schools were closed - with food parcels intended to last the whole week. Although the food packages were supposed to last 10 days and contain food worth around £30, in reality the produce in the packages was sparse and lacking in nutritional value, with the actual value of each parcel coming in at less than £10. The government paid £208 million to private firm, Chartwells, to carry out the scheme, with over 4.7 million boxes being distributed in England alone. Despite the government not revealing the cost of each individual box, based on the total cost of the scheme and the total number of boxes delivered, the New Statesman have estimated that each box cost the taxpayer over £44, despite their underwhelming contents."
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
