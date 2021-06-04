let btn_guardar_re = document.querySelector(".guardar");
let nuevoregistro = [];
let banderaRegistro = document.querySelector(".registrar");
let recaudacionCiudad = [];
let Guadalajara = [];
let Culiacan = [];
let Toluca = [];
let Tijuana = [];
let Merida = [];

if (banderaRegistro) {
    if (localStorage.getItem("registros")) {
        JSON.parse(localStorage.getItem("registros")).forEach(element => {
            nuevoregistro = [...nuevoregistro, element];
        });
    }
    if (localStorage.getItem("recauciudades")) {
        JSON.parse(localStorage.getItem("recauciudades")).forEach(element => {
            recaudacionCiudad = [...recaudacionCiudad, element];
        });
        inicioValidarReca();
        console.log(Guadalajara);
        console.log(Tijuana);
        console.log(Culiacan);
        console.log(Toluca);
        console.log(Merida);
    }
    if (localStorage.getItem("Guadalajara")) {
        JSON.parse(localStorage.getItem("Guadalajara")).forEach(element => {
            Guadalajara = [...Guadalajara, element];
        });
    }
    if (localStorage.getItem("Culiacan")) {
        JSON.parse(localStorage.getItem("Culiacan")).forEach(element => {
            Culiacan = [...Culiacan, element];
        });
    }
    if (localStorage.getItem("Toluca")) {
        JSON.parse(localStorage.getItem("Toluca")).forEach(element => {
            Toluca = [...Toluca, element];
        });
    }
    if (localStorage.getItem("Tijuana")) {
        JSON.parse(localStorage.getItem("Tijuana")).forEach(element => {
            Tijuana = [...Tijuana, element];
        });
    }
    if (localStorage.getItem("Merida")) {
        JSON.parse(localStorage.getItem("Merida")).forEach(element => {
            Merida = [...Merida, element];
        });
    }

}
if (btn_guardar_re) {
    btn_guardar_re.addEventListener("click", e => {
        e.preventDefault();
        validarFormulario()
    });
}
/****
 * 
 * 
 * 
 */
function validarFormulario() {
    const numeroElementos = document.querySelector(".formulario");

    let bandera = true;
    let bandera2 = true;
    let bandera3 = true;
    let bandera4 = true;

    for (let contador = 0; contador < numeroElementos.length - 1; contador++) {
        let valor = numeroElementos.elements[contador].value;
        let clase = numeroElementos.elements[contador].classList[0];
        let referencia = numeroElementos.elements[contador];
        if (clase === "numero") {
            let valido = /[a-zA-Z ]+/;
            if (!valido.test(valor)) {
                referencia.classList.add("danger");
                bandera = false
            }
            else
                referencia.classList.add("exit");

        }
        else if (clase === "tipo") {
            let valido = /[a-zA-Z ]+/;
            if (!valido.test(valor)) {
                referencia.classList.add("danger");

                bandera2 = false;
            }
            else
                referencia.classList.add("exit");

        }
        else if (clase === "cantidad") {
            let valido = /[1-9]|[1-9][0-9]+/;
            if (!valido.test(valor)) {
                referencia.classList.add("danger");

                referencia.classList.remove("exit");
                bandera3 = false;
            }
            else
                referencia.classList.add("exit");

        }
        else if (clase === "horas") {
            let valido = /[1-9]|[1-9][0-9]+/;
            if (!valido.test(valor)) {
                referencia.classList.add("danger");
                referencia.classList.remove("exit");
                bandera4 = false;
            }
            else
                referencia.classList.add("exit");

        }

    }

    if (bandera && bandera2 & bandera3 && bandera4)
        procesarinfo(numeroElementos);
    else {
        setTimeout(() => {
            eliminardanger(numeroElementos);
        }, 1700);
        return;
    }
}
/*******************
 * 
 * 
 * 
 * 
 */
function eliminardanger(elemento) {
    for (let contador = 0; contador < elemento.length - 1; contador++) {

        let clase = elemento.elements[contador];
        clase.classList.remove("danger");

    }
}
/**************
 * 
 * 
 */
function procesarinfo(elemento) {
    let numero = document.querySelector(".numero").value;
    let tipo = document.querySelector(".tipo").value;
    let cantidad = document.querySelector(".cantidad").value;
    let horas = document.querySelector(".horas").value;
    let registro = {
        id: Date.now(),
        numero: numero,
        tipo: tipo,
        cantidad: cantidad,
        horas: horas
    }
    document.querySelector(".formulario").reset();
    setTimeout(() => {

        for (let contador = 0; contador < elemento.length - 1; contador++) {

            let clase = elemento.elements[contador];
            clase.classList.remove("exit");
        }
    }, 1000);
    nuevoregistro = [...nuevoregistro, registro]
    localStorage.setItem("registros", JSON.stringify(nuevoregistro))

    procesarDatos(numero, tipo, cantidad, horas);

}
/*****************
 * 
 * 
 * 
 */
function procesarDatos(numero, tipo, cantidad, horas) {
    let precioporhora = 0;

    if (tipo === "Bicicleta") {
        precioporhora = (4 * cantidad) * horas;
        generarCiudad(numero, tipo, precioporhora)
    }
    else if (tipo === "Moto") {
        precioporhora = (6 * cantidad) * horas;
        generarCiudad(numero, tipo, precioporhora)
    }
    else if (tipo === "Carro de golf") {
        precioporhora = (18 * cantidad) * horas;
        generarCiudad(numero, tipo, precioporhora)
    }
    else if (tipo === "Cuatrimoto") {
        precioporhora = (15 * cantidad) * horas;
        generarCiudad(numero, tipo, precioporhora)
    }
}
/************************
 * 
 * 
 * 
 */
function generarCiudad(numero, tipo, precioporhora) {

    if (numero === "Guadalajara") {
        let ciudad = {
            id: Date.now(),
            ciudad: numero,
            recaudacionI: precioporhora,
            vehiculo: tipo

        }
        recaudacionCiudad = [...recaudacionCiudad, ciudad];
        localStorage.setItem("recauciudades", JSON.stringify(recaudacionCiudad));
        ciudadGuadalajara(tipo, precioporhora);
    }
    else if (numero === "Tijuana") {
        let ciudad = {
            id: Date.now(),
            ciudad: numero,
            recaudacionI: precioporhora,
            vehiculo: tipo
        }
        recaudacionCiudad = [...recaudacionCiudad, ciudad];
        localStorage.setItem("recauciudades", JSON.stringify(recaudacionCiudad));
        ciudadTijuana(tipo, precioporhora);
    }
    else if (numero === "Culiacan") {
        let ciudad = {
            id: Date.now(),
            ciudad: numero,
            recaudacionI: precioporhora,
            vehiculo: tipo
        }
        recaudacionCiudad = [...recaudacionCiudad, ciudad];
        localStorage.setItem("recauciudades", JSON.stringify(recaudacionCiudad));
        ciudadCuliacan(tipo, precioporhora);
    }
    else if (numero === "Toluca") {
        let ciudad = {
            id: Date.now(),
            ciudad: numero,
            recaudacionI: precioporhora,
            vehiculo: tipo
        }
        recaudacionCiudad = [...recaudacionCiudad, ciudad];
        localStorage.setItem("recauciudades", JSON.stringify(recaudacionCiudad));
        ciudadToluca(tipo, precioporhora);
    }
    else if (numero === "Merida") {
        let ciudad = {
            id: Date.now(),
            ciudad: numero,
            recaudacionI: precioporhora,
            vehiculo: tipo
        }
        recaudacionCiudad = [...recaudacionCiudad, ciudad];
        localStorage.setItem("recauciudades", JSON.stringify(recaudacionCiudad));
        ciudadMerida(tipo, precioporhora);
    }


}
/*********************************
 * 
 * 
 * 
 * 
 */
function ciudadGuadalajara(tipo, precioporhora) {
    let objetotemporal = [];

    if (localStorage.getItem("Guadalajara")) {
        let temporal = JSON.parse(localStorage.getItem("Guadalajara"));

        temporal.forEach(element => {
            objetotemporal = [...objetotemporal, element]

        });
        let ciudad = {
            vehiculo: tipo,
            recaudacion: precioporhora
        }
        objetotemporal = [...objetotemporal, ciudad];
        localStorage.setItem("Guadalajara", JSON.stringify(objetotemporal))
        tablaGuadalajara();
    }
    else {
        let ciudad = {
            vehiculo: tipo,
            recaudacion: precioporhora
        }
        objetotemporal = [...objetotemporal, ciudad]
        localStorage.setItem("Guadalajara", JSON.stringify(objetotemporal));
        tablaGuadalajara();
    }



}
function ciudadTijuana(tipo, precioporhora) {
    let objetotemporal = [];
    if (localStorage.getItem("Tijuana")) {
        let temporal = JSON.parse(localStorage.getItem("Tijuana"));

        temporal.forEach(element => {
            objetotemporal = [...objetotemporal, element]

        });
        let ciudad = {
            vehiculo: tipo,
            recaudacion: precioporhora
        }
        objetotemporal = [...objetotemporal, ciudad];
        localStorage.setItem("Tijuana", JSON.stringify(objetotemporal))
        tablaTijuana();
    }
    else {
        let ciudad = {
            vehiculo: tipo,
            recaudacion: precioporhora
        }
        objetotemporal = [...objetotemporal, ciudad]
        localStorage.setItem("Tijuana", JSON.stringify(objetotemporal));
        tablaTijuana();
    }

}
function ciudadCuliacan(tipo, precioporhora) {
    let objetotemporal = [];
    if (localStorage.getItem("Culiacan")) {
        let temporal = JSON.parse(localStorage.getItem("Culiacan"));

        temporal.forEach(element => {
            objetotemporal = [...objetotemporal, element]

        });
        let ciudad = {
            vehiculo: tipo,
            recaudacion: precioporhora
        }
        objetotemporal = [...objetotemporal, ciudad];
        localStorage.setItem("Culiacan", JSON.stringify(objetotemporal))
        tablaCuliacan();
    }
    else {
        let ciudad = {
            vehiculo: tipo,
            recaudacion: precioporhora
        }
        objetotemporal = [...objetotemporal, ciudad]
        localStorage.setItem("Culiacan", JSON.stringify(objetotemporal));
        tablaCuliacan();
    }

}
function ciudadToluca(tipo, precioporhora) {
    let objetotemporal = [];
    if (localStorage.getItem("Toluca")) {
        let temporal = JSON.parse(localStorage.getItem("Toluca"));

        temporal.forEach(element => {
            objetotemporal = [...objetotemporal, element]

        });
        let ciudad = {
            vehiculo: tipo,
            recaudacion: precioporhora
        }
        objetotemporal = [...objetotemporal, ciudad];
        localStorage.setItem("Toluca", JSON.stringify(objetotemporal))
        tablaToluca();
    }
    else {
        let ciudad = {
            vehiculo: tipo,
            recaudacion: precioporhora
        }
        objetotemporal = [...objetotemporal, ciudad]
        localStorage.setItem("Toluca", JSON.stringify(objetotemporal));
        tablaToluca();
    }

}
function ciudadMerida(tipo, precioporhora) {
    let objetotemporal = [];
    if (localStorage.getItem("Merida")) {
        let temporal = JSON.parse(localStorage.getItem("Merida"));

        temporal.forEach(element => {
            objetotemporal = [...objetotemporal, element]

        });
        let ciudad = {
            vehiculo: tipo,
            recaudacion: precioporhora
        }
        objetotemporal = [...objetotemporal, ciudad];
        localStorage.setItem("Merida", JSON.stringify(objetotemporal))
        tablaMerida();
    }
    else {
        let ciudad = {
            vehiculo: tipo,
            recaudacion: precioporhora
        }
        objetotemporal = [...objetotemporal, ciudad]
        localStorage.setItem("Merida", JSON.stringify(objetotemporal));
        tablaMerida();

    }

}

function tablaGuadalajara() {

    let bicis = 0;
    let motos = 0;
    let cuatri = 0;
    let golf = 0;
    let temporal = JSON.parse(localStorage.getItem("Guadalajara"));
    let datos = new FormData();

    temporal.forEach(element => {
        if (element.vehiculo === "Bicicleta") {
            bicis = bicis + element.recaudacion;
        }
        else if (element.vehiculo === "Moto") {
            motos = motos + element.recaudacion;

        }
        else if (element.vehiculo === "Cuatrimoto") {
            cuatri = cuatri + element.recaudacion

        }
        else if (element.vehiculo === "Carro de golf") {
            golf = golf + element.recaudacion

        }
    })
    datos.append("Bicicleta", bicis);
    datos.append("Moto", motos);
    datos.append("Cuatrimoto", cuatri);
    datos.append("Carro de golf", golf);
    let ciudadg = JSON.parse(localStorage.getItem("CiudadGuadalajara"));
    if (ciudadg) {
        let tmp = []
        let ciuda = {
            tipoVehiculo: "Bicicleta",
            recaudacion: datos.get("Bicicleta")
        }
        tmp = [...tmp, ciuda];

        let ciuda2 = {
            tipoVehiculo: "Moto",
            recaudacion: datos.get("Moto")
        }
        tmp = [...tmp, ciuda2];
        let ciuda3 = {
            tipoVehiculo: "Cuatrimoto",
            recaudacion: datos.get("Cuatrimoto")
        }
        tmp = [...tmp, ciuda3];
        let ciuda4 = {
            tipoVehiculo: "Carro de golf",
            recaudacion: datos.get("Carro de golf")
        }
        tmp = [...tmp, ciuda4];
        localStorage.setItem("CiudadGuadalajara", JSON.stringify(tmp));
    }
    else {
        let tmp = []
        let ciuda = {
            tipoVehiculo: "Bicicleta",
            recaudacion: datos.get("Bicicleta")
        }
        tmp = [...tmp, ciuda];

        let ciuda2 = {
            tipoVehiculo: "Moto",
            recaudacion: datos.get("Moto")
        }
        tmp = [...tmp, ciuda2];
        let ciuda3 = {
            tipoVehiculo: "Cuatrimoto",
            recaudacion: datos.get("Cuatrimoto")
        }
        tmp = [...tmp, ciuda3];
        let ciuda4 = {
            tipoVehiculo: "Carro de golf",
            recaudacion: datos.get("Carro de golf")
        }
        tmp = [...tmp, ciuda4];

        localStorage.setItem("CiudadGuadalajara", JSON.stringify(tmp));


    }

}
function tablaTijuana() {

    let bicis = 0;
    let motos = 0;
    let cuatri = 0;
    let golf = 0;
    let temporal = JSON.parse(localStorage.getItem("Tijuana"));
    let datos = new FormData();

    temporal.forEach(element => {
        if (element.vehiculo === "Bicicleta") {
            bicis = bicis + element.recaudacion;
        }
        else if (element.vehiculo === "Moto") {
            motos = motos + element.recaudacion;

        }
        else if (element.vehiculo === "Cuatrimoto") {
            cuatri = cuatri + element.recaudacion

        }
        else if (element.vehiculo === "Carro de golf") {
            golf = golf + element.recaudacion

        }
    })
    datos.append("Bicicleta", bicis);
    datos.append("Moto", motos);
    datos.append("Cuatrimoto", cuatri);
    datos.append("Carro de golf", golf);
    let ciudadg = JSON.parse(localStorage.getItem("CiudadTijuana"));
    if (ciudadg) {
        let tmp = []
        let ciuda = {
            tipoVehiculo: "Bicicleta",
            recaudacion: datos.get("Bicicleta")
        }
        tmp = [...tmp, ciuda];

        let ciuda2 = {
            tipoVehiculo: "Moto",
            recaudacion: datos.get("Moto")
        }
        tmp = [...tmp, ciuda2];
        let ciuda3 = {
            tipoVehiculo: "Cuatrimoto",
            recaudacion: datos.get("Cuatrimoto")
        }
        tmp = [...tmp, ciuda3];
        let ciuda4 = {
            tipoVehiculo: "Carro de golf",
            recaudacion: datos.get("Carro de golf")
        }
        tmp = [...tmp, ciuda4];
        localStorage.setItem("CiudadTijuana", JSON.stringify(tmp));
    }
    else {
        let tmp = []
        let ciuda = {
            tipoVehiculo: "Bicicleta",
            recaudacion: datos.get("Bicicleta")
        }
        tmp = [...tmp, ciuda];

        let ciuda2 = {
            tipoVehiculo: "Moto",
            recaudacion: datos.get("Moto")
        }
        tmp = [...tmp, ciuda2];
        let ciuda3 = {
            tipoVehiculo: "Cuatrimoto",
            recaudacion: datos.get("Cuatrimoto")
        }
        tmp = [...tmp, ciuda3];
        let ciuda4 = {
            tipoVehiculo: "Carro de golf",
            recaudacion: datos.get("Carro de golf")
        }
        tmp = [...tmp, ciuda4];

        localStorage.setItem("CiudadTijuana", JSON.stringify(tmp));


    }

}
function tablaCuliacan() {

    let bicis = 0;
    let motos = 0;
    let cuatri = 0;
    let golf = 0;
    let temporal = JSON.parse(localStorage.getItem("Culiacan"));
    let datos = new FormData();

    temporal.forEach(element => {
        if (element.vehiculo === "Bicicleta") {
            bicis = bicis + element.recaudacion;
        }
        else if (element.vehiculo === "Moto") {
            motos = motos + element.recaudacion;

        }
        else if (element.vehiculo === "Cuatrimoto") {
            cuatri = cuatri + element.recaudacion

        }
        else if (element.vehiculo === "Carro de golf") {
            golf = golf + element.recaudacion

        }
    })
    datos.append("Bicicleta", bicis);
    datos.append("Moto", motos);
    datos.append("Cuatrimoto", cuatri);
    datos.append("Carro de golf", golf);
    let ciudadg = JSON.parse(localStorage.getItem("CiudadCuliacan"));
    if (ciudadg) {
        let tmp = []
        let ciuda = {
            tipoVehiculo: "Bicicleta",
            recaudacion: datos.get("Bicicleta")
        }
        tmp = [...tmp, ciuda];

        let ciuda2 = {
            tipoVehiculo: "Moto",
            recaudacion: datos.get("Moto")
        }
        tmp = [...tmp, ciuda2];
        let ciuda3 = {
            tipoVehiculo: "Cuatrimoto",
            recaudacion: datos.get("Cuatrimoto")
        }
        tmp = [...tmp, ciuda3];
        let ciuda4 = {
            tipoVehiculo: "Carro de golf",
            recaudacion: datos.get("Carro de golf")
        }
        tmp = [...tmp, ciuda4];
        localStorage.setItem("CiudadCuliacan", JSON.stringify(tmp));
    }
    else {
        let tmp = []
        let ciuda = {
            tipoVehiculo: "Bicicleta",
            recaudacion: datos.get("Bicicleta")
        }
        tmp = [...tmp, ciuda];

        let ciuda2 = {
            tipoVehiculo: "Moto",
            recaudacion: datos.get("Moto")
        }
        tmp = [...tmp, ciuda2];
        let ciuda3 = {
            tipoVehiculo: "Cuatrimoto",
            recaudacion: datos.get("Cuatrimoto")
        }
        tmp = [...tmp, ciuda3];
        let ciuda4 = {
            tipoVehiculo: "Carro de golf",
            recaudacion: datos.get("Carro de golf")
        }
        tmp = [...tmp, ciuda4];

        localStorage.setItem("CiudadCuliacan", JSON.stringify(tmp));


    }

}
function tablaToluca() {

    let bicis = 0;
    let motos = 0;
    let cuatri = 0;
    let golf = 0;
    let temporal = JSON.parse(localStorage.getItem("Toluca"));
    let datos = new FormData();

    temporal.forEach(element => {
        if (element.vehiculo === "Bicicleta") {
            bicis = bicis + element.recaudacion;
        }
        else if (element.vehiculo === "Moto") {
            motos = motos + element.recaudacion;

        }
        else if (element.vehiculo === "Cuatrimoto") {
            cuatri = cuatri + element.recaudacion

        }
        else if (element.vehiculo === "Carro de golf") {
            golf = golf + element.recaudacion

        }
    })
    datos.append("Bicicleta", bicis);
    datos.append("Moto", motos);
    datos.append("Cuatrimoto", cuatri);
    datos.append("Carro de golf", golf);
    let ciudadg = JSON.parse(localStorage.getItem("CiudadToluca"));
    if (ciudadg) {
        let tmp = []
        let ciuda = {
            tipoVehiculo: "Bicicleta",
            recaudacion: datos.get("Bicicleta")
        }
        tmp = [...tmp, ciuda];

        let ciuda2 = {
            tipoVehiculo: "Moto",
            recaudacion: datos.get("Moto")
        }
        tmp = [...tmp, ciuda2];
        let ciuda3 = {
            tipoVehiculo: "Cuatrimoto",
            recaudacion: datos.get("Cuatrimoto")
        }
        tmp = [...tmp, ciuda3];
        let ciuda4 = {
            tipoVehiculo: "Carro de golf",
            recaudacion: datos.get("Carro de golf")
        }
        tmp = [...tmp, ciuda4];
        localStorage.setItem("CiudadToluca", JSON.stringify(tmp));
    }
    else {
        let tmp = []
        let ciuda = {
            tipoVehiculo: "Bicicleta",
            recaudacion: datos.get("Bicicleta")
        }
        tmp = [...tmp, ciuda];

        let ciuda2 = {
            tipoVehiculo: "Moto",
            recaudacion: datos.get("Moto")
        }
        tmp = [...tmp, ciuda2];
        let ciuda3 = {
            tipoVehiculo: "Cuatrimoto",
            recaudacion: datos.get("Cuatrimoto")
        }
        tmp = [...tmp, ciuda3];
        let ciuda4 = {
            tipoVehiculo: "Carro de golf",
            recaudacion: datos.get("Carro de golf")
        }
        tmp = [...tmp, ciuda4];

        localStorage.setItem("CiudadToluca", JSON.stringify(tmp));


    }

}
function tablaMerida() {

    let bicis = 0;
    let motos = 0;
    let cuatri = 0;
    let golf = 0;
    let temporal = JSON.parse(localStorage.getItem("Merida"));
    let datos = new FormData();

    temporal.forEach(element => {
        if (element.vehiculo === "Bicicleta") {
            bicis = bicis + element.recaudacion;
        }
        else if (element.vehiculo === "Moto") {
            motos = motos + element.recaudacion;

        }
        else if (element.vehiculo === "Cuatrimoto") {
            cuatri = cuatri + element.recaudacion

        }
        else if (element.vehiculo === "Carro de golf") {
            golf = golf + element.recaudacion

        }
    })
    datos.append("Bicicleta", bicis);
    datos.append("Moto", motos);
    datos.append("Cuatrimoto", cuatri);
    datos.append("Carro de golf", golf);
    let ciudadg = JSON.parse(localStorage.getItem("CiudadMerida"));
    if (ciudadg) {
        let tmp = []
        let ciuda = {
            tipoVehiculo: "Bicicleta",
            recaudacion: datos.get("Bicicleta")
        }
        tmp = [...tmp, ciuda];

        let ciuda2 = {
            tipoVehiculo: "Moto",
            recaudacion: datos.get("Moto")
        }
        tmp = [...tmp, ciuda2];
        let ciuda3 = {
            tipoVehiculo: "Cuatrimoto",
            recaudacion: datos.get("Cuatrimoto")
        }
        tmp = [...tmp, ciuda3];
        let ciuda4 = {
            tipoVehiculo: "Carro de golf",
            recaudacion: datos.get("Carro de golf")
        }
        tmp = [...tmp, ciuda4];
        localStorage.setItem("CiudadMerida", JSON.stringify(tmp));
    }
    else {
        let tmp = []
        let ciuda = {
            tipoVehiculo: "Bicicleta",
            recaudacion: datos.get("Bicicleta")
        }
        tmp = [...tmp, ciuda];

        let ciuda2 = {
            tipoVehiculo: "Moto",
            recaudacion: datos.get("Moto")
        }
        tmp = [...tmp, ciuda2];
        let ciuda3 = {
            tipoVehiculo: "Cuatrimoto",
            recaudacion: datos.get("Cuatrimoto")
        }
        tmp = [...tmp, ciuda3];
        let ciuda4 = {
            tipoVehiculo: "Carro de golf",
            recaudacion: datos.get("Carro de golf")
        }
        tmp = [...tmp, ciuda4];

        localStorage.setItem("CiudadMerida", JSON.stringify(tmp));


    }

}


function inicioValidarReca() {
    recaudacionCiudad.forEach(element => {
        if (element.ciudad === "Guadalajara") {
            Guadalajara = [...Guadalajara, element]
        }
        else if (element.ciudad === "Tijuana") {
            Tijuana = [...Tijuana, element]
        }
        else if (element.ciudad === "Culiacan") {
            Culiacan = [...Culiacan, element]
        }
        else if (element.ciudad === "Toluca") {
            Toluca = [...Toluca, element]
        }
        else if (element.ciudad === "Merida") {
            Merida = [...Merida, element]
        }
    });

}

/*************************
 * 
 * funciones y eventos para lista la ciudades con susrespectivas
 * recaudacion de acuerdo a su tipo de vehiculo
 * 
 */
let $recaudacion = document.querySelector(".recaudacion");
if ($recaudacion) {
    let gdl = JSON.parse(localStorage.getItem("CiudadGuadalajara"));
    let tjna = JSON.parse(localStorage.getItem("CiudadTijuana"));
    let clan = JSON.parse(localStorage.getItem("CiudadCuliacan"));
    let tlca = JSON.parse(localStorage.getItem("CiudadToluca"));
    let mda = JSON.parse(localStorage.getItem("CiudadMerida"));
    let $guadalajara = document.querySelector(".guadalajara");
    let $tijuana = document.querySelector(".tijuana");
    let $culiacan = document.querySelector(".culiacan");
    let $toluca = document.querySelector(".toluca");
    let $merida = document.querySelector(".merida");

    if (gdl) {
        $guadalajara.innerHTML = `
        <tr>
            <th>${gdl[0].tipoVehiculo}</th>
            <th>${gdl[0].recaudacion}</th>
        </tr>
        <tr>
            <th>${gdl[1].tipoVehiculo}</th>
            <th>${gdl[1].recaudacion}</th>
        </tr>
        <tr>
            <th>${gdl[2].tipoVehiculo}</th>
            <th>${gdl[2].recaudacion}</th>
        </tr>
        <tr>
            <th>${gdl[3].tipoVehiculo}</th>
            <th>${gdl[3].recaudacion}</th>
        </tr>
        `;
    }
    if (tjna) {
        $tijuana.innerHTML = `
        <tr>
            <th>${tjna[0].tipoVehiculo}</th>
            <th>${tjna[0].recaudacion}</th>
        </tr>
        <tr>
            <th>${tjna[1].tipoVehiculo}</th>
            <th>${tjna[1].recaudacion}</th>
        </tr>
        <tr>
            <th>${tjna[2].tipoVehiculo}</th>
            <th>${tjna[2].recaudacion}</th>
        </tr>
        <tr>
            <th>${tjna[3].tipoVehiculo}</th>
            <th>${tjna[3].recaudacion}</th>
        </tr>
        `;
    }
    if (clan) {
        $culiacan.innerHTML = `
        <tr>
            <th>${clan[0].tipoVehiculo}</th>
            <th>${clan[0].recaudacion}</th>
        </tr>
        <tr>
            <th>${clan[1].tipoVehiculo}</th>
            <th>${clan[1].recaudacion}</th>
        </tr>
        <tr>
            <th>${clan[2].tipoVehiculo}</th>
            <th>${clan[2].recaudacion}</th>
        </tr>
        <tr>
            <th>${clan[3].tipoVehiculo}</th>
            <th>${clan[3].recaudacion}</th>
        </tr>
        `;
    }
    if (tlca) {
        $toluca.innerHTML = `
        <tr>
            <th>${tlca[0].tipoVehiculo}</th>
            <th>${tlca[0].recaudacion}</th>
        </tr>
        <tr>
            <th>${tlca[1].tipoVehiculo}</th>
            <th>${tlca[1].recaudacion}</th>
        </tr>
        <tr>
            <th>${tlca[2].tipoVehiculo}</th>
            <th>${tlca[2].recaudacion}</th>
        </tr>
        <tr>
            <th>${tlca[3].tipoVehiculo}</th>
            <th>${tlca[3].recaudacion}</th>
        </tr>
        `;
    }
    if (mda) {
        $merida.innerHTML = `
        <tr>
            <th>${mda[0].tipoVehiculo}</th>
            <th>${mda[0].recaudacion}</th>
        </tr>
        <tr>
            <th>${mda[1].tipoVehiculo}</th>
            <th>${mda[1].recaudacion}</th>
        </tr>
        <tr>
            <th>${mda[2].tipoVehiculo}</th>
            <th>${mda[2].recaudacion}</th>
        </tr>
        <tr>
            <th>${mda[3].tipoVehiculo}</th>
            <th>${mda[3].recaudacion}</th>
        </tr>
        `;
    }

    console.log(gdl);
    console.log(tjna);
    console.log(clan);
    console.log(tlca);
    console.log(mda);
}

/*****
 * 
 * efunciones y logica para renderizar Nro. deciudad con menor facturación total.
 * 
 */
let $menor = document.querySelector(".menor");
if ($menor) {
    let gdl = JSON.parse(localStorage.getItem("CiudadGuadalajara"));
    let tjna = JSON.parse(localStorage.getItem("CiudadTijuana"));
    let clan = JSON.parse(localStorage.getItem("CiudadCuliacan"));
    let tlca = JSON.parse(localStorage.getItem("CiudadToluca"));
    let mda = JSON.parse(localStorage.getItem("CiudadMerida"));
    let $guadalajara = document.querySelector(".guadalajara");
    let array = [];
    // var myCar = new Object();
    // myCar.make = 'Ford';
    // myCar.model = 'Mustang';
    // myCar.year = 1969;
    // console.log(myCar);
    totalFacturas();
    function totalFacturas() {

        totalUna(5)

        tablabody();


        elmenor();


    }

    function totalUna(numero) {

        if (numero == 5) {
            console.log(gdl);
            sumarVehiculosCiudad(gdl, numero)
            totalUna(numero - 1);
        }
        else if (numero == 4) {
            console.log(tjna);
            sumarVehiculosCiudad(tjna, numero)
            totalUna(numero - 1);

        }
        else if (numero == 3) {
            console.log(clan);
            sumarVehiculosCiudad(clan, numero)
            totalUna(numero - 1);

        }
        else if (numero == 2) {

            console.log(tlca);
            sumarVehiculosCiudad(tlca, numero)
            totalUna(numero - 1);

        }
        else if (numero == 1) {
            console.log(mda);
            sumarVehiculosCiudad(mda, numero)
            totalUna(numero - 1);

        }


    }
    function sumarVehiculosCiudad(referencia, numero) {
        let total = 0;
        let ciudad = "";
        let n = 0;
        if (referencia) {
            referencia.forEach(element => {
                total = (total + (parseInt(element.recaudacion, 10)));
            });
            if (numero == 5)
                ciudad = "Guadalajara", n = 1;
            else if (numero == 4)
                ciudad = "Tijuana", n = 2;
            else if (numero == 3)
                ciudad = "Culiacan", n = 3;
            else if (numero == 2)
                ciudad = "Toluca", n = 4;
            else if (numero == 1)
                ciudad = "Merida", n = 5;
            let city = {
                ciudad: ciudad,
                total: total,
                numero: n
            }
            array = [...array, city];
        }



    }
    function tablabody() {
        console.log(array);
        let tabla = document.querySelector(".tablamenor tbody");
        if (array[0]) {
            tabla.innerHTML = tabla.innerHTML + `
        <tr>
            <th>${array[0].numero}</th>
            <th>${array[0].ciudad}</th>
            <th>${array[0].total}</th>
        </tr>
        `}
        if (array[1]) {
            tabla.innerHTML = tabla.innerHTML + `
            <tr>
            <th>${array[1].numero}</th>
            <th>${array[1].ciudad}</th>
            <th>${array[1].total}</th>
            </tr>`
        }
        if (array[2]) {
            tabla.innerHTML = tabla.innerHTML + `
            <tr>
            <th>${array[2].numero}</th>
            <th>${array[2].ciudad}</th>
            <th>${array[2].total}</th>
            </tr>`
        }
        if (array[3]) {
            tabla.innerHTML = tabla.innerHTML + `
            <tr>
            <th>${array[3].numero}</th>
            <th>${array[3].ciudad}</th>
            <th>${array[3].total}</th>
            </tr>`
        }
        if (array[4]) {
            tabla.innerHTML = tabla.innerHTML + `
            <tr>
            <th>${array[4].numero}</th>
            <th>${array[4].ciudad}</th>
            <th>${array[4].total}</th>
            </tr>`
        }



    }
    function elmenor() {

        if (!array) {
            var oJSON = sortJSON(array, 'total', 'desc');
            document.querySelector(".elnumero").innerHTML = oJSON[4].numero;
        }

    }
    function sortJSON(data, key, orden) {
        return data.sort(function (a, b) {
            var x = a[key],
                y = b[key];

            if (orden === 'asc') {
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            }

            if (orden === 'desc') {
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            }
        });
    }
}
let ordencreciente = document.querySelector(".ordencreciente");
if (ordencreciente) {
    let gdl = JSON.parse(localStorage.getItem("CiudadGuadalajara"));
    let tjna = JSON.parse(localStorage.getItem("CiudadTijuana"));
    let clan = JSON.parse(localStorage.getItem("CiudadCuliacan"));
    let tlca = JSON.parse(localStorage.getItem("CiudadToluca"));
    let mda = JSON.parse(localStorage.getItem("CiudadMerida"));
    let $guadalajara = document.querySelector(".guadalajara");
    let array = [];
    // let tbody = document.querySelector(".tbody");
    // let JSON = sortJSON(array, 'total', 'desc');
    totalUna(5)
    elmenor();
    function totalUna(numero) {

        if (numero == 5) {
            console.log(gdl);
            sumarVehiculosCiudad(gdl, numero)
            totalUna(numero - 1);
        }
        else if (numero == 4) {
            console.log(tjna);
            sumarVehiculosCiudad(tjna, numero)
            totalUna(numero - 1);

        }
        else if (numero == 3) {
            console.log(clan);
            sumarVehiculosCiudad(clan, numero)
            totalUna(numero - 1);

        }
        else if (numero == 2) {

            console.log(tlca);
            sumarVehiculosCiudad(tlca, numero)
            totalUna(numero - 1);

        }
        else if (numero == 1) {
            console.log(mda);
            sumarVehiculosCiudad(mda, numero)
            totalUna(numero - 1);

        }


    }
    function sumarVehiculosCiudad(referencia, numero) {
        let total = 0;
        let ciudad = "";
        let n = 0;
        if (referencia) {
            referencia.forEach(element => {
                total = (total + (parseInt(element.recaudacion, 10)));
            });
            if (numero == 5)
                ciudad = "Guadalajara", n = 1;
            else if (numero == 4)
                ciudad = "Tijuana", n = 2;
            else if (numero == 3)
                ciudad = "Culiacan", n = 3;
            else if (numero == 2)
                ciudad = "Toluca", n = 4;
            else if (numero == 1)
                ciudad = "Merida", n = 5;
            let city = {
                ciudad: ciudad,
                total: total,
                numero: n
            }
            array = [...array, city];
        }
    }
    function elmenor() {

        if (array) {
            var oJSON = sortJSON(array, 'total', 'desc');
            console.log(oJSON);
            let tablatbody =  document.querySelector(".tbodyee");
            if(oJSON[0]){
                tablatbody.innerHTML = tablatbody.innerHTML+
                `
                <tr>
                    <th>${oJSON[0].numero}</th>
                    <th>${oJSON[0].ciudad}</th>
                    <th>${oJSON[0].total}</th>
                </tr>
                `
            }
            if(oJSON[1]){
                tablatbody.innerHTML = tablatbody.innerHTML+
                `
                <tr>
                    <th>${oJSON[1].numero}</th>
                    <th>${oJSON[1].ciudad}</th>
                    <th>${oJSON[1].total}</th>
                </tr>
                `
            }
            if(oJSON[2]){
                tablatbody.innerHTML = tablatbody.innerHTML+
                `
                <tr>
                    <th>${oJSON[2].numero}</th>
                    <th>${oJSON[2].ciudad}</th>
                    <th>${oJSON[2].total}</th>
                </tr>
                `
            }

            if(oJSON[3]){
                tablatbody.innerHTML = tablatbody.innerHTML+
                `
                <tr>
                    <th>${oJSON[3].numero}</th>
                    <th>${oJSON[3].ciudad}</th>
                    <th>${oJSON[3].total}</th>
                </tr>
                `
            }
            if(oJSON[4]){
                tablatbody.innerHTML = tablatbody.innerHTML+
                `
                <tr>
                    <th>${oJSON[4].numero}</th>
                    <th>${oJSON[4].ciudad}</th>
                    <th>${oJSON[4].total}</th>
                </tr>
                `
            }
            
        }
        
    }
    function sortJSON(data, key, orden) {
        return data.sort(function (a, b) {
            var x = a[key],
                y = b[key];

            if (orden === 'asc') {
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            }

            if (orden === 'desc') {
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            }
        });
    }

}



let procentaje = document.querySelector(".procentaje");
if(procentaje){
    let gdl = JSON.parse(localStorage.getItem("CiudadGuadalajara"));
    let tjna = JSON.parse(localStorage.getItem("CiudadTijuana"));
    let clan = JSON.parse(localStorage.getItem("CiudadCuliacan"));
    let tlca = JSON.parse(localStorage.getItem("CiudadToluca"));
    let mda = JSON.parse(localStorage.getItem("CiudadMerida"));
    let $guadalajara = document.querySelector(".guadalajara");
    let array = [];
    // let tbody = document.querySelector(".tbody");
    // let JSON = sortJSON(array, 'total', 'desc');
    totalUna(5)
    elmenor();
    function totalUna(numero) {

        if (numero == 5) {
            console.log(gdl);
            sumarVehiculosCiudad(gdl, numero)
            totalUna(numero - 1);
        }
        else if (numero == 4) {
            console.log(tjna);
            sumarVehiculosCiudad(tjna, numero)
            totalUna(numero - 1);

        }
        else if (numero == 3) {
            console.log(clan);
            sumarVehiculosCiudad(clan, numero)
            totalUna(numero - 1);

        }
        else if (numero == 2) {

            console.log(tlca);
            sumarVehiculosCiudad(tlca, numero)
            totalUna(numero - 1);

        }
        else if (numero == 1) {
            console.log(mda);
            sumarVehiculosCiudad(mda, numero)
            totalUna(numero - 1);

        }


    }
    function sumarVehiculosCiudad(referencia, numero) {
        let total = 0;
        let ciudad = "";
        let n = 0;
        if (referencia) {
            referencia.forEach(element => {
                total = (total + (parseInt(element.recaudacion, 10)));
            });
            if (numero == 5)
                ciudad = "Guadalajara", n = 1;
            else if (numero == 4)
                ciudad = "Tijuana", n = 2;
            else if (numero == 3)
                ciudad = "Culiacan", n = 3;
            else if (numero == 2)
                ciudad = "Toluca", n = 4;
            else if (numero == 1)
                ciudad = "Merida", n = 5;
            let city = {
                ciudad: ciudad,
                total: total,
                numero: n
            }
            array = [...array, city];
        }
    }
    function elmenor() {

        if (array) {
            var oJSON = sortJSON(array, 'total', 'desc');
            console.log(oJSON);
            let maximo = 0;
            let uno =0;
            let dos = 0;
            let tres = 0;
            let cuatro = 0;
            let cinco = 0;

            
            if(oJSON[0]){
                maximo = maximo + parseInt(oJSON[0].total,10);
                uno = parseInt(oJSON[0].total,10);
            }
            if(oJSON[1]){
                maximo = maximo + parseInt(oJSON[1].total,10);
                dos = parseInt(oJSON[1].total,10)
            }
            if(oJSON[2]){
                maximo = maximo + parseInt(oJSON[2].total,10);
                tres = parseInt(oJSON[2].total,10)
            }
            if(oJSON[3]){
                maximo = maximo + parseInt(oJSON[3].total,10);
                cuatro =parseInt(oJSON[3].total,10)
            }
            if(oJSON[4]){
                maximo = maximo + parseInt(oJSON[4].total,10);
                cinco =parseInt(oJSON[4].total,10)
                
            }
            document.querySelector(".elnumero").innerHTML = "$ "+maximo + " =  100%";

            let tablatbody =  document.querySelector(".bodyt");
            if(oJSON[0]){
                tablatbody.innerHTML = tablatbody.innerHTML+
                `
                <tr>
                    <th>${oJSON[0].ciudad}</th>
                    <th>${oJSON[0].total}</th>
                    <th>${(uno/maximo)*100} %</th>
                </tr>
                `
            }
            if(oJSON[1]){
                tablatbody.innerHTML = tablatbody.innerHTML+
                `
                <tr>
                    <th>${oJSON[1].ciudad}</th>
                    <th>${oJSON[1].total}</th>
                    <th>${(dos/maximo)*100} %</th>
                </tr>
                `
            }
            if(oJSON[2]){
                tablatbody.innerHTML = tablatbody.innerHTML+
                `
                <tr>
                    <th>${oJSON[2].ciudad}</th>
                    <th>${oJSON[2].total}</th>
                    <th>${(tres/maximo)*100} %</th>
                </tr>
                `
            }

            if(oJSON[3]){
                tablatbody.innerHTML = tablatbody.innerHTML+
                `
                <tr>
                    <th>${oJSON[3].ciudad}</th>
                    <th>${oJSON[3].total}</th>
                    <th>${(cuatro/maximo) *100} %</th>
                </tr>
                `
            }
            if(oJSON[4]){
                tablatbody.innerHTML = tablatbody.innerHTML+
                `
                <tr>
                    <th>${oJSON[4].ciudad}</th>
                    <th>${oJSON[4].total}</th>
                    <th>${(cinco/maximo)*100} %</th>
                </tr>
                `
            }
            
        }
        
    }
    function sortJSON(data, key, orden) {
        return data.sort(function (a, b) {
            var x = a[key],
                y = b[key];

            if (orden === 'asc') {
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            }

            if (orden === 'desc') {
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            }
        });
    }
}
