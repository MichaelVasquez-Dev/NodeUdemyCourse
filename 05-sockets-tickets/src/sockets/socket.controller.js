const TicketControl = require("../models/ticketControl");

const ticketControl = new TicketControl;


const socketController = (socket, io) => {

    socket.emit("lastTicket:server", ticketControl.last);
    socket.emit("pendingTickets:server", ticketControl.tickets.length);


    socket.on("createTk:client", (createTk, cb) => {

        const next = ticketControl.nextTicket();
        cb(next);
        io.emit("lastTicket:server", ticketControl.last);
        io.emit("pendingTickets:server", ticketControl.tickets.length);

        // socket.broadcast.emit("updateTk:server", ticketControl.toJson);

    });

    socket.on("nextClient:client", ({deskNumber}, cb) => {
        if (!deskNumber) return cb({ ok: false, msg: "El escritorio es obligatorio" });
        const ticket = ticketControl.attendTicket(deskNumber);
        if (!ticket) return cb({ ok: false, msg: "No hay tickets pendientes" });
        cb({ ok: true, ticket });
        io.emit("last4TK:server", ticketControl.lastFour);
        io.emit("pendingTickets:server", ticketControl.tickets.length);
    });

    socket.on("getLastFourTK:client", cb => {
        cb(ticketControl.lastFour);
    })
};

module.exports = {
    socketController,
};
