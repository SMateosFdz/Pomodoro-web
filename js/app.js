// TODO mirar porqué tarda tanto en reanudarse el pomodoro
// TODO hacer funcionales los descansos
// TODO hacer que los DIVs de pomodoros y descansos sumen cuando se terminen
// TODO hacer documentacion de las funciones

//Variables globales con IDs de SetInterval, para pausar y terminar pomodoros y descansos
var idPomodoro;
var idDescansoCorto;
var idDescansoLargo;

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

//Función para dar formato a la hora
const formatoHora = (hora) => {
    if(hora < 10){
        hora = '0' + hora;
    }
    return hora;
}

// Intervalo para la hora
setInterval(mostrarReloj, 1000);


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
function pomodoro(valor){
    switch(valor){
        case 1:
            document.getElementById("pomodoro").style = "display: block";
            document.getElementById("rango1").style = "display: none";
            document.getElementById("rango2").style = "display: none";
            document.getElementById("rango3").style = "display: none";
            document.getElementById("tiempo-pomodoro").innerHTML = "15:00";
            document.getElementById("descanso-corto").innerHTML = "5:00";
            document.getElementById("descanso-largo").innerHTML = "10:00";
            break;

        case 2:
            document.getElementById("pomodoro").style = "display: block";
            document.getElementById("rango1").style = "display: none";
            document.getElementById("rango2").style = "display: none";
            document.getElementById("rango3").style = "display: none";
            document.getElementById("tiempo-pomodoro").innerHTML = "20:00";
            document.getElementById("descanso-corto").innerHTML = "5:00";
            document.getElementById("descanso-largo").innerHTML = "10:00";
            break;

        case 3:
            document.getElementById("pomodoro").style = "display: block";
            document.getElementById("rango1").style = "display: none";
            document.getElementById("rango2").style = "display: none";
            document.getElementById("rango3").style = "display: none";
            document.getElementById("tiempo-pomodoro").innerHTML = "30:00";
            document.getElementById("descanso-corto").innerHTML = "5:00";
            document.getElementById("descanso-largo").innerHTML = "15:00";
            break;

        case 4:
            document.getElementById("pomodoro").style = "display: block";
            document.getElementById("rango1").style = "display: none";
            document.getElementById("rango2").style = "display: none";
            document.getElementById("rango3").style = "display: none";
            document.getElementById("tiempo-pomodoro").innerHTML = "60:00";
            document.getElementById("descanso-corto").innerHTML = "8:00";
            document.getElementById("descanso-largo").innerHTML = "20:00";
            break;

        case 5:
            document.getElementById("pomodoro").style = "display: block";
            document.getElementById("rango1").style = "display: none";
            document.getElementById("rango2").style = "display: none";
            document.getElementById("rango3").style = "display: none";
            document.getElementById("tiempo-pomodoro").innerHTML = "90:00";
            document.getElementById("descanso-corto").innerHTML = "15:00";
            document.getElementById("descanso-largo").innerHTML = "25:00";
            break;

        case 6:
            document.getElementById("pomodoro").style = "display: block";
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


// Función que comienza el pomodoro y realiza la cuenta atrás
function empezarPomodoro(){
    var inicio = 59;

    var boton = document.getElementsByName("comienzo")[0];
    var duracion, valor;

    if(boton.id == "empezar"){
        document.getElementById("empezar").id = "empezarDC";
        document.getElementById("descanso-corto").style = "display: none";
        document.getElementById("descanso-largo").style = "display: none";
        duracion = document.getElementById("tiempo-pomodoro").innerHTML;
        valor = "tiempo-pomodoro";

    }else if(boton.id == "empezarDC"){
        document.getElementById("empezarDC").id = "empezarDL";
        document.getElementById("tiempo-pomodoro").style = "display: none";
        document.getElementById("descanso-corto").style = "display: inline-block";
        document.getElementById("descanso-largo").style = "display: none";
        duracion = document.getElementById("descanso-corto").innerHTML;
        valor = "descanso-corto";

    }else{
        document.getElementById("empezarDL").id = "empezar";
        document.getElementById("tiempo-pomodoro").style = "display: none";
        document.getElementById("descanso-corto").style = "display: none";
        document.getElementById("descanso-largo").style = "display: inline-block";
        duracion = document.getElementById("descanso-largo").innerHTML;
        valor = "descanso-largo";
    }

    document.getElementById("botones").style = "display: none";

    var [minutos, segundos] = duracion.split(":");

    var pausaSecs = false;
    var contador = 0;

    minutos = parseInt(minutos);
    segundos = parseInt(segundos);

    if(segundos != 0){
        inicio = segundos;
        pausaSecs = true;
    }

    idPomodoro = setInterval(pomodoro, 1000);

    function pomodoro() {
        
        if(!pausaSecs){
            minutos = --minutos;
            pausaSecs = true;
        }

        if(minutos < 0){
            clearInterval(idPomodoro);
            sumar(valor);
            empezarPomodoro();
            document.getElementsByName("comienzo")[0].style = "display: inline";
            document.getElementById("continuar").style = "display: none";
        }
            
        segundos = inicio - contador;
        if(segundos < 10){
            document.getElementById(valor).innerHTML = minutos + ":0" + segundos;
        }else{
            document.getElementById(valor).innerHTML = minutos + ":" + segundos;
        }
    
        contador++;
    
        if(contador > 59){
            pausaSecs = false;
            contador = 0;
        }
    }
}

// Función para pausar el pomodoro
// Solo funciona si el pomodoro ha sido empezado
function pausarPomodoro(){
    if (typeof idPomodoro !== 'undefined'){
        clearInterval(idPomodoro);
        document.getElementsByName("comienzo")[0].style = "display: none";
        document.getElementById("continuar").style = "display: inline";

        if(document.getElementsByName("comienzo")[0].id == "empezar"){
            document.getElementsByName("comienzo")[0].id = "empezarDL";

        }else if(document.getElementsByName("comienzo")[0].id == "empezarDC"){
            document.getElementsByName("comienzo")[0].id = "empezar";

        }else{
            document.getElementsByName("comienzo")[0].id = "empezarDC";
        }

    }
    
}

// Función para terminar el pomodoro
// Oculta el apartado de pomodoro y vuelve a mostrar los botones
function terminarPomodoro(){
    clearInterval(idPomodoro);
    document.getElementsByName("comienzo")[0].style = "display: inline";
    document.getElementsByName("comienzo")[0].id = "empezar";
    document.getElementById("continuar").style = "display: none";
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

