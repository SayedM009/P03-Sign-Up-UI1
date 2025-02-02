const form = document.querySelector(".sign__up-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const signUpBtn = document.querySelector(".sign__up-form-button");
const signUpInputs = document.querySelectorAll(".sign__up-form-input");

function success(input) {
  const errorElement = input.parentElement.parentElement.querySelector(
    ".sign__up-form-error"
  );
  input.classList.add("sucess");
  input.classList.remove("error");
  errorElement.classList.add("hide");
}

function error(input, message) {
  const errorElement = input.parentElement.parentElement.querySelector(
    ".sign__up-form-error"
  );
  input.classList.add("error");
  errorElement.textContent = message;
  errorElement.classList.remove("hide");
}

function getInputName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkInputs(inputsArr) {
  inputsArr.forEach((input) => {
    if (input.value.length === 0) {
      error(input, `${getInputName(input)} is required`);
    } else {
      success(input);
    }
  });
}

function checkInputLength(input, min, max) {
  if (input.value.length < min) {
    error(input, `${getInputName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    error(
      input,
      `${checkInputLength(input)} must be less than ${max} characters`
    );
  } else {
    success(input);
  }
}

function checkEmail(input) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (re.test(input.value.trim())) {
    success(input);
  } else {
    error(input, "Email is not valid");
  }
}

function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    error(input2, "Passwords do not match");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs([username, email, password, confirmPassword]);
  checkInputLength(username, 3, 15);
  checkInputLength(password, 6, 25);
  checkInputLength(confirmPassword, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, confirmPassword);
  e.defaultPrevented();
});

signUpInputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.nextElementSibling.classList.add("label__up");
    this.classList.add("input__border--process");
  });

  input.addEventListener("blur", function () {
    if (!this.value) this.nextElementSibling.classList.remove("label__up");
  });
});
