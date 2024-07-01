
const parser = new DOMParser()

let nuevoPlazoFijo = {}

let cuenta = "123 456789/0"

let tasa = "30%"

const confirmarPFdialog = '<h6> Nuevo plazo fijo confirmación</h6><section><p>Caja de ahorro: CA $</p><p>Tipo de plazo fijo: </p><p>Clase de renovación: </p><p>Monto $: </p><p>Plazo en días: </p><p>TNA: </p><div class="text-center"><p>¿Confirma constitución de plazo fijo?</p><button id="nuevoPF-confirmar">CONFIRMAR</button><button id="nuevoPF-cancelar">CANCELAR</button></div></section>'

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

  let pfDialog = confirmarPFdialog

  pfDialog = pfDialog.slice(0,pfDialog.indexOf('CA $') + 4) + cuenta + pfDialog.slice(pfDialog.indexOf('CA $') + 4)

  pfDialog = pfDialog.slice(0,pfDialog.indexOf('Tipo de plazo fijo:') + 20) + nuevoPlazoFijo.tipo + pfDialog.slice(pfDialog.indexOf('Tipo de plazo fijo:') + 20)

  pfDialog = pfDialog.slice(0,pfDialog.indexOf('Clase de renovación:') + 21) + nuevoPlazoFijo.renovacion + pfDialog.slice(pfDialog.indexOf('Clase de renovación:') + 21)

  pfDialog = pfDialog.slice(0,pfDialog.indexOf('Monto $:') + 9) + nuevoPlazoFijo.monto.toFixed(2) + pfDialog.slice(pfDialog.indexOf('Monto $:') + 9)

  pfDialog = pfDialog.slice(0,pfDialog.indexOf('Plazo en días:') + 15) + nuevoPlazoFijo.plazo + pfDialog.slice(pfDialog.indexOf('Plazo en días:') + 15)

  pfDialog = pfDialog.slice(0,pfDialog.indexOf('TNA:') + 5) + nuevoPlazoFijo.tasa + pfDialog.slice(pfDialog.indexOf('TNA:') + 5)

  const dialog = document.createElement("dialog")

  dialog.setAttribute("id", "popupPF")

  dialog.setAttribute("open", "true")

  dialog.innerHTML = pfDialog

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

//Sección compra-venta de divisas
const monedaUno = document.getElementById("moneda-uno")
const monedaDos = document.getElementById("moneda-dos")
const cantidadUno = document.getElementById("cantidad-uno")
const cantidadDos = document.getElementById("cantidad-dos")
const infoTaza = document.getElementById("info-taza")
const btnCambiarSelect = document.getElementById("btn-cambiar-select")
const btnComprar = document.getElementById("btn-comprar")

//Fetch de API con cotización de monedas extranjeras y actualización del DOM 
function calcular(){

  const monUno = monedaUno.value
  const monDos = monedaDos.value

  fetch(`https://api.exchangerate-api.com/v4/latest/${monUno}`)
  .then(res => res.json())
  .then(data => {
    deshabilitarOptionRepetida(monedaUno,monedaDos)

    const taza = data.rates[monDos]
    infoTaza.innerText = `1 ${monUno} = ${taza} ${monDos}`

    cantidadDos.value = (cantidadUno.value*taza).toFixed(2)

  })

}

function deshabilitarOptionRepetida(monedaSelect1,monedaSelect2){
  for (let option of monedaSelect2.options){
    option.disabled = false
  }

  if(monedaSelect1.value){
    const optionToDisable = monedaSelect2.querySelector(`option[value="${monedaSelect1.value}"]`)
  
    if(optionToDisable){
      optionToDisable.disabled = true

      if (monedaSelect2.value === optionToDisable.value) {
        for(let option of monedaSelect2.options){
          if(!option.disabled){
            monedaSelect2.value = option.value
            break
          }
        }
      }
      
    }
    
  }

}

//Event listeners
monedaUno.addEventListener("change",()=>{
  deshabilitarOptionRepetida(monedaUno,monedaDos)
  calcular()
})
monedaDos.addEventListener("change",calcular)
cantidadUno.addEventListener("input",calcular)
cantidadDos.addEventListener("input",calcular)

btnCambiarSelect.addEventListener("click", ()=>{
  const temp = monedaUno.value
  monedaUno.value = monedaDos.value
  monedaDos.value = temp
  deshabilitarOptionRepetida(monedaUno,monedaDos)
  calcular()
})

calcular()