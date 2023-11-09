let eventos = [];
let arr = []; //Almacenamiento local, arreglo de eventos//

const nombreEvento = document.querySelector("#nombreEvento");
const fechaEvento = document.querySelector("#fechaEvento");
const botnAgregar = document.querySelector("#agregar");
const listaEventos = document.querySelector("#listaEventos");

const json = cargar (); //Muestre los eventos guardados//

try{
    arr = JSON.parse(json); //Acomode en un Json los eventos guardados//
}catch (error) {
    arr = []
}
eventos = arr ? [...arr] : []; //Si hay eventos, agregelos al arreglo ...//
mostrarEventos();

document.querySelector("form").addEventListener("submit", e => { //Cuando escuche el click en submit del formulario, va hacer lo siguiente://
    e.preventDefault(); //Va a poner el campo vacio//
    agregarEvento();
});

function agregarEvento() {

    if (nombreEvento.value === "" || fechaEvento.value === "") {
        return; //corta la función y no ejecuta nada mas//
    }

    if (diferenciaFecha(fechaEvento.value) < 0) {
        return;
    }

    const nuevoEvento = {
        id: (Math.random() * 100).toString(36).slice(3), //Jeison se separa por comas//
        nombre: nombreEvento.value,
        fecha: fechaEvento.value,
    };

    eventos.unshift(nuevoEvento);//agrega uno o más elementos al inicio del arreglo, y devuelve la nueva longitud del arreglo//

    guardar(JSON.stringify(eventos)); //Estrictamente haga la conversion de eventos a JSON//
    nombreEvento.value = "";
    mostrarEventos();
}

function diferenciaFecha(destino) { //Tiene parametro//
    let fechaDestino = new Date(destino);
    let fechaActual = new Date();//Trae la fecha actual, fecha, hora y zona horaria//
    let diferencia = fechaDestino.getTime() - fechaActual.getTime(); //tome la fecha del evento y restele la fecha de hoy y de un total//
    let dias = Math.ceil(diferencia / (1000 * 3600 * 24));//Aproxima al entero mas cercano//
    return dias;
}

function mostrarEventos() {
    const eventosHTML = eventos.map((evento) => { //Dibuja las clases o arreglos en el HTML//
        return `
        <br><div class="evento">
            <div class="dias">
            <span class="diasFaltantes"><strong>${diferenciaFecha(evento.fecha)}</strong></span
            <span class="texto">días para</span>
        
        </div>

            <div class="nombreEvento"><strong>${evento.nombre}</strong></div>
            <div class="fechaEvento">${evento.fecha}</div>
                <div class="acciones">
                    <button data-id ="${evento.id}" class="eliminar">Eliminar</button>
                    </div>
                    </div><br>                                                                                                
            `;

    });
    listaEventos.innerHTML = eventosHTML.join("");
    document.querySelectorAll('.eliminar').forEach(button => {
        button.addEventListener("click", e => {
            const id =button.getAttribute('data-id');
            eventos = eventos.filter(evento => evento.id !== id);//Filtrar eventos, diferente de//

            guardar(JSON.stringify(eventos)); //Estrictamente haga la conversion de eventos a JSON//

            mostrarEventos();
        });

    });
}

function guardar(datos){
    localStorage.setItem("lista", datos)//Guarda lo que esta en el arreglo, así se actualice la pag.//
}

function cargar(){
    return localStorage.getItem("lista");
}

//${} Llamar la función//
//# - id//
//. - Clase//