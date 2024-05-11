
const parser = new DOMParser();

let botonCuenta = document.querySelector("#cuenta")
botonCuenta.style.opacity = 1.0

let infoCuenta = "cuenta"
let infoTransferencias = "transferencias"
let infoInversiones = "inversiones"
let infoPagos = "pagos"
let infoPerfil = "perfil"

let body = document.getElementById("body")

body.style.backgroundImage = "url('https://c4.wallpaperflare.com/wallpaper/357/951/753/account-bank-account-banking-business-wallpaper-preview.jpg')"

//La idea es que los "info" de cada función esten guardados del lado del servidor y se reemplacen dinámicamente según el botón que presiona el usuario (no sé si esto se resuelve de esta manera).
//Como ejemplo de como funcionaría, copié en string el main de cuenta.html.
let cuenta = '<article id="info"><section id="cuenta_datos"><p>CA $ 111 111111/1 </p><p>$<span id="saldo">1.111.111,11</span><i id="home-eye-icon" class="bi-eye bi-eye-slash" onclick="verSaldo()"></i></p><p id="CBU">CBU: 1111111111111111111111</p><img src="../../public/media/copy-icon.png" id="home-copy-CBU" onclick="copiarCBU()"><span id="CBU-copiado">copiado</span></section><section id="cuenta_tarjeta"><figure><p><img src="../../public/media/logo.png" id="logo_tarjeta"> <span id="numero_tarjeta">111111111111</span>1111</p> <figcaption>Débito</figcaption></figure><p>Titular María Rosa</p><p>Fecha de vencimiento: 01/29</p><p>Cuenta asociada CA $ 111 111111/1</p></section><section id="cuenta_movimientos"><div class="accordion" id="accordionPanel"><div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"aria-controls="panelsStayOpen-collapseOne">Últimos movimientos</button></h2><div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show"><div class="accordion-body"><table><thead><tr><th class="fecha">Fecha</th><th class="tipo">Tipo</th><th class="concepto">Concepto</th><th class="importe">Importe</th></tr></thead><tbody><tr><td class="fecha">15/04</td><td class="tipo">Crédito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">&nbsp$1.111,11</td></tr><tr><td class="fecha">16/04</td><td class="tipo">Débito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">-$1.111,11</td></tr><tr><td class="fecha">15/04</td><td class="tipo">Crédito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">&nbsp$1.111,11</td></tr><tr><td class="fecha">16/04</td><td class="tipo">Débito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">-$1.111,11</td></tr><tr><td class="fecha">15/04</td><td class="tipo">Crédito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">&nbsp$1.111,11</td></tr><tr><td class="fecha">16/04</td><td class="tipo">Débito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">-$1.111,11</td></tr></tbody></table></div></div></div><div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">Historial de movimientos</button></h2><div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse"><div class="accordion-body">Falta agregar calendario de búsqueda</div></div></div></div></section></article>'

let perfil = '<div id="perfil-estilo" class="container d-flex text-center mt-4 mx-sm-auto" style="max-width: 30rem;"> <div class="row"> <section class="col-sm-12"> <article class="d-flex flex-row justify-content-center flex-sm-nowrap flex-wrap"><img src="../../public/media/perfil-mujer.webp" id="img-perfil" class="mx-auto rounded-circle" alt="Foto de perfíl"><span class="d-flex align-self-center fw-bold fs-2" id="ape-nom">BUSCAR APELLIDO + NOMBRE EN  BBDD</span></article><article class="datos-usuario mt-5 fs-3"><p><i class="bi bi-envelope"></i> Email: <span id="email">BUSCAR EMAIL EN BBDD</span></p><p><i class="bi bi-telephone"></i> Teléfono: <span id="tel">BUSCAR TELÉFONO DE BBDD</span></p><p><i class="bi bi-credit-card-2-front"></i> Nro de Cuenta: <span id="nro-cuenta">BUSCAR NRO DE CUENTA DE BBDD</span></p><p><i class="bi bi-bank"></i> CVU: <span id="cvu">BUSCAR TELÉFONO DE BBDD</span></p></article></section></div></div>'

let vista = document.getElementById("vista")

let botons = document.querySelectorAll(".boton")

if(document.getElementById("saldo")) {
    document.getElementById("saldo").style.visibility = 'hidden'
}

function verSaldo() {

    const saldo = document.getElementById("saldo")

    const saldoIcon = document.getElementById("home-eye-icon");

    saldoIcon.classList.toggle("bi-eye");
    
    saldo.style.visibility = saldo.style.visibility === 'hidden' ? 'visible' : 'hidden'
}

function copiarCBU() {
    const cbu = document.getElementById("CBU");
    navigator.clipboard.writeText(cbu.textContent)
    document.getElementById("CBU-copiado").style.visibility = 'visible'
    setTimeout(() => {document.getElementById("CBU-copiado").style.visibility = 'hidden'}, 500)
}

botons.forEach((x) =>{x.addEventListener("click", function() {
    //vista de botones por defecto
    x.style.opacity = 1.0

    //activar/desactivar vistas
    botons.forEach((y) => {
        if (y != x) {
            y.style.opacity = 0.6
        }
    })

    let nuevoMain

    //reemplazo dinámico de <article id="info"> según botón activo
    switch(x.id) {
        case infoCuenta:
            vista.innerHTML = parser.parseFromString(cuenta, 'text/html').body.innerHTML
            body.style.backgroundImage = "url('https://c4.wallpaperflare.com/wallpaper/357/951/753/account-bank-account-banking-business-wallpaper-preview.jpg')"
            break
        case infoTransferencias:
            vista.innerHTML = parser.parseFromString('<h1>Transferencias</h1>', 'text/html').body.innerHTML
            body.style.backgroundImage = "url('https://img.pikbest.com/wp/202408/mobile-financial-investment-money-transfer-made-easy-golden-coins-fall-into-phone-for_9737863.jpg!w700wp')"
            break
        case infoInversiones:
            vista.innerHTML = parser.parseFromString('<h1>Inversiones</h1>', 'text/html').body.innerHTML
            body.style.backgroundImage = "url('https://www.kreditbee.in/blog/content/images/size/w2000/2023/06/shutterstock_2280192657-min.jpg')"
            break
        case infoPagos:
            vista.innerHTML = parser.parseFromString('<h1>Pagos</h1>', 'text/html').body.innerHTML
            body.style.backgroundImage = "url('https://ecommerce-europe.eu/wp-content/uploads/2017/05/I-pay-online-payment-solutions-risks-261020151-701x300-c-center.jpg')"
            break
        case infoPerfil:
            vista.innerHTML = parser.parseFromString(perfil, 'text/html').body.innerHTML
            body.style.backgroundImage = "url('https://st2.depositphotos.com/1008371/5256/i/450/depositphotos_52560247-stock-photo-large-crowd-of-people.jpg')"
            break
    }
})
})