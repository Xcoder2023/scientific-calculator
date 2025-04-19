const display = document.getElementById("display");
let currentInput = "";

const updateDisplay = () => {
  display.textContent = currentInput || "0";
};

const calculate = () => {
  try {
    const expression = currentInput
      .replace(/π/g, "Math.PI")
      .replace(/e/g, "Math.E")
      .replace(/√/g, "Math.sqrt")
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/log/g, "Math.log10")
      .replace(/ln/g, "Math.log")
      .replace(/(\d+)!/g, (_, n) => factorial(Number(n)))
      .replace(/\^/g, "**");

    const result = eval(expression);
    currentInput = result.toString();
    updateDisplay();
  } catch {
    currentInput = "Error";
    updateDisplay();
  }
};

const factorial = (n) => {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
};

document.querySelectorAll(".btn").forEach((btn) => {
  const num = btn.dataset.number;
  const func = btn.dataset.func;
  const action = btn.dataset.action;

  if (num !== undefined) {
    btn.addEventListener("click", () => {
      currentInput += num;
      updateDisplay();
    });
  }

  if (func !== undefined) {
    btn.addEventListener("click", () => {
      if (["+", "-", "*", "/", "^", "!"].includes(func)) {
        currentInput += func;
      } else if (["π", "e"].includes(func)) {
        currentInput += func;
      } else if (func === "sqrt") {
        currentInput += "√(";
      } else {
        currentInput += func + "(";
      }
      updateDisplay();
    });
  }

  if (action !== undefined) {
    btn.addEventListener("click", () => {
      if (action === "clear") {
        currentInput = "";
      } else if (action === "delete") {
        currentInput = currentInput.slice(0, -1);
      } else if (action === "equals") {
        calculate();
      }
      updateDisplay();
    });
  }
});

updateDisplay();
