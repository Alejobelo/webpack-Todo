import { Todo  } from "../classes";
import { todoList } from "../index";

//referencias HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo')
const btnBorrar     = document.querySelector('.clear-completed')
const ulFiltors     = document.querySelector('.filters')
const anchorFiltros = document.querySelectorAll('.filtro')


export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
    <li class="${ (todo.completado) ? "completed" : '' }" data-id="${ todo.id }"> 
    <div class="view">
        <input class="toggle" type="checkbox"${ (todo.completado) ? "checked" : '' } >
        <label>${ todo.tarea }</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    
    divTodoList.append( div.firstElementChild )  //para evitar que aparezca el div que cree y en lugar de este
                                                 // y en lugar de este aparezaca el primer hijo de ese div (el Li)
}

// eventos // keyup, el addEvenlistener se da cuenta cuando se presiona una tecla gracias al keyup
txtInput.addEventListener('keyup', ( event )  => {  

    if (event.keyCode === 13 && txtInput.value.length > 0) {

        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo )
        crearTodoHtml(nuevoTodo)
    
        console.log(todoList)

        txtInput.value = ''
    }

});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName; //target es el objeto al cual se le etsa haciendo click, es este caso puede ser laber, input o button
    const todoElemento   = event.target.parentElement.parentElement //parentElment se para en la etiqueta padre, en este caso etiqueta abuelo xD
    const todoId         = todoElemento.getAttribute('data-id');
    
    if ( nombreElemento.includes('input') ) {
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle('completed') //toggle si esa calse existe la quita, si no la pone

    } else if( nombreElemento.includes('button') ) { //hay que borrar el todo   

        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento )
        
    } 
})
    
btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length-1; i >= 0; i--) {
        
        const elemento = divTodoList.children[i];

            if( elemento.classList.contains('completed') ){
                divTodoList.removeChild(elemento);
            }

    }
})  

ulFiltors.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if( !filtro ) return;

    anchorFiltros.forEach(elem => elem.classList.remove('selected') )
    event.target.classList.add('selected');


    for(const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ){

            case 'Pendientes': //si el filtro es igual a pendientes
                if(completado ){
                    elemento.classList.add('hidden')
                } 
            break;
            
            case 'Completados':
                if(!completado ){
                    elemento.classList.add('hidden')
                } 
            break;    
        }
    }


})

