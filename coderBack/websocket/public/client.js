const socket = io()
// console.log(socket)
// socket.on('server-message', (message) => {
//     console.log("El siguiente es el mensaje:")
//     console.log(message)
// })

const input = document.querySelector('#chat-input')

input.addEventListener('input', (event) => {
    socket.emit('client-message', input.value)
})

const span = document.querySelector('#chatbox-message')

socket.on('server-message', (data) => {
    span.textContent = data
})