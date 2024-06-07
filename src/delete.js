// // DELETE Función para eliminar datos del servidor

// async function vicino(id) {
//     try {
//         await fetch(`http://localhost:3000/api/task/${id}`, {
//             method: 'DELETE',
//         });
//         console.log(`Se eliminó la tarea con id ${id}`);
//         obtenerDatos();
//     } catch (error) {
//         console.error(error);
//     }
// }
// export {vicino}