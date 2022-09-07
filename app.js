const readline = require('readline');
const Mensajes = require('./mensajes');
const Documento = require('./documento');
const Directorio = require('./directorio');
const { fileURLToPath } = require('url');

const dir = new Directorio();

let interface =  readline.createInterface(process.stdin, process.stdout);

const herramientas = `Comandos: :q = salir, :sa = guardar como, :s = guardar
--------------------------------------------------------------------------------------`;

const pantalla = `
                        =====================
                        Editor de texto.\n
                        =====================
                        Elige una opcion:\n
                        1 Crear nuevo documento
                        2 Abrir documento 
                        3 Cerrar editor\n> `;

pantallaPrincipal();

function pantallaPrincipal(){
    process.stdout.write('\033c');

    interface.question(pantalla, res => {
        switch(res.trim()){
            case '1':
                crearArchivo();
            break;

            case '2':
                abrirIterfazArchivos();
            break;

            case '3':
                interface.close();
            break;

            default:
                pantallaPrincipal();
        }
    });
}

function crearArchivo(){
    let archivo =  new Documento(dir.getPath());

    renderizarInterfaz(archivo);
    leerComandos(archivo);
}

function abrirIterfazArchivos(){
    let archivo = new Documento(dir.getPath());
    dir.getArchivosEnDirectorio();

    interface.question(Mensajes.buscarArchivo, nombre => {
        if(archivo.existe(nombre)){
            abrirArchivo(archivo, nombre);
        }else{
            console.log(Mensajes.archivoNoEncontrado);
            setTimeout(() => {
                interface.removeAllListeners('line');
                pantallaPrincipal();
            }, 2000);
        }
    });
}

function abrirArchivo(archivo, nombre){
    archivo.abrir(nombre);
    renderizarInterfaz(archivo);
    leerComandos(archivo);
}

function renderizarInterfaz(archivo, mensaje){
    process.stdout.write('\033c');
    (archivo.getNombre() == '') ? console.log(`| Sin titulo |`) : console.log(`| ${archivo.getNombre()} |`)

    console.log(herramientas);

    if(mensaje != null) console.log(mensaje);
    console.log(archivo.obtenerContenido());
}

function leerComandos(archivo){
    interface.on('line', input => {
        switch(input.trim()){
            case ':sa':
                saveas(archivo);
            break;

            case ':q':
                interface.removeAllListeners('line');
                pantallaPrincipal();
            break;

            case ':s':
                save(archivo);
            break;

            default:
                archivo.añadirTexto(input.trim());
        }
    })
}

function saveas(archivo){
    interface.question(Mensajes.buscarArchivo, nombre => {
        if(archivo.existe(nombre)){
            console.log(Mensajes.existeElArchivo);
            interface.question(Mensajes.reemplazarArchivo, mensaje => {
                if(mensaje == 'y'){
                    archivo.guardarComo(nombre);
                    renderizarInterfaz(archivo, Mensajes.archivoGuardado + "\n");
                }else{
                    renderizarInterfaz(archivo, Mensajes.archivoSinGuardar + "\n");
                }
            })
        }else{
            //El archivo no existe y se tiene que crear
            archivo.guardarComo(nombre);
            renderizarInterfaz(archivo, Mensajes.archivoGuardado + "\n");
        }
    });
}

function save(archivo){
    if(archivo.tieneNombre()){
        archivo.guardar();
        renderizarInterfaz(archivo, Mensajes.archivoGuardado + "\n");
    }else{
        saveas(archivo);
    }
}