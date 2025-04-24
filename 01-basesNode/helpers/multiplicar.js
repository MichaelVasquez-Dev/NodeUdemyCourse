const fs = require('fs');

const crearArchivo = async (base, listar, hasta) => {
    try {
        salida = "";

        for (let index = 1; index <= hasta; index++) {
            salida += ` ${base } X ${index} = ${base * index} \n`
        }

        listar && console.log(salida);
    
        fs.writeFileSync(`tabla-${base}.txt`, salida)   
        return `tabla-${base}.txt creado`;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crearArchivo
}