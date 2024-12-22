const socket = io();
console.log("hola")
const form = document.getElementById('registerForm');

form.addEventListener('submit', e => { 
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    fetch('/api/products/', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la creación del producto');
        }
        return response.json(); // Parsear la respuesta a JSON
    })
    .then(data => {
        console.log('Producto creado exitosamente:', data);
        socket.emit('addProd', data)
    })
})

socket.on('addingProd', data => {
    const prodContainer = document.getElementById('prodContainer')
    let product = ''
    
    product = `title: ${data.title} <br/> description:${data.description} <br/> code: ${data.code} <br/> price: ${data.price} <br/> stock: ${data.stock} <br/> category: ${data.category}<br/>`

    prodContainer.innerHTML += product;
})