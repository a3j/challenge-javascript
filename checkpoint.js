// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint se les brindarán las 
// implementaciones ya realizadas en las homeworks de 
// Queue, LinkedList y BinarySearchTree.
// Sobre dichas implementaciónes van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo.
// Pero todos los métodos ya implementados en las homeowrks no es 
// necesario que los vuelvan a definir.

const {
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
} = require('./DS.js');

// ----- Closures -----

// EJERCICIO 1
// Implementar la funcion 'exponencial' que recibe un parametro entero 'exp'
// y retorna una una funcion, nos referiremos a esta ultima como funcion hija,
// y a 'exponencial' como la funcion padre, la funcion hija debe de recibir 
// un parametro y retornar dicho parametro elevado al parametro 'exp' de 
// la funcion padre original 'exponencial'
// Ejemplo:
// > var sqrt = exponencial(2);
// > sqrt(2);
// < 4
// > sqrt(3);
// < 9
// > sqrt(4);
// < 16

function exponencial(exponent) {
    this.exponent=exponent;
        this.number=0;
        return function(number) {
            return this.number+" "+number+" you are name "+(++this.number);
        }
}

// ----- Recursión -----

// EJERCICIO 2
// Crear la funcion 'direcciones':
// La funcion debe retornar un string de los movimientos Norte(N), Sur(S), Este(E), Oeste(O)
// que se deben realizar, para llegar al destino de un laberinto dado.
//
// Ejemplo: dado el siguiente laberinto:
// let laberintoExample = { // direccion = ""
//     N: 'pared',
//     S: { // direccion = "S"
//         N: 'pared',
//         S: 'pared',
//         E: { // direccion = "SE"
//             N: 'destino', // direccion = "SEN"
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         },
//         O: { // direccion = "SO"
//             N: 'pared',
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         }
//     },
//     E: 'pared',
//     O: 'pared'
// }
// El retorno de la funcion 'direcciones' debe ser 'SEN', ya que el destino se encuentra
// haciendo los movimientos SUR->ESTE->NORTE
// Aclaraciones: el segundo parametro que recibe la funcion ('direccion') puede ser pasado vacio (null)

function direcciones(laberinto) {
    let ubica = []
        for(const [clave, valor] of Object.entries(laberinto)) {
            if(laberinto.N === 'destino') {
                ubica.push('N')
                return ubica
            }
          
            if(laberinto.S === 'destino') {
                ubica.push('S')
                return ubica
            }
            
            if(laberinto.E === 'destino') {
                ubica.push('E')
                return ubica
            }
            
            if(laberinto.O === 'destino') {
                ubica.push('O')
                return ubica
            }
            
            if(laberinto.N !== 'laberinto' && laberinto.S !== 'laberinto' && laberinto.E !== 'laberinto' && laberinto.O !== 'laberinto') {
                ubica.push('O')
                return ubica;
            }            
            
            if(typeof valor === 'object') {
                return direcciones(valor)        
            }            
        }
        
        function direccionesfn(laberintofn) {
            for (const [clave, valor] of Object.entries(laberintofn)) {
                if (valor === 'destino') {
                    return clave;
                }
          
                if (typeof valor === 'object') {
                    let destinoEncontrado = direccionesfn(valor);
                    if (destinoEncontrado.length > 0) {
                        return clave + destinoEncontrado;
                    }
                }
            }
          
            return '';
          }
}


// EJERCICIO 3
// Crea la funcion 'deepEqualArrays':
// Dado que las comparaciones en javascript aveces son un problema como con el siguiente ejemplo:
// [0,1,2] === [0,1,2] => false // puede probarlo en la consola
// con objetos o arrays identicos surge la necesidad de comparar en 'profundidad' arrays u objetos
// en este caso la funcion solo va a ser pensada para recibir arrays,
// pero estos pueden tener multiples niveles de anidacion, y la funcion deepEqualArrays debe
// comparar cada elemento, sin importar la profundidad en la que este
// Ejemplos: 
// deepEqualArrays([0,1,2], [0,1,2]) => true
// deepEqualArrays([0,1,2], [0,1,2,3]) => false
// deepEqualArrays([0,1,[[0,1,2],1,2]], [0,1,[[0,1,2],1,2]]) => true

function deepEqualArrays(arr1, arr2) {
    arr1 = [0,1,2];
    arr2 = [0,1,2];
    
    arr1.sort();  //Se ordenan ambos arreglos
    arr2.sort();
    
    arr1.length==arr2.length && arr1.every(function(v,i) {
         return v === arr2[i]
        });         //Realiza la comparación de cada elemento
}



// ----- LinkedList -----

// Deben completar la siguiente implementacion 'OrderedLinkedList'(OLL)
// que es muy similar a las LinkedList vistas en clase solo que 
// los metodos son distintos y deben de estar pensados para conservar la lista
// ordenada de mayor a menor.
// ejemplos:
// head --> 5 --> 3 --> 2 --> null
// head --> 4 --> 3 --> 1 --> null
// head --> 9 --> 3 --> -1 --> null
// Las dos clases principales ya van a estar implementadas a continuacion:
function OrderedLinkedList() {
    this.head = null;

}
// notar que Node esta implementado en el archivo DS

// Y el metodo print que permite visualizar la lista:
OrderedLinkedList.prototype.print = function(){
    let print = 'head'
    let pointer = this.head
    while (pointer) {
        print += ' --> ' + pointer.value
        pointer = pointer.next;
    }
    print += ' --> null'
    return print
}


// EJERCICIO 4
// Crea el metodo 'add' que debe agregar nodos a la OLL de forma que la misma se conserve ordenada:
// Ejemplo:
// > LL.print()
// < 'head --> null'
// > LL.add(1)
// > LL.print()
// < 'head --> 1 --> null'
//    2       c
// > LL.add(5)
// > LL.print()
// < 'head --> 5 --> 1 --> null'
// > LL.add(4)
// > LL.print()
// < 'head --> 5 --> 3 --> 1 --> null'
//               4
OrderedLinkedList.prototype.add = function(val){
    let nuevo = new Node(value)
    
    let puntero = this.head                             // Busca un elemento menor
    let previo = null
    while(puntero != null && puntero.value >= value) {
        previo = puntero
        puntero = puntero.next
    }
    
    if (previo == null) {                               // Adiciona el elemento
        nuevo.next = this.head
        this.head = nuevo
    } else {
        nuevo.next = previo.next
        previo.next = nuevo
    }
}


// EJERCICIO 5
// Crea el metodo 'removeHigher' que debe devolver el valor mas alto de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeHigher = function(){
    it('Remove saca el último nodo ingresado y devuelve su valor', function() {
        linkedList.add('first');
        linkedList.add('second');
        expect(linkedList.remove()).toBe('second');
        expect(linkedList.remove()).toBe('first');
      });
      
      
      function LinkedList() {
        this.head = null;
      }
      
      function Node(value) {
        this.value = value;
        this.next = null;
      }
      
      LinkedList.prototype.remove = function() {    // Método Remove
        let current = this.head
          if(current === null)
            return null
          if(current.next === null){ // Si queda un elemento
            this.head = null;
            return current.value;
          } 
      }  
      
      let aux = this.head
        while(aux.next.next != null){
          aux = aux.next;
        }
        aux.next = null;
        return aux
}


// EJERCICIO 6
// Crea el metodo 'removeLower' que debe devolver el valor mas bajo de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeLower = function() {
    removeFrom(index){
        if (index < 0 || index > this.size){
            return null
        };

        let current = this.head;
        let previous = null;

        if(index === 0) {
            this.head = current.next;
        } else {
            for (let i = 0; i < index; i++) {
                previous = current;
                current = current.next;
            };
            previous.next = current.next;
        };
        this.size--;
        return current.data;
    }
};   



// ----- QUEUE -----

// EJERCICIO 7
// Implementar la funcion multiCallbacks:
// la funcion multiCallbacks recibe dos arrays de objetos cuyas propiedades son dos,
// 'cb' que es una funcion, y 'time' que es el tiempo estimado de ejecucion de dicha funcion 
// este ultimo representado con un integer como se muestra acontinuacion:
// let cbsExample = [
//     {cb:function(){}, time: 2},
//     {cb:function(){}, time: 3}
// ]
// De manera que lo que nuestra funcion 'multiCallbacks' debe de ir ejecutando las funciones 
// sin pasarle parametros pero debe ir alternando las funciones de cbs1 y cbs2 
// segun cual de estas se estima que tarde menos, retornando un arreglo de resultados
// de las mismas en el orden que fueron ejecutadas
// Ejemplo:
// > let cbs1 = [
//       {cb:function(){return '1-1'}, time: 2},
//       {cb:function(){return '1-2'}, time: 3}
//   ];
// > let cbs2 = [
//       {cb:function(){return '2-1'}, time: 1},
//       {cb:function(){return '2-2'}, time: 4}
//   ];
// > multiCallbacks(cbs1, cbs2);
// < ["2-1", "1-1", "1-2", "2-2"];

function multiCallbacks(cbs1, cbs2){
    
}



// ----- BST -----

// EJERCICIO 8
// Implementar el metodo 'toArray' en el prototype del BinarySearchTree
// que devuelva los valores del arbol en una array ordenado
// Ejemplo:
//     32
//    /  \
//   8   64
//  / \
// 5   9
// resultado:[5,8,9,32,64]

BinarySearchTree.prototype.toArray = function() {
    let arr = [5,8,9,32,64];
    let current = this.head;
    while(current){
        arr.push(current.data);
        current = current.next;
        let lca = null
        const isCommonPath = (node) => {
            if (!node) return false
            var isLeft = isCommonPath(node.left)
            var isRight = isCommonPath(node.right)
            var isMid = node == p || node == q
            if (isMid && isLeft || isMid && isRight || isLeft && isRight) {
                lca = node
            }
            return isLeft || isRight || isMid
        }
        isCommonPath(root)
        return lca
    }
}



// ----- Algoritmos -----

// Ejercicio 9
// Implementar la funcion 'primalityTest' que dado un valor numerico entero
// debe de retornar true or false dependiendo de si este es primo o no.
// Puede que este es un algoritmo que ya hayan implementado pero entenderan
// que es un algoritmo que segun la implementacion puede llegar a ser muy costoso
// para numeros demasiado grandes, asi que vamos a implementarlo mediante un metodo
// derivado de Trial Division como el que se muestra aca:
// https://en.wikipedia.org/wiki/Primality_test
// Si bien esta no es la mejor implementacion existente, con que uds puedan 
// informarse sobre algoritmos, leerlos de un pseudocodigo e implemnterlos alcanzara

function primalityTest(n) {

    var esPrimo = n => {        
        if (n == 0 || n == 1 || n == 4) return false;
        for (let x = 2; x < n / 2; x++) {
            if (n % x == 0) return false;
        }
        // Si es divisible por alguno de los de arriba, no es primo de lo contrario, Es un número primo   
        return true;
    }
}


// EJERCICIO 10
// Implementa el algoritmo conocido como 'quickSort', que dado un arreglo de elemntos
// retorn el mismo ordenado de 'mayor a menor!'
// https://en.wikipedia.org/wiki/Quicksort

function quickSort(array) {
    var arrayNumbers = [10, 8, 9, 5, 3, 78, 23]
    Array.prototype.sortNumbers = function(){
        return this.sort(
        function(a,b){
            return b - a
        });
    }
}


// QuickSort ya lo conocen solo que este 
// ordena de mayor a menor
// para esto hay que unir como right+mid+left o cambiar el 
// signo menor en la comparacion con el pivot




// ----- EXTRA CREDIT -----

// EJERCICIO 11
// Implementa la función 'reverse', que recibe un numero entero como parametro
// e invierte el mismo.
// Pero Debería hacer esto sin convertir el número introducido en una cadena, o un array
// Ejemplo:
// > reverse(123);
// < 321
// > reverse(95823);
// < 32859

function reverse(num){
var num = document.getElementById("valor").value;  
if(num == 0){ 
    document.getElementById("resultado").innerHTML = "EL PROGRAMA TERMINO"; 
}     

console.log("Enra al while ? " + ( parseInt(num / 10) != 0 ) );
    while( parseInt(num / 10) != 0 ){ 
        console.log(num + " % 10 = " + (num % 10) ); 
        document.getElementById("resultado").innerHTML += (num % 10); 
        
        numero = parseInt(num / 10); 
        console.log("Resultado de numero / 10 = ", num);
        
        console.log("Entra al if (parseInt(numero/10) == 0): " + (parseInt(num/10) == 0));
        if(parseInt(num/10) == 0){ 
            console.log("Ultimo modulo: " + (num % 10));
            document.getElementById("resultado").innerHTML += (num % 10); 
            document.getElementById("resultado").innerHTML += "     "; 
        } 
    }
}


// la grandiosa resolucion de Wilson!!!
// declaran una variable donde 
// almacenar el el numero invertido
// y van multiplicando por 10 la 
// porcion del numero que ya invirtieron
// deforma que esta se corra hacia la izq
// para agregar el ultimo numero de la 
// porcion no revertida
// y luego le quitan a la porcion 
// no revertida el ultimo numero

module.exports = {
    exponencial,
    direcciones,
    deepEqualArrays,
    OrderedLinkedList,
    multiCallbacks,
    primalityTest,
    quickSort,
    reverse,
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
}