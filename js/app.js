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
            document.getElementById("tiempo-pomodoro").innerHTML = "15:00";
            document.getElementById("descanso-corto").innerHTML = "5:00";
            document.getElementById("descanso-largo").innerHTML = "5:00";
    }
}


// Función que comienza el pomodoro y realiza la cuenta atrás
// TODO hacer funcional para el pomodoro, descanso corto y descanso largo
function empezarPomodoro(){
    var inicio = 59;

    // Intento de reciclado del código, afecta a las funciones: pausarPomodoro() y terminarPomodoro()
    // Revisar con calma y hacer los ajustes necesarios.

    /*if(document.getElementById("empezar").id){
        document.getElementById("empezar").id = "empezarDC";
    }else if(document.getElementById("empezarDC").id){
        document.getElementById("empezarDC").id = "empezarDL";
    }else{
        document.getElementById("empezarDL").id = "empezar";
    }*/

    document.getElementById("botones").style = "display: none";
    document.getElementById("descanso-corto").style = "display: none";
    document.getElementById("descanso-largo").style = "display: none";
    var duracion = document.getElementById("tiempo-pomodoro").innerHTML;
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
            terminarPomodoro();
            alert("Has terminado el pomodoro");
        }
            
        segundos = inicio - contador;
        if(segundos < 10){
            document.getElementById("tiempo-pomodoro").innerHTML = minutos + ":0" + segundos;
        }else{
            document.getElementById("tiempo-pomodoro").innerHTML = minutos + ":" + segundos;
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
        document.getElementById("empezar").style = "display: none";
        document.getElementById("continuar").style = "display: inline";
    }
    
}

// Función para terminar el pomodoro
// Oculta el apartado de pomodoro y vuelve a mostrar los botones
function terminarPomodoro(){
    clearInterval(idPomodoro);
    document.getElementById("empezar").style = "display: inline";
    document.getElementById("continuar").style = "display: none";
    document.getElementById("pomodoro").style = "display: none";
    document.getElementById("botones").style = "display: block";
    document.getElementById("descanso-corto").style = "display: inline";
    document.getElementById("descanso-largo").style = "display: inline";
}

