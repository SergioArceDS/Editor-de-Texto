const fs = require('fs');
const path = require('path');

class Directorio{

    constructor(){
        this._path = __dirname;
        this.crearDirectorio();
    }

    crearDirectorio(){
        this._path = path.join(this._path, "docs", '');

        if(!fs.existsSync('./docs')){
            fs.mkdirSync('./docs');
        }
    }

    getPath(){
        return this._path;
    }

    getVersionCorta(){
        const paths = path.parse(this._path);
        let delimiter = '/';
        if(paths.dir.indexOf(delimiter) < 0){
            delimiter = `\\`;
        }

        return `${paths.root}...${delimiter}${paths.name}`;
    }

    getArchivosEnDirectorio(){
        const archivos = fs.readdirSync(this._path);
        let n = 0;

        console.log(`
================================================
Ubicacion: ${this.getVersionCorta()}
================================================
        `);

        archivos.forEach(archivo => {
            console.log(`${archivo}`);
            n++;
        })
    }

}

module.exports = Directorio;