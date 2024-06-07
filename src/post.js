// POST Función para agregar datos al servidor
import { obtenerDatos } from ".";
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
            let data = await respuesta.json()
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
}
export {darDatos}