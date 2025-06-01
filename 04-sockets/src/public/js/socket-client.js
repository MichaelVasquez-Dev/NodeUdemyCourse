const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor de sockets con ID:', socket.id);

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor de sockets');

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

socket.on("newUserConnected:server", (payload) => {
    console.log(payload);
});

socket.on('sendmsg:server', (payload) => {
    console.log(payload);
});

btnEnviar.addEventListener('click', () => {
    const msg = txtMessage.value;
    if (msg.trim().length === 0) return;
    const payload = {
        message: msg,
        id: 'abc123',
        date: new Date()
    }
    
    socket.emit('sendmsg:client', payload, (data) => {console.log(data)});
});