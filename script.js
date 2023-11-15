function calculate(str){

    let expression = str.trim()
    let a = ""
    let b = ""
    let operator
    let end
    if(expression.length <= 0){
        return 0
    }
    for(let i = 0; i < expression.length; i++){
        if(operator == null && /[*/+-/^]/.test(expression[i]) && i != 0 && expression[i] != "."){
            operator = expression[i]
            continue
        }
        if(operator != null){
            if(/[*/(]/.test(expression[i])){
                foundOperator = false
                let parenthesis = []
                let newExpression = ""
                for(let i = expression.indexOf(operator)+1; i < expression.length; i++){
                    if(foundOperator && /\D/.test(expression[i]) || expression[i] != ".") {
                        end = i              
                        break
                    }

                    if(expression[i] == "("){
                        parenthesis.push(i)
                        continue
                    }
                    if(expression[i] == ")"){
                        if(parenthesis[parenthesis.length-1] == "("){
                            parenthesis.pop()
                            if(parenthesis.length <= 0) break
                        }
                    }

                    if(/[*/+-/^]/.test(expression[i]) && expression[i] != ".") {
                        foundOperator = true
                    }
                  
                    newExpression += expression[i]
                }
                b = calculate(newExpression)
                break
            }
            if(expression[i] == ")"){
                end = i+1
                break
            }
            b += expression[i]
            continue
        }

        if(/[()]/.test(expression[i])) continue
        a += expression[i]
    }
    let removeAt = ""
    if(end == null) removeAt = expression
    for(let i = 0; i < end; i++){
        removeAt += expression[i]
    }
    a = Number(a)
    b = Number(b)
    if(operator == null) return a
    let equals = 0
    switch(operator){

        case "+":
            equals = a+b
            break
        case "-":
            equals = a-b
            break
        case "/":
            equals = a/b
            break
        case "*":
            equals = a*b
            break
        case "^":
            equals = Math.pow(a, b)
            break
        default:
            return "Something went wrong"
    }
    expression= expression.replace(removeAt, "")

    if(expression.length > 0) return calculate(equals+expression)
    return equals
  
}