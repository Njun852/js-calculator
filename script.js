const expressionBtns = document.querySelectorAll(".expression")
const upperOutput = document.querySelector("#upper")
const lowerOutput = document.querySelector("#lower")

const equal = document.querySelector("#equal")
const clear = document.querySelector("#clear")
const del = document.querySelector("#del")
let expression = "";
for(let i = 0; i < expressionBtns.length; i++){
    expressionBtns[i].addEventListener("click", ()=>{
        resetOutputTxtStyle()
        if(expressionBtns[i].textContent == "0" && expression == "") return
        if(operators.test(expressionBtns[i].textContent) && 
        operators.test(expression[expression.length-1])) return
        inputExpression(expressionBtns[i].innerText)
    })
}

function inputExpression(input){
    if(getComputedStyle(lowerOutput).getPropertyValue("display") == "none")
    lowerOutput.style.display = "block"

    expression += input
    upperOutput.textContent = expression
    lowerOutput.textContent = calculate(expression)
}

equal.addEventListener("click", ()=>{
    upperOutput.style.fontSize = "1.7rem"
    lowerOutput.style.fontSize = "3rem"
    lowerOutput.style.opacity = "1"
    expression = calculate(expression)
})

function resetOutputTxtStyle(){
    upperOutput.style.fontSize = "3rem"
    lowerOutput.style.fontSize = "1.7rem"
    lowerOutput.style.opacity = "0.7"
}
function absoluteClear(){
    lowerOutput.style.display = "none"
    expression = ""
    upperOutput.textContent = "0"
}
clear.addEventListener("click", ()=>{
    resetOutputTxtStyle()
    absoluteClear()
})
del.addEventListener("click", ()=>{
    expression = expression.split("")
    expression.pop()
    expression = expression.join("")
    if(expression == ""){
        absoluteClear()
        return
    }
    inputExpression("")
})
