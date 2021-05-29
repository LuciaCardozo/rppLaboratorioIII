import crearTabla from "./tabla.js";
const inputNombre = $('inputNombre');
const inputModel = $('inputModel');
const inputId = $('txtId');
const divPrincipal = $('divPrincipal');
const alta = $("alta");
const divTabla = $('divTabla');
const spinnerContainer = $('spinnerContainer');
const cerrar = $('cerrar');
const buttonPlus = $('buttonPlus');
const inputYear = $("select");
let listaAux = [];
const baseURL = "http://localhost:3000";

function $(id) {
    return document.getElementById(id);
}

window.addEventListener('load', inicializarManejadores);

function inicializarManejadores() {
    ejecutarGet();
    alta.addEventListener("click", altaPersona);
    buttonPlus.addEventListener("click", () => {
        limpiarFormulario();
        divPrincipal.style.display = "initial";
        alta.style.display = "initial"
    });
    cerrar.addEventListener("click", (e) => {
        e.preventDefault();
        divPrincipal.style.display = "none";
    });
}

//ASYNC FETCH
async function getData() {
    try {
        let res = await fetch(`${baseURL}/autos`);
        let data = await res.json();
        const autos = [];
        data.forEach(element => {
            let nuevoAuto = {
                id: element.id,
                make: element.make,
                model: element.model,
                year: element.year
            }
            autos.push(nuevoAuto);
        })
        listaAux = autos;
        divTabla.appendChild(crearTabla(listaAux));
    }
    catch (res) {
        console.log(res);
    }
    finally {
        spinnerContainer.style.visibility = "hidden";
    }
}
function ejecutarGet() {
    spinnerContainer.style.visibility = "visible";
    setTimeout(() => {
        getData();
    }, 2000);
}
//FETCH PROMISE ALTA
function altaFetch(object) {
    const options = {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(object)
    }
    return fetch(`${baseURL}/nuevoAuto`, options)
        .then(res => {
            return res.ok ? res.json() : Promise.reject(res);
        })
        .then(data => {
            limpiarFormulario();
            divTabla.innerHTML = "";
            spinnerContainer.style.visibility = "visible";
            setTimeout(() => {
                divTabla.appendChild(crearTabla(listaAux));
                spinnerContainer.style.visibility = "hidden";
            }, 2000);
        })
        .catch(error => {
            console.log(error);
        })
}
function altaPersona(e) {
    e.preventDefault();
    inputNombre.style.border = "black";
    inputModel.style.border = "black";
        console.log(inputYear.selectedIndex);
    let autoJson = { id: inputId.value, make: inputNombre.value, model: inputModel.value, year: inputYear.value};
    if(autoJson.make.length>=3 && autoJson.model.length>=3){
        listaAux.push(autoJson);
        altaFetch(autoJson);
    }else{
        inputNombre.style.border = "2px solid red";
        inputModel.style.border = "2px solid red";
    }
}

function limpiarFormulario() {
    inputNombre.value = "";
    inputModel.value = "";
    divPrincipal.style.display = "none";
}