
const parser = new DOMParser()

let datos

let buscarCBUbutton = document.getElementById("buscarCBU-button")

let buscarCBUInput = document.getElementById("transferencias-nueva-buscarCBU")

let transferirButton = document.getElementById("transferencias-transferir-button")

let cancelartransferenciarButton = document.getElementById("transferencias-cancelar-button")

let eliminarDestinatarioAgendado = document.querySelectorAll(".transferencias-agenda-eliminar")

let activarDestinatarioAgendado = document.querySelectorAll(".transferencias-agenda-activar")

////////////////////////////////////////////
function formatDate(d) {
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  let year = d.getFullYear()

  if (month.length < 2) 
      month = '0' + month
  if (day.length < 2) 
      day = '0' + day

  return [year, month, day].join('-')
}

async function activarDestinatarioAgendadoFunction (element) {

  let datos = {}
  let datosDestino = {}
  datosDestino.titularDestino = element.getElementsByTagName("td")[0].innerHTML
  datosDestino.cbuDestino = element.getElementsByTagName("td")[1].innerHTML

  try {
    const res = await fetch ("http://localhost:3000/transferencias/destinatarioAgendado", {
      headers: {                    
        "Content-Type": "application/json",
      },
      mode: 'cors',
      method: 'POST',     
      body: JSON.stringify(datosDestino)
    })
    datos = await res.json()

    datos.fecha = formatDate(new Date())
    datos.titularDestino = datosDestino.titularDestino
    datos.cbuDestino = datosDestino.cbuDestino

    let transferirDialog = `<h5>Nueva Transferencia</h5><form><label for="transferencias-desdeAgenda-monto">Monto de transferencia</label><input id="transferencias-desdeAgenda-monto" type="text"></form><div class="text-center"><button id="dialog-aceptarDesdeAgenda-button">ACEPTAR</button></div>`

    let dialogMonto = document.createElement("dialog")

    dialogMonto.setAttribute("id", "popupTransferencia")

    dialogMonto.setAttribute("open", "true")

    dialogMonto.innerHTML = transferirDialog

    document.body.appendChild(dialogMonto)

    document.getElementById("dialog-aceptarDesdeAgenda-button").addEventListener('click', () => {

      if(document.getElementById("transferencias-desdeAgenda-monto").value !== '') {

        datos.monto = parseFloat(document.getElementById("transferencias-desdeAgenda-monto").value)
      
        document.body.removeChild(dialogMonto)

        transferirDialog = `<h5>Nueva Transferencia</h5><p>Fecha: ${datos.fecha}</p><p>Origen: CA$ ${datos.cuenta} </p><p>Titular destino: ${datos.titularDestino}</p><p>CBU destino: ${datos.cbuDestino}</p><p>Monto a transferir: ${datos.monto} </p><div class="text-center"><button id="dialog-confirmarDesdeAgenda-button">CONFIRMAR</button><button id="dialog-cancelarDesdeAgenda-button">CANCELAR</button></div>`

        let dialog = document.createElement("dialog")

        dialog.setAttribute("id", "popupTransferencia")

        dialog.setAttribute("open", "true")

        dialog.innerHTML = transferirDialog

        document.body.appendChild(dialog)

        document.getElementById("dialog-cancelarDesdeAgenda-button").addEventListener('click', () => {
      
          document.body.removeChild(dialog)
    
        })

        document.getElementById("dialog-confirmarDesdeAgenda-button").addEventListener('click', async () => {

          document.body.removeChild(dialog)
          
          try {
            const res = await fetch ("http://localhost:3000/transferencias/transferir", {
              headers: {                    
                "Content-Type": "application/json",
              },
              mode: 'cors',
              method: 'POST',     
              body: JSON.stringify(datos)
            })

            
          }
          catch (err) {
            console.log('error ',err)          
          }
        })
      }
    })
  }
  catch (err) {
    console.log('error ',err)          
  }
}

activarDestinatarioAgendado.forEach((element) => {

  activar = () => {activarDestinatarioAgendadoFunction(element.parentNode)}
  
  element.addEventListener("click", activar)

})

function eliminarDestinatarioAgendadoFunction (element) {

  let transferirDialog = '<h5>Nueva Transferencia</h5><p>¿Desea eliminar este contacto de su agenda?</p><div class="text-center"><button id="dialog-confirmar-button">CONFIRMAR</button><button id="dialog-cancelar-button">CANCELAR</button></div>'

  const dialog = document.createElement("dialog")

  dialog.setAttribute("id", "popupTransferencia")

  dialog.setAttribute("open", "true")

  dialog.innerHTML = transferirDialog

  document.body.appendChild(dialog)
  
  document.getElementById("dialog-confirmar-button").addEventListener('click', async () => {

    document.body.removeChild(dialog)

    element.parentNode.remove()

    let cuentaDestino = {
      cuenta_destino : element.cells[1].textContent.slice(3).slice(0,-1)
    }
    
    try {
      const res = await fetch ("http://localhost:3000/transferencias/eliminarAgendado", {
        headers: {                    
          "Content-Type": "application/json",
        },
        mode: 'cors',
        method: 'POST',     
        body: JSON.stringify(cuentaDestino)
      })
    }
    catch (err) {
      console.log('error ',err)          
    }
  })

  document.getElementById("dialog-cancelar-button").addEventListener('click', () => {
      
    document.body.removeChild(dialog)
    
  })

}

eliminarDestinatarioAgendado.forEach((element) => {

  eliminar = () => {eliminarDestinatarioAgendadoFunction(element.parentNode)}
  
  element.addEventListener("click", eliminar)

})

function resetNuevaTransferencia () {
  
  document.getElementById("transferencias-nueva-buscarCBU").value = ''
  
  document.getElementById("transferencias-nueva-titular").value = ''

  document.getElementById("transferencias-nueva-CBU").value = ''
      
  document.getElementById("transferencias-nueva-alias").value = ''

  document.getElementById("transferencias-nueva-monto").value = ''  

  buscarCBUbutton.disabled = false

}

document.getElementById("transferencias-nueva-monto").addEventListener("input", (e) => {
  let value = e.target.value
  e.target.value = value.replace(/[^A-Z\d-]/g, "")
})

buscarCBUbutton.addEventListener("click", async () => {

  datos = {}

  buscarCBUbutton.disabled = true

  buscarCBUInput.disabled = true

  let CBU_valor = parseInt(document.getElementById("transferencias-nueva-buscarCBU").value)

  if(CBU_valor) {

    let CBU = {CBU: CBU_valor}

    try {
      const res = await fetch ("http://localhost:3000/transferencias", {
        headers: {                    
          "Content-Type": "application/json",
        },
        mode: 'cors',
        method: 'POST',     
        body: JSON.stringify(CBU)
      })
      datos = await res.json()
      if(Object.keys(datos).length > 0) {
        document.getElementById("transferencias-nueva-titular").value = datos.titularDestino
        document.getElementById("transferencias-nueva-CBU").value = datos.cbuDestino
        document.getElementById("transferencias-nueva-alias").value = datos.aliasDestino
      } else {

        let transferirDialog = '<h5>Nueva Transferencia</h5><p>CBU no encontrado</p><div class="text-center"><button id="dialog-aceptar-button">ACEPTAR</button></div>'

        const dialog = document.createElement("dialog")

        dialog.setAttribute("id", "popupTransferencia")

        dialog.setAttribute("open", "true")

        dialog.innerHTML = transferirDialog

        document.body.appendChild(dialog)

        document.getElementById("dialog-aceptar-button").addEventListener('click', () => {
      
          document.body.removeChild(dialog)

          buscarCBUbutton.disabled = false

          buscarCBUInput.disabled = false

          resetNuevaTransferencia()
  
        })
      }
    }
    catch (err) {
      console.log('error ',err)          
    }

  } else {    

    let transferirDialog = '<h5>Nueva Transferencia</h5><p>CBU no encontrado</p><div class="text-center"><button id="dialog-aceptar-button">ACEPTAR</button></div>'

    const dialog = document.createElement("dialog")

    dialog.setAttribute("id", "popupTransferencia")

    dialog.setAttribute("open", "true")

    dialog.innerHTML = transferirDialog

    document.body.appendChild(dialog)

    document.getElementById("dialog-aceptar-button").addEventListener('click', () => {
      
      document.body.removeChild(dialog)

      buscarCBUbutton.disabled = false

      buscarCBUInput.disabled = false

      resetNuevaTransferencia()
  
    })

  }

})

transferirButton.addEventListener('click', async function(event) {
  
  buscarCBUbutton.disabled = true
  
  cancelartransferenciarButton.disabled = true

  let monto = parseFloat(document.getElementById("transferencias-nueva-monto").value)
  
  if(datos && monto)  {

    if(monto <= datos.saldo) {     

      datos.fecha = formatDate(new Date())

      datos.monto = monto

      let transferirDialog = `<h5>Nueva Transferencia</h5><p>Fecha: ${datos.fecha}</p><p>Origen: CA$ ${datos.cuenta} </p><p>Titular destino: ${datos.titularDestino}</p><p>CBU destino: ${datos.cbuDestino}</p><p>Monto a transferir: ${datos.monto} </p><div class="text-center"><button id="dialog-confirmar-button">CONFIRMAR</button><button id="dialog-cancelar-button">CANCELAR</button></div>`

      const dialog = document.createElement("dialog")

      dialog.setAttribute("id", "popupTransferencia")

      dialog.setAttribute("open", "true")

      dialog.innerHTML = transferirDialog

      document.body.appendChild(dialog)

      document.getElementById("dialog-cancelar-button").addEventListener('click', () => {
      
        document.body.removeChild(dialog)

        buscarCBUbutton.disabled = false

        buscarCBUInput.disabled = false
  
        cancelartransferenciarButton.disabled = false

        resetNuevaTransferencia()
  
      })

      document.getElementById("dialog-confirmar-button").addEventListener('click', async () => {

        document.body.removeChild(dialog)

        try {
          const res = await fetch ("http://localhost:3000/transferencias/transferir", {
            headers: {                    
              "Content-Type": "application/json",
            },
            mode: 'cors',
            method: 'POST',     
            body: JSON.stringify(datos)
          })        
               
          
    
          document.getElementById("transferencias-nueva-monto").value = ''
            
          buscarCBUbutton.disabled = false
      
          buscarCBUInput.disabled = false
      
          cancelartransferenciarButton.disabled = false
    
          resetNuevaTransferencia()
        }
        catch (err) {
          console.log('error ',err)          
        }
      })
    } else {
      
      let transferirDialog = '<h5>Nueva Transferencia</h5><p>Saldo insuficiente</p><div class="text-center"><button id="dialog-aceptar-button">ACEPTAR</button></div>'

      const dialog = document.createElement("dialog")

      dialog.setAttribute("id", "popupTransferencia")

      dialog.setAttribute("open", "true")

      dialog.innerHTML = transferirDialog

      document.body.appendChild(dialog)

      document.getElementById("dialog-aceptar-button").addEventListener('click', () => {
      
        document.body.removeChild(dialog)

        document.getElementById("transferencias-nueva-monto").value = ''
        
        buscarCBUbutton.disabled = false
  
        buscarCBUInput.disabled = false
  
        cancelartransferenciarButton.disabled = false

        resetNuevaTransferencia()
  
      })  

    }

  } else {
    
    let transferirDialog = '<h5>Nueva Transferencia</h5><p>Debe completar todos los campos</p><div class="text-center"><button id="dialog-aceptar-button">ACEPTAR</button>'

    const dialog = document.createElement("dialog")

    dialog.setAttribute("id", "popupTransferencia")

    dialog.setAttribute("open", "true")

    dialog.innerHTML = transferirDialog

    document.body.appendChild(dialog)

    document.getElementById("dialog-aceptar-button").addEventListener('click', () => {      
      
      document.body.removeChild(dialog)

      buscarCBUbutton.disabled = false
  
      cancelartransferenciarButton.disabled = false
  
    })

  }
})

cancelartransferenciarButton.addEventListener('click', () => {

  buscarCBUInput.disabled = false

  resetNuevaTransferencia()

})