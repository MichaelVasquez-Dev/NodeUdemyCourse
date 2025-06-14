let usuario = null
let socket = null
const url = 'http://localhost:8080/api';

const txtUid = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const ulUsers = document.querySelector('#ulUsers');
const ulChat = document.querySelector('#ulChat');
const btnExit = document.querySelector('#btnExit');

const validarJWT = async () => {
    const token = localStorage.getItem('token') || '';
    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch(`${url}/auth`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
    });

    const {usuario: userDB, token: tokenDB} = await resp.json();
    localStorage.setItem('token', tokenDB);
    usuario = userDB;

    document.title = usuario.nombre;
    await conectarSocket();

}

const conectarSocket = async() => {

    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        },
    });

    socket.on('connect', () => {
        console.log('Socket conectado');
    });

    socket.on('disconnect', () => {
        console.log('Socket desconectado');
    });

    socket.on('recibir-mensajes', dibujarMensajes);

    socket.on('usuarios-activos', dibujarUsuarios);

    socket.on('mensaje-privado', (payload) => {
        console.log('Mensaje privado:', payload);
    });

}

const dibujarUsuarios = (usuarios = []) => {
    let usersHtml = '';
    usuarios.forEach(({nombre, uid}) => {
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${nombre}</h5>
                    <span class="fs-6 text-muted">${uid}</span>
                </p>
            </li>
        `;
    });
    ulUsers.innerHTML = usersHtml;
}

const dibujarMensajes = (mensajes = []) => {
    let mensajesHtml = '';
    mensajes.forEach(({nombre, mensaje}) => {
        mensajesHtml += `
            <li>
                <p>
                    <span class="text-primary">${nombre}</span>
                    <span>${mensaje}</span>
                </p>
            </li>
        `;
    });
    ulChat.innerHTML = mensajesHtml;
}



txtMessage.addEventListener('keyup', ({keyCode}) => {

    const mensaje = txtMessage.value.trim();
    const uid = txtUid.value.trim();
    if (keyCode !== 13 || mensaje.length === 0 ) return;

    socket.emit('enviar-mensaje', {mensaje, uid}, (resp) => {
        console.log(resp);
        txtMessage.value = '';
        txtUid.value = '';
    });


    
});


const main = async () => {

    await validarJWT();

}

main();
