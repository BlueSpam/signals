function ready() {
  var signup = document.querySelector(".signup--thoughts");

  if (signup) {
    var signup_form = document.getElementById("bd-form");
    var signup_input = signup_form.querySelector("input");
    var signup_button = signup_form.querySelector("button");

    signup_form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (signup_input.value) {
        var is_valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signup_input.value);

        if (is_valid) {
          var xhr = new XMLHttpRequest();

          xhr.onload = function () {
            if (xhr.status == 400) {
              var signup_response = xhr.response;

              if (signup_response.includes("Enter a valid email address")) {
                signup_form.classList.add("error");
              } else if (signup_response.includes(" not confirmed")) {
                location.href = "/thoughts/subscriber";
              } else if (signup_response.includes(" subscribed")) {
                location.href = "/thoughts/subscriber";
              }
            } else {
              location.href = "/thoughts/subscriber";
            }

            signup_button.disabled = false;
          };

          xhr.open("POST", "https://api.buttondown.email/v1/subscribers");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader(
            "Authorization",
            "Token 249ccb33-6751-4562-9686-2b3aedd84144"
          );
          xhr.send(
            JSON.stringify({
              email: signup_input.value,
            })
          );

          signup_button.disabled = true;
        } else {
          signup_form.classList.add("error");
        }
      }
    });

    signup_input.addEventListener("focus", function () {
      signup_form.classList.remove("error");
    });

    signup_input.addEventListener("input", function () {
      signup_form.classList.remove("error");
    });

    signup_input.addEventListener("click", function () {
      signup_form.classList.remove("error");
    });
  }
}

export { ready };
