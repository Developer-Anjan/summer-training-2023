document.querySelector("#submit_btn").addEventListener("click", (e) => {
  e.preventDefault();

  const password = document.querySelector("#password").value;

  const expr = /[A-Za-z0-9-]/g;

  if (password.length < 6) {
    document.querySelector("#error-msg").innerText =
      "Password should be of minimum 6 characters";
    if (!password.match(expr)) {
      document.querySelector("#error-msg").innerText =
        "Password should contain atleast one capital letter, one small letter, one number and one special character";
    }
  } else {
    document.querySelector("#error-msg").innerText = "";
  }

  console.log(password);
});
