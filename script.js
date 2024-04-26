/* Hacer una heladeria, ofrecerle productos segun su presupuesto, tomarle el pedido y cobrarle*/
const products = [ // Se crea el array de objetos de productos con su precio
    {name: "1 Bocha", price: 1000 },
    {name: "2 Bochas", price: 1500 },
    {name: "3 Bochas", price: 2000},
    {name: "Batido de frutilla", price: 1150 },
    {name: "Batido de chocolate", price: 1300 },
    {name: "Batido de vainilla", price: 990}
];

// Funcion para generar el mensaje con su respectivo titulo
function generateProductOptions(title) {
    let options = `${title}`;
    products.forEach((product, index) => {
        options += `${index + 1}) ${product.name} - Precio: $${product.price}\n`;
    });
    return options;
}

function showOrderOptions() {//La funcion para mostrar el mensaje con todos los productos a elegir
    const message = generateProductOptions("Elija el número del producto que desea ordenar:\n");
    return message;
}

//La funcion para mostrar el mensaje con todos los productos
function showOptions() {
    const message = generateProductOptions("Productos disponibles:\n\n");
    alert(message);
}

function filterProductsByPrice(maxPrice) {//Funcion para filtar los productos que valgan lo mismo o menos que el presupuesto del usuario
    return products.filter(product => product.price <= maxPrice);
}

function requestMaxPrice(){//Funcion para que se ingrese el presupuesto y validar lo ingresado
    let maxPrice = parseFloat(prompt("Ingrese el precio máximo que está dispuesto a pagar:"));
    if (isNaN(maxPrice)) {
        alert("Por favor, ingrese un número válido");
        return requestMaxPrice(); // Llamada recursiva si el valor ingresado no es válido
    }
    return maxPrice;
}

//Funcion para mostrar los productos que puede comprar el usuario con su presupuesto
function showFilteredProducts(filteredProducts) {
    let message = "Los productos que puedes comprar son:\n\n";
    filteredProducts.forEach(product => {
        message += `${product.name} - Precio: $${product.price}\n`;
    });
    alert(message);//puede ir el return?
}

function validateProductChoice(choice) {//Funcion para validar si el numero de producto que ingreso es correcto (En este caso tiene que ser del 1 al 6 porque hay 6 productos)
    return !isNaN(choice) && choice >= 1 && choice <= products.length;
}

// Funcion para validar que la cantidad de productos que quiere sea valida
function validateQuantity(quantity) {
    return !isNaN(quantity) && quantity > 0;
}

// Funcion que toma el pedido y retorna un array del pedido con su nombre y cantidad
function takeOrder() {
    let order = [];
    let continueOrder = true;

    while (continueOrder) {
        let choice = parseInt(prompt(showOrderOptions()));//guarda el num de producto que eligió

        while (!validateProductChoice(choice)) {
            alert("Opción inválida. Por favor, elija un número de producto válido");
            choice = parseInt(prompt(showOrderOptions()));
        }

        let quantity = parseInt(prompt(`Ingrese la cantidad de ${products[choice - 1].name} que desea ordenar:`));//Guarda la cantidad de productos que eligió

        while (!validateQuantity(quantity)) {
            alert("Por favor, ingrese una cantidad válida");
            quantity = parseInt(prompt(`Ingrese la cantidad de ${products[choice - 1].name} que desea ordenar:`));
        }

        order.push({product: products[choice - 1], quantity: quantity});
        //ingresa en el array el/los producto/s elegido/s con la cantidad
        continueOrder = confirm("¿Desea agregar más productos a su pedido?");
        //si quiere agregar mas vuelve al inicio del ciclo sino sale y returna el array
    }
    return order;
}

//Mostrar el pedido final con su total, etc
function showOrder(order) {
    let message = 'Su pedido:\n\n';
    let totalOrder = 0;
    order.forEach(item => {
        let subtotal = item.product.price * item.quantity;//precio x cantidad(de un producto)
        totalOrder += subtotal;
        message += `Producto: ${item.product.name}\nCantidad: ${item.quantity}\nSubtotal: $${subtotal}\n\n`;
    });
    message += `Total del pedido: $${totalOrder}`;
    alert(message);
}

// Funcion principal
function main() {
        showOptions();
        const maxPrice = requestMaxPrice(); 
        const filteredProducts = filterProductsByPrice(maxPrice);
        showFilteredProducts(filteredProducts);
        const customerOrder = takeOrder();
        showOrder(customerOrder);
}

const startButton = document.getElementById("start")
startButton.onclick = main

