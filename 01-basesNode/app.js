const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs');

(async () => {
    const str = await crearArchivo(argv.b, argv.l, argv.h);
    console.log(str);
})();