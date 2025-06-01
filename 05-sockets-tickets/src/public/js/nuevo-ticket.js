const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('#btnCrear');

const socket = io();

socket.on('connect', (lastTK) => {
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

socket.on('lastTicket:server', (lastTK) => {
    lblNuevoTicket.innerText = `Ticket ${lastTK}`;
});

btnCrear.addEventListener( 'click', () => {
    socket.emit( 'createTk:client', '', ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });
});