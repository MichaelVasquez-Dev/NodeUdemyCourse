const lblTicket1 = document.querySelector('#lblTicket1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lblDesk1 = document.querySelector('#lblEscritorio1');
const lblDesk2 = document.querySelector('#lblEscritorio2');
const lblDesk3 = document.querySelector('#lblEscritorio3');
const lblDesk4 = document.querySelector('#lblEscritorio4');

const socket = io();

socket.on('connect', (as) => {
    socket.emit("getLastFourTK:client", (tikets) =>{

        const sound = new Audio('./audio/new-ticket.mp3');
        sound.play();


        if (tikets.length === 0) {
            lblTicket1.innerText = 'Nadie';
            lblTicket2.innerText = 'Nadie';
            lblTicket3.innerText = 'Nadie';
            lblTicket4.innerText = 'Nadie';
            return;
        }

        const [ticket1, ticket2, ticket3, ticket4] = tikets;

        lblTicket1.innerText = `Ticket ${ticket1.number}`;
        lblDesk1.innerText = ticket1.desk;

        lblTicket2.innerText = `Ticket ${ticket2.number}`;
        lblDesk2.innerText = ticket2.desk;

        lblTicket3.innerText = `Ticket ${ticket3.number}`;
        lblDesk3.innerText = ticket3.desk;

        lblTicket4.innerText = `Ticket ${ticket4.number}`;
        lblDesk4.innerText = ticket4.desk;
    })
});

socket.on("last4TK:server", (tikets) => {
    if (tikets.length === 0) {
        lblTicket1.innerText = 'Nadie';
        lblTicket2.innerText = 'Nadie';
        lblTicket3.innerText = 'Nadie';
        lblTicket4.innerText = 'Nadie';
        return;
    }

    const [ticket1, ticket2, ticket3, ticket4] = tikets;

    lblTicket1.innerText = `Ticket ${ticket1.number}`;
    lblDesk1.innerText = ticket1.desk;

    lblTicket2.innerText = `Ticket ${ticket2.number}`;
    lblDesk2.innerText = ticket2.desk;

    lblTicket3.innerText = `Ticket ${ticket3.number}`;
    lblDesk3.innerText = ticket3.desk;

    lblTicket4.innerText = `Ticket ${ticket4.number}`;
    lblDesk4.innerText = ticket4.desk;
});