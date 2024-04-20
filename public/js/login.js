const form = document.getElementById("login-form");
    
    form.addEventListener("submit", function(event) {

      event.preventDefault();

      const usuario = document.getElementById("usuario")

      const clave = document.getElementById("clave")

      if(document.getElementById("usuario").value == "") {
      
        document.getElementById("login-message-error-user").style.visibility = "visible"
      
      } else {
      
        document.getElementById("login-message-error-user").style.visibility = "hidden"
      }

      if(document.getElementById("clave").value.length < 8) {
      
        document.getElementById("login-message-error-password").style.visibility = "visible"
      
      } else {
      
        document.getElementById("login-message-error-password").style.visibility = "hidden"
      }
      
      if(document.getElementById("usuario").value !== "" && document.getElementById("clave").value.length >= 8) {
      
        form.requestSubmit()

        //form.submit()   //No funciona, no sé por qué (HTTP ERROR 405)
      
        document.getElementById("login-message-error-user").style.visibility = "hidden"
      
        document.getElementById("login-message-error-password").style.visibility = "hidden"
      
      }

      form.reset()
    
    });

    const passwordIcon = document.getElementById("login-eye-icon");
    
    const password = document.getElementById("clave");
    
    passwordIcon.addEventListener("click", () => {   
    
      const type = password.getAttribute("type") === "password" ? "text" : "password";      
      
      password.setAttribute("type", type);
      
      passwordIcon.classList.toggle("bi-eye");
   
    });