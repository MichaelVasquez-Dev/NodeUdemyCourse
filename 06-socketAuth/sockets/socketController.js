const { comprobarJWT } = require("../helpers");
const chatMensajes = require("../models/chatMensajes");

const socketController = async (socket, io) => {

    const usuario = await comprobarJWT(socket.handshake.headers['x-token']);
    if (!usuario) return socket.disconnect();

    chatMensajes.conectarUsuario(usuario);

    io.emit('usuarios-activos', chatMensajes.usuariosArr);
    socket.emit('recibir-mensajes', chatMensajes.ultimos10Mensajes );

    socket.join(usuario.id);


    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id);
        io.emit('usuarios-activos', chatMensajes.usuariosArr);
    });
    

    socket.on('enviar-mensaje', ({ mensaje, uid }) => {
        if (!mensaje || !mensaje.trim()) return;


        if (uid) {
            socket.to(uid).emit('mensaje-privado', {
                de: usuario.nombre,
                mensaje
            });
        } else {
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje);
            io.emit( 'recibir-mensajes', chatMensajes.ultimos10Mensajes );
        }
    });


}

module.exports = socketController;