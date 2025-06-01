const path = require('node:path');
const fs = require('node:fs');

class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}

class TicketControl {

    constructor(){
        this.last = 0;
        this.today = 10;
        this.tickets = [];
        this.lastFour = [];
        this.init();
    }

    get toJson(){
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        };
    }

    init(){
        const {last, today, tickets, lastFour } = require('../data/db.json');
        if( today === this.today ){
            this.last = last;
            this.tickets = tickets;
            this.lastFour = lastFour;
        } else {
            this.saveDB();
        }
    }

    saveDB(){
        const dbPath = path.join(__dirname, '../data/db.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));

    }

    nextTicket(){
        this.last += 1;
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveDB();
        return `Ticket ${ticket.number}`;
    }

    attendTicket(desk){
        if( this.tickets.length === 0 ) return null;
        
        const ticket = this.tickets.shift();
        ticket.desk = desk;
        this.lastFour.unshift(ticket);
        if( this.lastFour.length > 4 ){
            this.lastFour.splice(-1, 1);
        }
        this.saveDB();
        return ticket;
    }

}

module.exports = TicketControl;