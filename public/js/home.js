
const parser = new DOMParser();

let botonCuenta = document.querySelector("#cuenta")
botonCuenta.style.opacity = 1.0

let infoCuenta = "cuenta"
let infoTransferencias = "transferencias"
let infoInversiones = "inversiones"
let infoPagos = "pagos"
let infoPerfil = "perfil"

//La idea es que los "info" de cada función esten guardados del lado del servidor y se reemplacen dinámicamente según el botón que presiona el usuario (no sé si esto se resuelve de esta manera).
//Como ejemplo de como funcionaría, copié en string el main de cuenta.html.
let mainCuenta = '<div id="info"><article id="info_cuenta"><h6 id="cuenta_header">Cuenta <span><i id="home-eye-icon" class="bi-eye bi-eye-slash" onclick="verSaldo()"></i></span></h6><section id="cuenta_datos"><p>CA $ 111 111111/1 </p><p>$<span id="saldo">1.111.111,11</span></p><p>CBU: 1111111111111111111111</p></section><h6 id="movimientos_header">Movimientos</h6><section id="cuenta_movimientos"><table><thead><tr><th class="fecha">Fecha</th><th class="tipo">Tipo</th><th class="concepto">Concepto</th><th class="importe">Importe</th></tr></thead><tbody><tr><td class="fecha">15/04</td><td class="tipo">Crédito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">&nbsp$1.111,11</td></tr><tr><td class="fecha">16/04</td><td class="tipo">Débito</td><td class="concepto">Lorem ipsum dolor sit, amet consectetur adipisicing</td><td class="importe">-$1.111,11</td><tr><tr><td class="fecha">15/04</td><td class="tipo">Crédito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">&nbsp$1.111,11</td></tr><tr><td class="fecha">16/04</td><td class="tipo">Débito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">-$1.111,11</td></tr><tr><td class="fecha">15/04</td><td class="tipo">Crédito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">&nbsp$1.111,11</td></tr><tr><td class="fecha">16/04</td><td class="tipo">Débito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">-$1.111,11</td></tr><tr><td class="fecha">15/04</td><td class="tipo">Crédito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">&nbsp$1.111,11</td></tr><tr><td class="fecha">16/04</td><td class="tipo">Débito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">-$1.111,11</td></tr><tr><td class="fecha">15/04</td><td class="tipo">Crédito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">&nbsp$1.111,11</td></tr><tr><td class="fecha">16/04</td><td class="tipo">Débito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">-$1.111,11</td></tr><tr><td class="fecha">15/04</td><td class="tipo">Crédito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">&nbsp$1.111,11</td></tr><tr><td class="fecha">16/04</td><td class="tipo">Débito</td><td class="concepto">Lorem ipsum dolor sit amet</td><td class="importe">-$1.111,11</td></tr></tbody></table></section></article></div>'

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
        } else {
            console.log(y.id)
        }
    })

    //reemplazo dinámico de <div id="info"> según botón activo
    switch(x.id) {
        case infoCuenta:
            info.replaceChild(parser.parseFromString(mainCuenta, 'text/html').body.firstChild,info.children[0])
            document.getElementById("saldo").style.visibility = 'hidden'
            break
        case infoTransferencias:
            info.replaceChild(parser.parseFromString(`<h1>Transferencias</h1>`, 'text/html').body.firstChild,info.children[0])
            break
        case infoInversiones:
            info.replaceChild(parser.parseFromString(`<h1>Inversiones</h1>`, 'text/html').body.firstChild,info.children[0])
            break
        case infoPagos:
            info.replaceChild(parser.parseFromString(`<h1>Pagos</h1>`, 'text/html').body.firstChild,info.children[0])
            break
        case infoPerfil:
            info.replaceChild(parser.parseFromString(`<h1>Perfil</h1>`, 'text/html').body.firstChild,info.children[0])
            break
    }
})
})