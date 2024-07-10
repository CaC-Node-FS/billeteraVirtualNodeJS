
const parser = new DOMParser();

let infoCuenta = "cuenta"
let infoTransferencias = "transferencias"
let infoInversiones = "inversiones"
let infoPagos = "pagos"
let infoPerfil = "perfil"

let body = document.getElementById("body")

if(document.getElementById("saldo")) {
    document.getElementById("saldo").style.visibility = 'hidden'
}

function verSaldo() {

    const saldo = document.getElementById("saldo")

    const saldoIcon = document.getElementById("home-eye-icon");

    saldoIcon.classList.toggle("bi-eye");
    
    saldo.style.visibility = saldo.style.visibility == 'hidden' ? 'visible' : 'hidden'
}

function copiarCBU() {
    const cbu = document.getElementById("CBU");
    navigator.clipboard.writeText(cbu.textContent)
    document.getElementById("CBU-copiado").style.visibility = 'visible'
    setTimeout(() => {document.getElementById("CBU-copiado").style.visibility = 'hidden'}, 500)
}

document.getElementById("movHistoricos").addEventListener("submit", function(event) {
    event.preventDefault()
    if(document.getElementById("buscarMovButton").value == "BUSCAR") {
        document.getElementById("buscarMovButton").value = "LIMPIAR"
        let movHistoricos = document.createElement("h6")
        movHistoricos.innerHTML = "Agregar tabla de movimientos históricos"
        document.getElementById("movHistoricos").parentNode.appendChild(movHistoricos)
    } else {
        if(document.getElementById("buscarMovButton").value == "LIMPIAR") {
            document.getElementById("buscarMovButton").value = "BUSCAR"
            document.getElementById("movHistoricos").parentNode.removeChild(document.getElementById("movHistoricos").parentNode.lastChild)
            document.getElementById("movHistoricos").reset()
        }
    }    
})