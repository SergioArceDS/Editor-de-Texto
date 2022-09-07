const fs =  require('fs');
const os = require('os');
const { text } = require('stream/consumers');

class Documento{

    constructor(dir){
        this._contenido = '';
        this._estaGuardado = false;
        this._nombreArchivo = '';
        this._dir = dir;
    }

    existe(nombre){
        return fs.existsSync(`${this._dir}/${nombre}`);
    }

    añadirTexto(texto){
        this._contenido += os.EOL + texto;
        this._estaGuardado = false;
    }

    guardarComo(nombre){
        fs.writeFileSync(`${this._dir}/${nombre}`, this._contenido);
        this._estaGuardado = true;
        this._nombreArchivo = nombre;
    }

    guardar(){
        fs.writeFileSync(`${this._dir}/${this._nombreArchivo}`, this._contenido);
        this._estaGuardado = true;
        this._nombreArchivo = this._nombreArchivo;
    }

    obtenerContenido(){
        return this._contenido;
    }

    tieneNombre(){
        if(this._nombreArchivo != ''){
            return true;
        }else{
            return false;
        }
    }

    getNombre(){
        return this._nombreArchivo;
    }

    isSaved(){
        return this._estaGuardado;
    }

    abrir(nombre){
        this._contenido = fs.readFileSync(`${this._dir}/${nombre}`, 'UTF-8');
        this._nombreArchivo = nombre;
        this._estaGuardado = true;

        return this._contenido;
    }
}

module.exports = Documento;