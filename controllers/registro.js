const registroExito = '<div><img src="images/okIcon.png" width="35"><p>¡Registro exitoso!</p><button id="registro-button">CERRAR</button></div>'
const registroError = '<div><img src="images/errorIcon.png" width="35"><p>El usuario ya existe</p><button id="registro-button">CERRAR</button></div>'

document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm")
    const contrasenaInput = document.getElementById("contrasena")
    const confirmarContrasenaInput = document.getElementById("confirmar_contrasena")
    const contrasenaError = document.getElementById("contrasenaError")
    const registroExitosoMsg = document.getElementById("registroExitoso")

    // mostrar u ocultar la contraseña
    function togglePasswordVisibility(input) {
        if (input.type === "password") {
            input.type = "text"
        } else {
            input.type = "password"
        }
    }

    // mostrar u ocultar la contraseña 
    document.getElementById("togglePassword1").addEventListener("click", function () {
        togglePasswordVisibility(contrasenaInput)
    })


    document.getElementById("togglePassword2").addEventListener("click", function () {
        togglePasswordVisibility(confirmarContrasenaInput)
    })

    // validar la fortaleza de la contraseña
    function validarFortalezaContrasena(contrasena) {
        if (contrasena.length < 8) {
            return false
        }
        if (!/[a-z]/.test(contrasena)) {
            return false
        }
        if (!/[A-Z]/.test(contrasena)) {
            return false
        }
        if (!/\d/.test(contrasena)) {
            return false
        }
        return true
    }

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault()
        if (contrasenaInput.value !== confirmarContrasenaInput.value) {
            contrasenaError.textContent = "Las contraseñas no coinciden"
        } else if (!validarFortalezaContrasena(contrasenaInput.value)) {
            contrasenaError.textContent = "La contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, un número y un símbolo."
        } else {

            //let payload = new FormData(registrationForm)  **No funciona, crea un objeto vacío, no sé por qué.

            document.getElementById("registroForm-button").disabled = true

            let registerData = {
                nombre: document.getElementById('nombre').value,
                dni: document.getElementById('dni').value,
                usuario: document.getElementById('usuario').value,
                email: document.getElementById('email').value,
                direccion: document.getElementById('direccion').value,
                telefono: document.getElementById('telefono').value,
                contrasena: document.getElementById('contrasena').value
            }

            contrasenaError.textContent = ""
            registrationForm.reset()
            //registroExitosoMsg.style.display = "block"
          
            fetch("http://localhost:3000/auth/authRegister", {
                headers: {                    
                    "Content-Type": "application/json",
                },
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify(registerData)
            })
            .then((response) => response.json())
            .then((obj) => {
                const dialog = document.createElement("dialog")
                dialog.setAttribute("id", "popupRegistro")
                dialog.setAttribute("open", "true")
                if(!obj.auth) {
                    dialog.innerHTML = registroError
                } else {
                    dialog.innerHTML = registroExito
                }
                document.body.appendChild(dialog)
                document.getElementById("registro-button").addEventListener('click', () => {      
                    document.body.removeChild(dialog)
                    document.getElementById("registroForm-button").disabled = false
                })
                // setTimeout(function () {
                //     registroExitosoMsg.style.display = "none"
                //     window.location.href = "/login"
                // }, 5000)
            })

        }

    })
})