//Importa desde el documento donde está lo de Firebase
import { saveTask, getTasks, onGetFullfill, deleteProposito, getTask, upDateBase } from './firebase.js'
//Iterar datos de JSON para el formulario
import {registroProposito} from "./data.js"
registroProposito();
//Formulario en HTML
const taskForm = document.getElementById('task-form');
const propositos = document.getElementById('task-container');
let editStatus = false; 
let id = '';
//Al cargar el DOM se ejecuta lo que tiene dentro de la función
window.addEventListener('DOMContentLoaded', async () => { //async para eventos "especiales"
    //console.log('listo');
    // const querySnapshot = await getTasks()
    // console.log(querySnapshot);
//Se prepara el doumento para iterar los datos desde Firebase e imprimir
    onGetFullfill((querySnapshot) => {
        propositos.innerHTML=""
        querySnapshot.forEach((doc) => {
            //console.log(doc.data());
            const proposito = doc.data();
            // console.log(doc.id);
            propositos.innerHTML += `
                <div class="card-body mt-4 border-secundary">
                    <h3 class="h5">"${proposito.titulo}"<h3>
                    <h2 class="h6">—${proposito.tema}</h2><hr>
                    <p class="h6">${proposito.descripcion}</p>
                    <p class="h6">Previsto para: ${proposito.mes}</p>
                </div>
                <div><center>
                    <button class='btn-delete btn-danger' data-id="${doc.id}">Borrar</button>
                    <button class='btn-edit btn-info' data-id="${doc.id}">Editar</button>
                </center></div>`
        });
//Botón para eliminar propósito
        const btnDelete = propositos.querySelectorAll('.btn-delete')
        btnDelete.forEach(btn => { 
            btn.addEventListener('click', ({ target: {dataset}}) => {
                //console.log(dataset.id);
                //console.log('eliminando');
                deleteProposito(dataset.id)
            })
        })
//Botón para editar propósito
        const btnEdit = propositos.querySelectorAll('.btn-edit')
        btnEdit.forEach((btn) => {
            // console.log(btn);
            btn.addEventListener('click', async (e) => {
                console.log(e.target.dataset.id);
                const doc = await getTask(e.target.dataset.id)
                //console.log(doc.data());
//Coloca los datos para editar en el formulario
                const task = doc.data();
                taskForm['tema'].value = task.tema;
                taskForm['titulo'].value = task.titulo;
                taskForm['descripcion'].value = task.descripcion;
                taskForm['mes'].value = task.mes;

                editStatus = true;
                //id = e.target.dataset.id;
                id = doc.id
                taskForm['btn-task-save'].innerText = "Actualizar"
            })
        })
    });
});
//Datos obtenidos desde el formulario para crear nuevo propósito
taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('enviado');
    const tema = taskForm['tema']
    const titulo = taskForm['titulo']
    const descripcion = taskForm['descripcion']
    const mes = taskForm['mes']
    //console.log(tema, titulo, descripcion, mes);
    
    if (!editStatus) {
        saveTask(tema.value, titulo.value, descripcion.value, mes.value);
        //console.log('updating');
    } else {
        upDateBase(id, {tema: tema.value, titulo: titulo.value, descripcion: descripcion.value, mes: mes.value});
        editStatus = false;
    }
    taskForm.reset();
    taskForm['btn-task-save'].innerText = "Guardar"
})
