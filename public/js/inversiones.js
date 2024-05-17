
const parser = new DOMParser()

let nuevoPlazoFijo = {}

let cuenta = "123 456789/0"

let tasa = "30%"

const confirmarPFdiaolog = '<h6> Nuevo plazo fijo confirmación</h6><section><p>Caja de ahorro: CA $</p><p>Tipo de plazo fijo: </p><p>Clase de renovación: </p><p>Monto $: </p><p>Plazo en días: </p><p>TNA: </p><div class="text-center"><p>¿Confirma constitución de plazo fijo?</p><button id="nuevoPF-confirmar">CONFIRMAR</button><button id="nuevoPF-cancelar">CANCELAR</button></div></section>'

document.getElementById("montoPF").addEventListener('change', e => {
    e.currentTarget.value = parseFloat(e.currentTarget.value).toFixed(2)
})

document.getElementById("nuevoPF-form").addEventListener("submit", (e) => {
    e.preventDefault()
    let dataPF = new FormData(e.target)
    nuevoPlazoFijo.tipo = dataPF.get("tipoPF")
    nuevoPlazoFijo.renovacion = dataPF.get("renovacionPF")
    if(nuevoPlazoFijo.renovacion == "sin") {nuevoPlazoFijo.renovacion = "Sin renovación (acred. al vto.)"}
    if(nuevoPlazoFijo.renovacion == "parcial") {nuevoPlazoFijo.renovacion = "Parcial (sólo capital)"}
    if(nuevoPlazoFijo.renovacion == "total") {nuevoPlazoFijo.renovacion = "Total (capital + intereses)"}
    nuevoPlazoFijo.monto = parseFloat(dataPF.get("montoPF"))
    nuevoPlazoFijo.plazo = parseInt(dataPF.get("diasPF"))
    
    nuevoPlazoFijo.tasa = tasa

    let pfdiaolog = confirmarPFdiaolog

    pfdiaolog = pfdiaolog.slice(0,pfdiaolog.indexOf('CA $') + 4) + cuenta + pfdiaolog.slice(pfdiaolog.indexOf('CA $') + 4)

    pfdiaolog = pfdiaolog.slice(0,pfdiaolog.indexOf('Tipo de plazo fijo:') + 20) + nuevoPlazoFijo.tipo + pfdiaolog.slice(pfdiaolog.indexOf('Tipo de plazo fijo:') + 20)

    pfdiaolog = pfdiaolog.slice(0,pfdiaolog.indexOf('Clase de renovación:') + 21) + nuevoPlazoFijo.renovacion + pfdiaolog.slice(pfdiaolog.indexOf('Clase de renovación:') + 21)

    pfdiaolog = pfdiaolog.slice(0,pfdiaolog.indexOf('Monto $:') + 9) + nuevoPlazoFijo.monto.toFixed(2) + pfdiaolog.slice(pfdiaolog.indexOf('Monto $:') + 9)

    pfdiaolog = pfdiaolog.slice(0,pfdiaolog.indexOf('Plazo en días:') + 15) + nuevoPlazoFijo.plazo + pfdiaolog.slice(pfdiaolog.indexOf('Plazo en días:') + 15)

    pfdiaolog = pfdiaolog.slice(0,pfdiaolog.indexOf('TNA:') + 5) + nuevoPlazoFijo.tasa + pfdiaolog.slice(pfdiaolog.indexOf('TNA:') + 5)

    const dialog = document.createElement("diaolog")

    dialog.setAttribute("id", "popupPF")

    dialog.innerHTML = pfdiaolog

    document.body.appendChild(dialog)

    document.getElementById("nuevoPF-confirmar").addEventListener('click', () => {

      document.getElementById("nuevoPF-form").reset()      
      
      document.body.removeChild(dialog)
    
    })

    document.getElementById("nuevoPF-cancelar").addEventListener('click', () => {

      document.getElementById("nuevoPF-form").reset()      
      
      document.body.removeChild(dialog)
    
    })

})

