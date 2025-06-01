const lblDesktop = document.querySelector('#deskTitle');
const lblCurrClient = document.querySelector('#currClient');
const btnNextClient = document.querySelector('#btnNextClient');
const divAlert = document.querySelector('#alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if( !searchParams.has( 'escritorio' )){
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio');
}

const deskNumber = searchParams.get('escritorio');
divAlert.style.display = 'none';


const socket = io();

socket.on('connect', (lastTK) => {
    btnNextClient.disabled = false;
});

socket.on('disconnect', () => {
    btnNextClient.disabled = true;
});

socket.on('pendingTickets:server', (payload) => {
    lblPendientes.innerHTML = payload ? payload : '0';
});

btnNextClient.addEventListener( 'click', () => {
    
    socket.emit( 'nextClient:client', {deskNumber}, ( payload ) => {
        if ( !payload.ok ){
            lblCurrClient.innerText = 'Nadie';
            divAlert.style.display = '';
            return;
        }

        lblCurrClient.innerText = `${payload.ticket.number}`;
    });
});