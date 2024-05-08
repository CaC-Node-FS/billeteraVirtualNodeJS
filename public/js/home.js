
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
let mainCuenta = '<h6 id="cuenta_header">Cuenta <span><i id="home-eye-icon" class="bi-eye bi-eye-slash"  onclick="verSaldo()"></i></span></h6><section id="cuenta_datos"><p>CA $ 111 111111/1 </p><p>$<span id="saldo">1.111.111,11</span></p><p>CBU: 1111111111111111111111</p></section><h6 id="movimientos_header">Movimientos</h6><section id="cuenta_movimientos"><table><thead><tr><th class="fecha">Fecha</th><th class="tipo">Tipo</th><th class="concepto">Concepto</th><th class="importe" >Importe</th></tr></thead><tbody><tr><td class="fecha">15/04</td><td class="tipo">Crédito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">&nbsp$1.111,11</td></tr><tr><td class="fecha">16/04</td><td class="tipo">Débito</td><td class="concepto">Lorem ipsum dolor sit, amet consectetur adipisicing</td><td class="importe">-$1.111,11</td></tr><tr><td class="fecha">15/04</td><td class="tipo">Crédito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">&nbsp$1.111,11</td></tr><tr><td class="fecha">16/04</td><td class="tipo">Débito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">-$1.111,11</td></tr><tr><td class="fecha">15/04</td><td class="tipo">Crédito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">&nbsp$1.111,11</td></tr><tr><td class="fecha">16/04</td><td class="tipo">Débito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">-$1.111,11</td></tr></tbody></table></section>'

let mainPerfil = '<div class="container d-flex text-center mt-4 mx-sm-auto" style="max-width: 30rem;"><div class="row"><section class="col-sm-12"><article class="d-flex flex-row justify-content-center flex-sm-nowrap flex-wrap"><!-- Consultamos en la BBDD, si el usuario no subió su foto se mostrara por defecto la img "perfil-hombre" o "perfil-mujer" dependiendo el sexo--><img src="" id="img-perfil" class="mx-auto rounded-circle" alt="Foto de perfíl"><script>let genero="hombre" //Posteriormente se buscara el género en BBDDif(genero=="mujer"){document.getElementById("img-perfil").src="../../public/media/perfil-mujer.webp"} else if(genero == "hombre") {document.getElementById("img-perfil").src="../../public/media/perfil-hombre.webp"} else {document.getElementById("img-perfil").src="../../public/media/logo.png"}</script><span class="d-flex align-self-center fw-bold fs-2" id="ape-nom">BUSCAR APELLIDO + NOMBRE EN BBDD</span></article><article class="datos-usuario mt-5 fs-3"><p><i class="bi bi-envelope"></i> Email: <span id="email">BUSCAR EMAIL EN BBDD</span></p><p><i class="bi bi-telephone"></i> Teléfono: <span id="tel">BUSCAR TELÉFONO DE BBDD</span></p><p><i class="bi bi-credit-card-2-front"></i> Nro de Cuenta: <span id="nro-cuenta">BUSCAR NRO DE CUENTA DE BBDD</span></p><p><i class="bi bi-bank"></i> CVU: <span id="cvu">BUSCAR TELÉFONO DE BBDD</span></p></article></section>/div></div>'

let info = document.getElementById("info")

let botons = document.querySelectorAll(".boton")

if(document.getElementById("saldo")) {
    document.getElementById("saldo").style.visibility = 'hidden'
}

function verSaldo() {

    const saldo = document.getElementById("saldo")

    const saldoIcon = document.getElementById("home-eye-icon");

    saldoIcon.classList.toggle("bi-eye");
    
    if (saldo.style.visibility === 'hidden') {
        saldo.style.visibility = 'visible';
    } else {
        saldo.style.visibility = 'hidden';
    }

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
            nuevoMain = parser.parseFromString(mainCuenta, 'text/html').body
            info.innerHTML = nuevoMain.innerHTML
            body.style.backgroundImage = "url('https://c4.wallpaperflare.com/wallpaper/357/951/753/account-bank-account-banking-business-wallpaper-preview.jpg')"
            break
        case infoTransferencias:
            nuevoMain = parser.parseFromString('<h1 style="color:white">Transferencias</h1>', 'text/html').body
            info.innerHTML = nuevoMain.innerHTML
            body.style.backgroundImage = "url('https://img.pikbest.com/wp/202408/mobile-financial-investment-money-transfer-made-easy-golden-coins-fall-into-phone-for_9737863.jpg!w700wp')"
            break
        case infoInversiones:
            nuevoMain = parser.parseFromString('<h1 style="color:white">Inversiones</h1>', 'text/html').body
            info.innerHTML = nuevoMain.innerHTML
            body.style.backgroundImage = "url('https://www.kreditbee.in/blog/content/images/size/w2000/2023/06/shutterstock_2280192657-min.jpg')"
            break
        case infoPagos:
            nuevoMain = parser.parseFromString('<h1 style="color:white">Pagos</h1>', 'text/html').body
            info.innerHTML = nuevoMain.innerHTML
            body.style.backgroundImage = "url('https://ecommerce-europe.eu/wp-content/uploads/2017/05/I-pay-online-payment-solutions-risks-261020151-701x300-c-center.jpg')"
            break
        case infoPerfil:
            nuevoMain = parser.parseFromString(mainPerfil, 'text/html').body
            info.innerHTML = nuevoMain.innerHTML
            body.style.backgroundImage = "url('https://st2.depositphotos.com/1008371/5256/i/450/depositphotos_52560247-stock-photo-large-crowd-of-people.jpg')"
            break
    }
})
})