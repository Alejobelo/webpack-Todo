

export class Todo {

    static fromJson({id, tarea, completado, creado}) { //destructuracion del objeto que llega por locastorage
        const tempTodo = new Todo( tarea );

        tempTodo.id         =id;
        tempTodo.completado = completado;
        tempTodo.creado     =creado;
        
        return tempTodo;

    }

    constructor( tarea ) {

    this.tarea    = tarea;
    this.id       = new Date().getTime(); //getTime regresa unos numeros equivalentes minutos, segundos actuales
    
    this.completado = false;
    this.creado     = new Date(); //fecha y hora en que fue creado

    }

}
