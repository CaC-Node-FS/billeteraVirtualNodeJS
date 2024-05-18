
const parser = new DOMParser();

let infoCuenta = "cuenta"
let infoTransferencias = "transferencias"
let infoInversiones = "inversiones"
let infoPagos = "pagos"
let infoPerfil = "perfil"

let body = document.getElementById("body")

let cuenta = '<article id="info"><section id="cuenta_datos"><p>CA $ 111 111111/1 </p><p>$<span id="saldo">1.111.111,11</span><i id="home-eye-icon" class="bi-eye bi-eye-slash" onclick="verSaldo()"></i></p><p id="CBU">CBU: 1111111111111111111111</p><img src="../../public/media/copy-icon.png" id="home-copy-CBU" onclick="copiarCBU()"><span id="CBU-copiado">copiado</span></section><section id="cuenta_tarjeta"><figure><p><img src="../../public/media/logo.png" id="logo_tarjeta"> <span id="numero_tarjeta">111111111111</span>1111</p> <figcaption>Débito</figcaption></figure><p>Titular María Rosa</p><p>Fecha de vencimiento: 01/29</p><p>Cuenta asociada CA $ 111 111111/1</p></section><section id="cuenta_movimientos"><div class="accordion" id="accordionPanel"><div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"aria-controls="panelsStayOpen-collapseOne">Últimos movimientos</button></h2><div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show"><div class="accordion-body"><table><thead><tr><th class="fecha">Fecha</th><th class="tipo">Tipo</th><th class="concepto">Concepto</th><th class="importe">Importe</th></tr></thead><tbody><tr><td class="fecha">15/04</td><td class="tipo">Crédito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">&nbsp$1.111,11</td></tr><tr><td class="fecha">16/04</td><td class="tipo">Débito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">-$1.111,11</td></tr><tr><td class="fecha">15/04</td><td class="tipo">Crédito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">&nbsp$1.111,11</td></tr><tr><td class="fecha">16/04</td><td class="tipo">Débito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">-$1.111,11</td></tr><tr><td class="fecha">15/04</td><td class="tipo">Crédito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">&nbsp$1.111,11</td></tr><tr><td class="fecha">16/04</td><td class="tipo">Débito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">-$1.111,11</td></tr></tbody></table></div></div></div><div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">Historial de movimientos</button></h2><div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse"><div class="accordion-body">Falta agregar calendario de búsqueda</div></div></div></div></section></article>'

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
            document.getElementById("movHistoricos").parentNode.removeChild(document.getElementById("movHistoricos").parentNode.lastChild)
        }
    }    
})