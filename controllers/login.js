const loginForm = document.getElementById("login")
    
    loginForm.addEventListener("submit", async function(event) {

      event.preventDefault()

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
      
        document.getElementById("login-message-error-user").style.visibility = "hidden"
      
        document.getElementById("login-message-error-password").style.visibility = "hidden"

        let loginData = {
          usuario: document.getElementById('usuario').value,
          clave: document.getElementById('clave').value,
        }

        loginForm.reset()
         
        try {
          const res = await fetch ("http://localhost:3000/auth/authLogin", {
            headers: {                    
              "Content-Type": "application/json",
            },
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(loginData)
          })
          const data = await res.json()
          if(data.usuario){
          // if(Object.keys(data).lengt > 0) {
            document.getElementById('login-message-error-access').style.visibility = 'hidden'
            location.assign('/home')
          } else {
            document.getElementById('login-message-error-access').style.visibility = 'visible'
          }
        }
        catch (err) {
          console.log(err)          
        }

      }
    
    })

    const passwordIcon = document.getElementById("login-eye-icon")
    
    const password = document.getElementById("clave")
    
    passwordIcon.addEventListener("click", () => {   
    
      const type = password.getAttribute("type") === "password" ? "text" : "password"
      
      password.setAttribute("type", type)
      
      passwordIcon.classList.toggle("bi-eye")
   
    })