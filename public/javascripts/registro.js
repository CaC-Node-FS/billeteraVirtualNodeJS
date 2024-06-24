document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    const contrasenaInput = document.getElementById("contrasena");
    const confirmarContrasenaInput = document.getElementById("confirmar_contrasena");
    const contrasenaError = document.getElementById("contrasenaError");
    const registroExitosoMsg = document.getElementById("registroExitoso");

    // mostrar u ocultar la contraseña
    function togglePasswordVisibility(input) {
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    }

    // mostrar u ocultar la contraseña 
    document.getElementById("togglePassword1").addEventListener("click", function () {
        togglePasswordVisibility(contrasenaInput);
    });


    document.getElementById("togglePassword2").addEventListener("click", function () {
        togglePasswordVisibility(confirmarContrasenaInput);
    });

    // validar la fortaleza de la contraseña
    function validarFortalezaContrasena(contrasena) {
        if (contrasena.length < 8) {
            return false;
        }
        if (!/[a-z]/.test(contrasena)) {
            return false;
        }
        if (!/[A-Z]/.test(contrasena)) {
            return false;
        }
        if (!/\d/.test(contrasena)) {
            return false;
        }
        return true;
    }

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (contrasenaInput.value !== confirmarContrasenaInput.value) {
            contrasenaError.textContent = "Las contraseñas no coinciden";
        } else if (!validarFortalezaContrasena(contrasenaInput.value)) {
            contrasenaError.textContent = "La contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, un número y un símbolo.";
        } else {
            contrasenaError.textContent = "";
            registrationForm.reset();
            registroExitosoMsg.style.display = "block";
            setTimeout(function () {
                registroExitosoMsg.style.display = "none";
                window.location.href = "login.html";
            }, 3000);
        }
    });
});