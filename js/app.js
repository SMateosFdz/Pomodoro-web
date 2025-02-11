// TODO hacer documentacion de las funciones
// TODO optimizar con funciones cambios visuales y de estilo
// TODO modificar nombres de las nuevas funciones y optimizar el nuevo codigo si es posible

//Variables globales con IDs de SetInterval, para pausar y terminar pomodoros y descansos
var idPomodoro, contadorDL = 0;
var globalP, globalDC, globalDL;

//Función para mostrar la hora y fecha
const mostrarReloj = () => {
    let fecha = new Date();
    let hora = formatoHora(fecha.getHours());
    let minuto = formatoHora(fecha.getMinutes());

    document.getElementById("hora").innerHTML = `${hora}:${minuto}`;

    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"];
    const dias = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
    let diaSemana = dias[fecha.getDay()];
    let dia = fecha.getDate();
    let mes = meses[fecha.getMonth()];
    let anio = fecha.getFullYear();

    document.getElementById("fecha").innerHTML = `${diaSemana}, ${dia} ${mes} ${anio}`;
}

// Intervalo para la hora
setInterval(mostrarReloj, 1000);

//Función para dar formato a la hora
const formatoHora = (hora) => {
    if(hora < 10){
        hora = '0' + hora;
    }
    return hora;
}

// Función para actualizar valores en los pomodoros personalizados
function actualizarValor(valor, num){
    if(num == 1){
        document.getElementById("tiempo-pomodoro").innerHTML = valor + ":00";
    } else if(num == 2){
        document.getElementById("descanso-corto").innerHTML = valor + ":00";
    } else if(num == 3){
        document.getElementById("descanso-largo").innerHTML = valor + ":00";
    }
}


// Función que actualiza el pomodoro y los descansos correspondientes
// en función del pomodoro escogido
function eleccionPomodoro(valor){
    switch(valor){
        case 1:
            document.getElementById("pomodoro").style = "display: block";
            document.getElementById("contadores").style.display = "inline";
            document.getElementById("contadores").style.gridTemplateColumns = "none";
            document.getElementById("rango1").style = "display: none";
            document.getElementById("rango2").style = "display: none";
            document.getElementById("rango3").style = "display: none";
            document.getElementById("tiempo-pomodoro").innerHTML = "15:00";
            document.getElementById("descanso-corto").innerHTML = "5:00";
            document.getElementById("descanso-largo").innerHTML = "10:00";
            break;

        case 2:
            document.getElementById("pomodoro").style = "display: block";
            document.getElementById("contadores").style.display = "inline";
            document.getElementById("contadores").style.gridTemplateColumns = "none";
            document.getElementById("rango1").style = "display: none";
            document.getElementById("rango2").style = "display: none";
            document.getElementById("rango3").style = "display: none";
            document.getElementById("tiempo-pomodoro").innerHTML = "20:00";
            document.getElementById("descanso-corto").innerHTML = "5:00";
            document.getElementById("descanso-largo").innerHTML = "10:00";
            break;

        case 3:
            document.getElementById("pomodoro").style = "display: block";
            document.getElementById("contadores").style.display = "inline";
            document.getElementById("contadores").style.gridTemplateColumns = "none";
            document.getElementById("rango1").style = "display: none";
            document.getElementById("rango2").style = "display: none";
            document.getElementById("rango3").style = "display: none";
            document.getElementById("tiempo-pomodoro").innerHTML = "30:00";
            document.getElementById("descanso-corto").innerHTML = "5:00";
            document.getElementById("descanso-largo").innerHTML = "15:00";
            break;

        case 4:
            document.getElementById("pomodoro").style = "display: block";
            document.getElementById("contadores").style.display = "inline";
            document.getElementById("contadores").style.gridTemplateColumns = "none";
            document.getElementById("rango1").style = "display: none";
            document.getElementById("rango2").style = "display: none";
            document.getElementById("rango3").style = "display: none";
            document.getElementById("tiempo-pomodoro").innerHTML = "60:00";
            document.getElementById("descanso-corto").innerHTML = "8:00";
            document.getElementById("descanso-largo").innerHTML = "20:00";
            break;

        case 5:
            document.getElementById("pomodoro").style = "display: block";
            document.getElementById("contadores").style.display = "inline";
            document.getElementById("contadores").style.gridTemplateColumns = "none";
            document.getElementById("rango1").style = "display: none";
            document.getElementById("rango2").style = "display: none";
            document.getElementById("rango3").style = "display: none";
            document.getElementById("tiempo-pomodoro").innerHTML = "90:00";
            document.getElementById("descanso-corto").innerHTML = "15:00";
            document.getElementById("descanso-largo").innerHTML = "25:00";
            break;

        case 6:
            document.getElementById("pomodoro").style.display = "block";
            document.getElementById("contadores").style.display = "grid";
            document.getElementById("contadores").style.gridTemplateColumns = "repeat(2, 1fr)";
            document.getElementById("descanso-corto").style = "display: inline-block";
            document.getElementById("descanso-largo").style = "display: inline-block";
            document.getElementById("rango1").style = "display: inline";
            document.getElementById("rango2").style = "display: inline";
            document.getElementById("rango3").style = "display: inline";
            document.getElementById("tiempo-pomodoro").innerHTML = "10:00"; // Se debe poner puesto que la función actualizarValor() no introduce el primer valor correcto
            document.getElementById("descanso-corto").innerHTML = "5:00";
            document.getElementById("descanso-largo").innerHTML = "5:00";
    }
}

// Función que se llama con los botones "empezar" y "continuar"
// Se tiene en cuenta el valor del contador global para el DL
// Si DL != 0 no es necesario tomar los valores iniciales de pomodoro, DC y DL
function pomodoro(){
    if(contadorDL == 0){
        getValOriginal();
        empezarPomodoro(1);
    }else{
        empezarPomodoro(1);
    }
}

// Función para obtener los valores originales de pomodoro, DC y DL
function getValOriginal(){
    globalP = document.getElementById("tiempo-pomodoro").innerHTML;
    globalDC = document.getElementById("descanso-corto").innerHTML;
    globalDL = document.getElementById("descanso-largo").innerHTML;
}


// Función que comienza el pomodoro y realiza la cuenta atrás
function empezarPomodoro(bandera){

    var boton = document.getElementsByName("comienzo")[0];
    var duracion, valor;

    document.getElementById("rango1").style.display = "none";
    document.getElementById("rango2").style.display = "none";
    document.getElementById("rango3").style.display = "none";
    document.getElementById("contadores").style.display = "block";

    document.getElementsByName("comienzo")[0].setAttribute("disabled", "true");
    document.getElementsByName("comienzo")[0].style.cursor = "not-allowed";
    document.getElementsByName("comienzo")[0].style.opacity = 0.6;

    document.getElementById("continuar").setAttribute("disabled", "true");
    document.getElementById("continuar").style.cursor = "not-allowed";
    document.getElementById("continuar").style.opacity = 0.6;

    if(bandera == 1){ // Necesario para que al pausar el pomodoro y se reanude no falle
        document.getElementById("tiempo-pomodoro").innerHTML = globalP;
        document.getElementById("descanso-corto").innerHTML = globalDC;
    }

    if(boton.id == "empezar"){ //El pomodoro pasa a DC y DC a pomodoro hasta los 4 pomodoros
        contadorDL++;
        document.getElementById("empezar").id = "empezarDC";
        document.getElementById("tiempo-pomodoro").style.display = "inline-block";
        document.getElementById("descanso-corto").style.display = "none";
        document.getElementById("descanso-largo").style.display = "none";
        duracion = document.getElementById("tiempo-pomodoro").innerHTML;
        valor = "tiempo-pomodoro";

    }else if(boton.id == "empezarDC"){
        if(contadorDL == 4){ //Con 4 pomodoros pasa a DL
            document.getElementById("empezarDC").id = "empezarDL";
            document.getElementById("tiempo-pomodoro").style.display = "none";
            document.getElementById("descanso-corto").style.display = "none";
            document.getElementById("descanso-largo").style.display = "inline-block";
            duracion = document.getElementById("descanso-largo").innerHTML;
            valor = "descanso-largo";
            contadorDL = 0;
        }else{
            document.getElementById("empezarDC").id = "empezar";
            document.getElementById("tiempo-pomodoro").style.display = "none";
            document.getElementById("descanso-corto").style.display = "inline-block";
            document.getElementById("descanso-largo").style.display = "none";
            duracion = document.getElementById("descanso-corto").innerHTML;
            valor = "descanso-corto";
        }
    }

    document.getElementById("botones").style.visibility = "hidden";

    var [minutos, segundos] = duracion.split(":");
    minutos = parseInt(minutos);
    segundos = parseInt(segundos);

    idPomodoro = setInterval(calculo, 1000);
    function calculo() {

        if(segundos === 0){
            if(minutos === 0){
                clearInterval(idPomodoro);
                sumar(valor);
                document.getElementsByName("comienzo")[0].removeAttribute("disabled");
                document.getElementsByName("comienzo")[0].style.display = "inline";
                document.getElementById("continuar").style.display = "none";

                if(valor == "descanso-largo"){ //Tras el descanso largo, el pomodoro se completa y termina
                    terminarPomodoro();
                }else{
                    pomodoro();
                }
            }else{
                minutos--;
                segundos = 59;
            }
        }else{
            segundos--;
        }
        var tiempoFormateado = (minutos < 10 ? "0" + minutos : minutos) + ":" +  (segundos < 10 ? "0" + segundos : segundos);
        document.getElementById(valor).innerHTML = tiempoFormateado;
    }
}

// Función para pausar el pomodoro
// Solo funciona si el pomodoro ha sido empezado
function pausarPomodoro(){
    if (typeof idPomodoro !== 'undefined'){
        clearInterval(idPomodoro);
        document.getElementsByName("comienzo")[0].style.display = "none";
        document.getElementById("continuar").style.display = "inline";
        document.getElementById("continuar").removeAttribute("disabled");

        if(document.getElementsByName("comienzo")[0].id == "empezar"){
            document.getElementsByName("comienzo")[0].id = "empezarDL";

        }else if(document.getElementsByName("comienzo")[0].id == "empezarDC"){
            document.getElementsByName("comienzo")[0].id = "empezar";
        }
    }
    
}

// Función para terminar el pomodoro
// Oculta el apartado de pomodoro y vuelve a mostrar los botones
function terminarPomodoro(){
    clearInterval(idPomodoro);
    contadorDL = 0;
    document.getElementsByName("comienzo")[0].style = "display: inline";
    document.getElementsByName("comienzo")[0].id = "empezar";
    document.getElementsByName("comienzo")[0].removeAttribute("disabled");

    document.getElementById("continuar").style = "display: none";
    document.getElementById("continuar").removeAttribute("disabled");

    document.getElementById("pomodoro").style = "display: none";
    document.getElementById("botones").style = "display: block";
    document.getElementById("tiempo-pomodoro").style = "display: inline";
    document.getElementById("descanso-corto").style = "display: inline";
    document.getElementById("descanso-largo").style = "display: inline";
}

//Función para ir sumando a las estadísticas de pomodoros y descansos
function sumar(valor){
    var texto, conteo;
    if(valor == "tiempo-pomodoro"){
        [texto, conteo] = document.getElementById("statP").innerHTML.split(":");
        conteo = parseInt(conteo);
        conteo = conteo + 1;
        document.getElementById("statP").innerHTML = texto + ": " + conteo;

    }else if(valor == "descanso-corto"){
        [texto, conteo] = document.getElementById("statDC").innerHTML.split(":");
        conteo = parseInt(conteo);
        conteo = conteo + 1;
        document.getElementById("statDC").innerHTML = texto + ": " + conteo;
        
    }else{
        [texto, conteo] = document.getElementById("statDL").innerHTML.split(":");
        conteo = parseInt(conteo);
        conteo = conteo + 1;
        document.getElementById("statDL").innerHTML = texto + ": " + conteo;
    }

}

