const contedorAzul = document.getElementById("lista");
const ingresoTexto = document.getElementById('ingresoTexto');
const agregar = document.getElementById('agregar');
const contador = document.getElementById('contador');
let completedCount = 0;

// Función para actualizar el contador
function updateCounter() {
    contador.value = completedCount;
}

// Función para obtener datos del servidor
async function obtenerDatos() {
    try {
        contedorAzul.innerHTML = "";
        
        const respuesta = await fetch("http://localhost:3000/api/task");
        const datos = await respuesta.json();

        if (datos.length === 0) {
            console.log('No hay tareas');
        }

        datos.forEach(tarea => {
            let li = document.createElement("li");
            let checkBox = document.createElement("input");
            let p = document.createElement("p");
            let close = document.createElement("SPAN");
            
            
            close.innerHTML = '🗑️';
            checkBox.type = "checkbox";
            checkBox.checked = tarea.estado;
            p.innerHTML = tarea.nombre;
            
            contedorAzul.appendChild(li);
            li.appendChild(checkBox);
            li.appendChild(p);
            p.appendChild(close);
            checkBox.className='Check'
            p.className="CTNtext"

            close.id = tarea.id;
            close.className = 'delet';
            close.addEventListener("click", () => {
                vicino(tarea.id);
                if (checkBox.checked) {
                    completedCount--;
                }
                updateCounter();
            });

            checkBox.addEventListener("change", () => {
                tarea.estado = checkBox.checked;
                cambio(tarea);
                checkBox.checked ? completedCount++ : completedCount--;
                updateCounter();
            });

         

            
        });
    } catch (error) {
        console.error(error);
    }
}

// Función para eliminar datos del servidor
async function vicino(id) {
    try {
        await fetch(`http://localhost:3000/api/task/${id}`, {
            method: 'DELETE',
        });
        console.log(`Se eliminó la tarea con id ${id}`);
        obtenerDatos();
    } catch (error) {
        console.error(error);
    }
}

// Función para agregar datos al servidor
async function darDatos() {
    if (ingresoTexto.value === '' || ingresoTexto.value === null) {
        alert('Space is empty');
    } else {
        try {
            let tarea = {
                id: Date.now(),
                nombre: ingresoTexto.value,
                estado: false
            };

            const respuesta = await fetch("http://localhost:3000/api/task", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(tarea)
            });
            console.log(`Se agregó satisfactoriamente la tarea ${tarea.nombre}`);
            ingresoTexto.value = '';
            obtenerDatos();
        } catch (error) {
            console.error(error);
        }
    }
}

// Función para actualizar datos en el servidor
async function cambio(objeto) {
    try {
        await fetch(`http://localhost:3000/api/task/${objeto.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objeto)
        });
        console.log(`Estado de la tarea después del cambio: ${objeto.estado}`);
        obtenerDatos();
    } catch (error) {
        console.error(error);
    }
}

// Función para agregar ítems a la lista y al servidor
function annadirLista() {
    if (ingresoTexto.value === '') {
        alert('Space is empty');
        return;
    }
    darDatos();
}

// Inicializar la obtención de datos al cargar la página
obtenerDatos();

// Agregar event listeners
agregar.addEventListener('click', annadirLista);
ingresoTexto.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        annadirLista();
    }
});

// const agregar = document.getElementById('agregar');
// const lista = document.getElementById('adds');
// const adds = document.getElementById('lista');
// const contador = document.getElementById('contador');

// let completedCount = 0;



// // Función para actualizar el contador
// function updateCounter() {
//     contador.value = completedCount;
//     }
    
//     // Función para agregar ítems a la lista
//     function annadirLista() {
//         // Crear un nuevo elemento de lista
//         const newItem = document.createElement('li');
        
//         // Crear un checkbox
//         const checkbox = document.createElement('input');
//         checkbox.type = 'checkbox';
//         checkbox.addEventListener('change', function() {
//             if (checkbox.checked) {
//                 completedCount++;
//                 } else {
//                     completedCount--;
//                     }
//                     updateCounter();
//                     });
                    
//                     // Crear un span para contener el texto del ítem
//                     const itemText = document.createElement('span');
//                     itemText.textContent = lista.value;
                    
//                     // Crear un botón de eliminar
//                     const deleteButton = document.createElement('button');
//                     deleteButton.textContent = 'Eliminar';
                    
//                     // Agregar un evento al botón de eliminar
//                     deleteButton.addEventListener('click', function() {
//                         if (checkbox.checked) {
//             completedCount--;
//             }
//             adds.removeChild(newItem);
//             updateCounter();
//             });
            
//             // Agregar el checkbox, el texto del ítem y el botón de eliminar al nuevo ítem
//             newItem.appendChild(checkbox);
//             newItem.appendChild(itemText);
//             newItem.appendChild(deleteButton);
    
//     // Agregar el nuevo ítem a la lista
//     adds.appendChild(newItem);
    
//     // Limpiar el campo de entrada
//     lista.value = '';
//     }
    
//     // Agregar un event listener al botón
//     agregar.addEventListener('click', annadirLista);
//     lista.addEventListener('keypress',(e)=>{
//         if (e.key=='Enter') {
//             annadirLista()
//             }
//             })
            
            
            
   