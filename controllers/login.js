const form = document.getElementById("login")
    
    form.addEventListener("submit", function(event) {

      event.preventDefault()

      const usuario = document.getElementById("usuario")

      const clave = document.getElementById("clave")

      if(document.getElementById("usuario").value == "") {

        //event.preventDefault()
      
        document.getElementById("login-message-error-user").style.visibility = "visible"
      
      } else {
      
        document.getElementById("login-message-error-user").style.visibility = "hidden"
      }

      if(document.getElementById("clave").value.length < 8) {

        //event.preventDefault()
      
        document.getElementById("login-message-error-password").style.visibility = "visible"
      
      } else {
      
        document.getElementById("login-message-error-password").style.visibility = "hidden"
      }
      
      if(document.getElementById("usuario").value !== "" && document.getElementById("clave").value.length >= 8) {
      
        document.getElementById("login-message-error-user").style.visibility = "hidden"
      
        document.getElementById("login-message-error-password").style.visibility = "hidden"

        //form.requestSubmit()

        //form.submit()   //No funciona, no sé por qué (HTTP ERROR 405)

        const formData = new FormData(form)
      
       
        fetch("http://localhost:3000/login", {mode: 'cors'})
          .then((response) => console.log(response.status))  
        
          // .then(response => response.json())
          // .then(data => {
          //   console.log(data)
          // })
          // .catch(error => {
          //   console.log('Error:', error)
          // }) 

        // fetch('https://localhost:3000/login', {
        //   method: 'POST',
        //   body: formData,
        // })
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log(data)
        //   })
        //   .catch(error => {
        //     console.error('Error:', error)
        //   })
      
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