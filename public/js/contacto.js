
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const confirmacionMsg = document.getElementById("confirmacionMsg");

    // Oculta el mensaje de confirmación al cargar la página.
    confirmacionMsg.style.display = "none";

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        //Muestra el msj de confirmación
        confirmacionMsg.style.display = "block";

        // Reinicia el formulario después de 5 seg.
        setTimeout(function () {
            contactForm.reset();
            confirmacionMsg.style.display = "none";
        }, 5000); 
    });
});