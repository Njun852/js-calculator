const operation = {
    "+" : (a, b) => a+b,
    "-" : (a, b) => a-b,
    "/" : (a, b) => a/b,
    "*" : (a, b) => a*b
}

const operators = /[\+\-\*/]/
const multDiv = /[\*/^]/

//PEMDAS
function calculate(str){
    str = str.trim()
    str = str.replaceAll("PI","3.14159265")
    str = str.replaceAll("e", "2.71828183")
    let a = ""
    let b = ""
    let operator = ""

    let index = 0
    while(index < str.length){

        if(str[index] == "("){
            let subStr = parenthesis(str, index)
            if(operator){
                b = calculate(subStr[0])
                break
            }
            a = calculate(subStr[0])

            index = subStr[1]
            continue
        }
        if(str[index] == "^"){
            let pow = power(a, str, index)
            if(operator){
                b = pow[0]
                break
            }
            a = pow[0]
            index = pow[1]
            continue

        }
        if(operators.test(str[index])){
            if(multDiv.test(str[index]) && operator){
                
                let subStr = str.split("")
                subStr.splice(0, index)
                b = calculate(b+subStr.join(""))
                break
            }
            if(operator) break
            operator = str[index]
            index ++
            continue
        }
        if(operator){
            b += str[index]
            index ++
            continue
        }
        a += str[index]
        index ++
    }
    if(b == "") return a
    a = operation[operator](Number(a), Number(b)).toString()
   
    return a
}


function parenthesis(str, currentIndex){

    let index = currentIndex+1 // dont start where u found the (
    let set = ["("]
    let subStr = ""
    let endIndex = index
    while(index < str.length){

        if(str[index] == "("){
            set.push("(")
        }

        if(str[index] == ")"){
            if(!set[set.length-1] == "("){
                set.push(")")
                subStr += str[index]
                index++
                continue
               
            }
            set.pop()
            if(set.length == 0) {
                endIndex = index+1
                break
            }
        }
        subStr += str[index]
        index++
    }
    return [subStr, endIndex]
}

function power(hand, str, indexFound){

   
    let subStr = ""
    let skip = indexFound
    if(str[indexFound+1] == "(") {
        let a = parenthesis(str, indexFound+1)
        subStr = calculate(a[0])
        skip = a[1]

    }else{
        skip++
        for(let i = indexFound+1; i < str.length; i++){
            skip++
            if(operators.test(str[i])) {
                break
            }
            subStr+= str[i]
        }
    }

    return [Math.pow(Number(hand), Number(subStr).toString()), skip]
}


