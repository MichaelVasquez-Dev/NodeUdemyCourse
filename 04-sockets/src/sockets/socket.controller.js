const socketController = (socket, io) => {

    console.log("Nuevo cliente conectado:", socket.id);

    socket.broadcast.emit("newUserConnected:server", {  // Envia a todos los clientes excepto al que se conecta
        id: socket.id,
        message: "Nuevo usuario conectado",
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });

    socket.on("sendmsg:client", (data, cb) => {
        cb("mensaje enviado correctamente"); //mensaje enviado unicamente al cliente que lo envió

        io.emit("sendmsg:server", { // Envia a todos los clientes conectados incluido el que lo envió
            message: data.message,
            id: data.id,
            date: data.date,
        });
    });
};

module.exports = {
    socketController,
};
