class Mensaje {
    constructor(uid, nombre, mensaje) {
        this.uid = uid;
        this.nombre = nombre;
        this.mensaje = mensaje;
        this.fecha = new Date();
    }
}

class ChatMensajes {
  constructor() {
    this.mensajes = [];
    this.usuarios = {};
  }

  get ultimos10Mensajes() {
    return this.mensajes.slice(0,10);
  }

  get usuariosArr(){
    return Object.values(this.usuarios);
  }

  enviarMensaje(uid, nombre, mensaje) {
    this.mensajes.unshift(new Mensaje(uid, nombre, mensaje));
  }

  conectarUsuario(usuario) {
    this.usuarios[usuario.id] = usuario;
  }

  desconectarUsuario(id) {
    delete this.usuarios[id];
  }

}

const chatMensajes = new ChatMensajes();

module.exports = chatMensajes;