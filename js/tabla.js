export default function crearTabla(lista) {
    const tabla = document.createElement('table');
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));
    return tabla;
}

const baseURL = "http://localhost:3000";
const spinnerContainer = $('spinnerContainer');

function $(id) {
    return document.getElementById(id);
}

function crearCabecera(item) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    for (const key in item) {
        const th = document.createElement('th');
        let txt = document.createTextNode(key.toUpperCase()); // key => id, nombre, apellido etc.
        if (key.toUpperCase() != "ID") {

            th.appendChild(txt);
            tr.appendChild(th);
            tr.style.background = "rosybrown";
        }
    }
    thead.appendChild(tr);
    return thead;
}

function crearCuerpo(lista) {
    const tbody = document.createElement('tbody');
    lista.forEach(element => {
        const tr = document.createElement('tr');
        for (const key in element) {
            const td = document.createElement('td');
            if (key.toUpperCase() != "ID") {
                let txt = document.createTextNode(element[key]);
                if (key.toUpperCase() == "YEAR") {
                    var select = document.createElement("select");
                    select.addEventListener("change", (e) => {
                        spinnerContainer.style.visibility = "visible";
                        let auto=element;
                        auto["year"]=e.target.value;
                        modificarFetch(auto);
                    });
                    select.name = "anio";
                    select.id = "anio"
                    for (let i = 0; i <= 100; i++) {
                        if (1920+i==element[key] || 1920 +i>= 2000){
                            var option = document.createElement("option");
                            option.value = 1920 + i;
                            option.text = 1920 + i;
                            if (1920 + i == element[key]) {
                                option.selected = true;
                            }
                            select.appendChild(option);
                        }
                    }
                    td.appendChild(select);
                } else {
                    td.appendChild(txt);
                }
                tr.appendChild(td);
            }
        }
        if (element.hasOwnProperty('id')) {
            tr.setAttribute('data-id', element['id']);
        }
        tbody.appendChild(tr);
    });
    return tbody;
}

function modificarFetch(object) {
    const options = {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(object)
    }
    return fetch(`${baseURL}/editarYear`, options)
    .then(res => {
        return res.ok ? res.json() : Promise.reject(res);
    })
    .then(data => {
            console.log(data);
            spinnerContainer.style.visibility ="hidden";
        })
        .catch(error => {
            console.log(error);
        })
}