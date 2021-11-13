// getting all the elements

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
let timeText = document.querySelector(".timer .time_txt");
const timeCount= quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");

//if Start Quiz Button Clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); // show the info box
}

//if Exit Quiz Button Clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide the info box
}

//if Continue Button Clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.add("activeQuiz"); //show the quiz box 
    showQuestions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(10); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 10;
let widthValue = 0;
let userScore = 0;


const next_btn = quiz_box.querySelector(".next_btn");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 10;
    let widthValue = 0;
    
    showQuestions(que_count);
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    timeText = "Time Left"; //change the text of timeText to Time Left
    next_btn.style.display = "none"; //hide the next button
}

//if Quit Quiz clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}


// if Next Button clicked

next_btn.onclick = ()=>{
    
    if(que_count < questions.length -1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuestions(que_count);
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        startTimer(timeValue);
        clearInterval(counterLine); //clear counterLine
        startTimerLine(widthValue);
        timeText.innerText = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResultBox(); //calling showResultBox function
    }
}

//getting questions and options from array

function showQuestions(index){
    const que_text = document.querySelector(".que_text");   
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] + '<span></span></div>'
                    + '<div class="option"><span>'+ questions[index].options[1] + '</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[2] + '</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
  
    const option = option_list.querySelectorAll(".option");
    
    // set onclick attribute to all available options
    for (let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// creating the new div tags for icons
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent; //getting user selected option
    let correctAns = questions[que_count].answer; //getting correct answer from array
    let allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correctAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        console.log("Answer is correct!");
        console.log("Your correct answers = " + userScore);
        
    }else{
        answer.classList.add("incorrect") //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIcon);
        console.log("Answer is wrong!")
        
    }

    // if user selects a wrong answer it automatically highlights the correct one
    for(let i = 0; i < allOptions; i++){
        if(option_list.children[i].textContent == correctAns){ //if there is an option which is matched to an array answer 
            option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
            option_list.children[i].insertAdjacentHTML("beforeend", tickIcon); //adding tick icon to matched option
            console.log("Auto selected correct answer.");
        }
    }
    
    // once user selects answer, disables all options
    for (let i =0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled") //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResultBox(){
    info_box.classList.remove("activeInfo"); // hide the info box
    quiz_box.classList.remove("activeQuiz"); // hide the quiz box
    result_box.classList.add("activeResult"); // show the result box
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 3){
        let scoreTag = '<span>Congrats, You got <p>' + userScore +'</p> out of<p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>Nice, You got <p>' + userScore +'</p> out of<p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }else{
        let scoreTag = '<span>Sorry, You got only <p>' + userScore +'</p> out of<p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){
            clearInterval(counter); //clear counter
            timeText = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}


function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        timeLine.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time < 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}



function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector('.total_que');
    let totalQuesCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;

}


