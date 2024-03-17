const enabledSpaceText = "Disable Space Separation e.g 54 considered as 5 and 4";
const disabledSpaceText = 'Enable space-separated digits e.g. treat "54" as one number in "54 +"';
const Ans = document.getElementById("Ans");
let postfix, spaceSeparationStatus = false;
let stack, stackTop;
let i, a, b, result, pEval, ch;

$(".cal").click(function (e) {
  e.preventDefault();
  postfix = document.getElementById("Postfix").value;
  spaceSeparationStatus = document.getElementById("postfix-switch").checked;
  if (spaceSeparationStatus) {
    postfix = processSpacedExpression(postfix);
  }
  else {
    postfix = postfix.replace(/\s/g, "").split("");
  }

  stack = [] ; 
  stackTop = -1;

  try {
    for (i = 0; i <= postfix.length; i++) {
      ch = postfix[i];
  
      if (!isNaN(parseInt(ch))) {
        stack[++stackTop] = parseInt(ch);
      } else if (ch == "+" || ch == "-" || ch == "*" || ch == "/") {
        b = stack[stackTop];
        stackTop--;
        a = stack[stackTop];
        stackTop--;
  
        if (ch == "+") {
          result = a + b;
        } else if (ch == "-") {
          result = a - b;
        } else if (ch == "*") {
          result = a * b;
        } else if (ch == "/") {
          result = a / b;
        }
        stack[++stackTop] = result;
      }
    }
  
    pEval = stack[stackTop];
    if (isNaN(pEval)) {
      throw "Invalid Expression";
    }
    Ans.value = pEval;
  }
  catch (e) {
    Ans.value = "Error while parsing or Invalid Expression";
  }

});

document.getElementById("postfix-switch").addEventListener("change", function () {
  let spaceSeparationText = document.getElementById("postfix-switch_text");
  spaceSeparationText.innerText = this.checked ? enabledSpaceText : disabledSpaceText;
});
