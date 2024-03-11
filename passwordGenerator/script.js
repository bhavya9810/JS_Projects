const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolscheck = document.querySelector("#symbols");
const indicator = document.querySelector("[dataIndicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbolsString = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let password = "";
let passwordLength = 10;
let checkCount = 1;

//set strength color to grey
setIndicator("#ccc");
handleSlider();
// set password length
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerHTML = passwordLength;

  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize =
    ((passwordLength - min) * 100) / (max - min) + " % 100%";
}
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0px 0px 12px 1px ${color} `;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
  return getRndInteger(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));
}
function generateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}
function generateSymbols() {
  return symbolsString.charAt(getRndInteger(0, symbolsString.length));
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSymbol = false;

  if (uppercaseCheck.checked) hasUpper = true;

  if (lowercaseCheck.checked) hasLower = true;

  if (numbersCheck.checked) hasNumber = true;

  if (symbolscheck.checked) hasSymbol = true;

  if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasUpper || hasLower) &&
    (hasNumber || hasSymbol) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else setIndicator("#f00");
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied";
  } catch (e) {
    copyMsg.innerText = "Failed";
  }

  copyMsg.classList = "active";

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

function shufflePassword(array) {
  //using fisher yates method
  for (let i = array.length - 1; i > 0; i--) {
    //random J, find out using random function
    const j = Math.floor(Math.random() * (i + 1));
    //swap number at i index and j index
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

function handleCheckBoxChange() {
  checkCount = 0;

  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCount++;
    }
  });

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}
allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

inputSlider.addEventListener("input", function (e) {
  passwordLength = e.target.value;
  console.log(passwordLength);
  handleSlider();
});

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value != "") {
    copyContent();
    console.log("event occured");
  }
});

generateBtn.addEventListener("click", () => {
  if (checkCount == 0) return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  //   let's start the journey to find new password
  console.log("starting the journey");
  //to find new password ,first remove old password
  password = "";

  //let's put the stuff mentioned by checkboxes
  // if (uppercaseCheck.checked) {
  //   password += generateUpperCase();
  // }
  // if (lowercaseCheckcaseCheck.checked) {
  //   password += generateLowerCase();
  // }
  // if (numbersCheck.checked) {
  //   password += generateRandomNumber();
  // }
  // if (symbolsCheck.checked) {
  //   password += generateSymbols
  //   ();
  // }

  let funcArr = [];

  if (uppercaseCheck.checked) {
    funcArr.push(generateUpperCase());
  }

  if (lowercaseCheck.checked) {
    funcArr.push(generateLowerCase());
  }
  if (symbolscheck.checked) {
    funcArr.push(generateSymbols());
  }

  if (numbersCheck.checked) {
    funcArr.push(generateRandomNumber());
  }

  //compulsory addition
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i];
  }

  console.log("compulsory addition done");

  //remaining addition
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIndex = getRndInteger(0, funcArr.length);
    console.log("random index " + randIndex);
    password = password + funcArr[randIndex];
  }
  console.log("remaining addition done");

  password = shufflePassword(Array.from(password));
  console.log("password shuffled");

  passwordDisplay.value = password;
  calcStrength();
});

//shuffle the password
