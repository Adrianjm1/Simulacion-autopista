
// Datos
const diasDeSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");

let currentDay;
let simulacionDias;
let ruta = false;
let cerrarRuta;
let despejarRuta;
let cont = 0;
let ObjToPrint = {};


const semana = {
    norteSur: {
        0: {
            inicio: "6:0",
            finaliza: "9:0",
            horario: "6:00 a.m. – 9:00 a.m.",
            horas: 3,
            densidad: 119
        },
        1: {
            inicio: "11:30",
            finaliza: "13:00",
            horario: "11:30 a.m. – 1:00 p.m.",
            horas: 1.5,
            densidad: 105
        },
        2: {
            inicio: "17:0",
            finaliza: "19:30",
            horario: "5:00 p.m. – 7:30 p.m.",
            horas: 2.5,
            densidad: 120
        }
    },
    surNorte: {
        0: {
            inicio: "6:0",
            finaliza: "9:0",
            horario: "6:00 a.m. – 9:00 a.m",
            horas: 3,
            densidad: 117
        },
        1: {
            inicio: "11:30",
            finaliza: "13:0",
            horario: "11:30 a.m. – 1:00 p.m.",
            horas: 1.5,
            densidad: 98
        },
        2: {
            inicio: "17:0",
            finaliza: "21:15",
            horario: "5:00 p.m. – 9:15 p.m.",
            horas: 4.25,
            densidad: 76
        }
    }
};

const finDeSemana = {
    norteSur: {
        0: {
            inicio: "13:0",
            finaliza: "15:0",
            horario: "1:00 p.m. – 3:00 p.m.",
            horas: 2,
            densidad: 107
        },
        1: {
            inicio: "20:0",
            finaliza: "6:0",
            horario: "8:00 p.m. - 6:00 a.m.",
            horas: 10,
            densidad: 80
        },
    },
    surNorte: {
        0: {
            finaliza: "9:30",
            inicio: "7:0",
            horario: "7:00 a.m. – 9:30 a.m.",
            durancion: 2.5,
            densidad: 105
        },
        1: {
            inicio: "22:0",
            finaliza: "4:30",
            horario: "10:00 p.m. - 4:30 a.m.",
            durancion: 6.5,
            densidad: 54
        },

    }
};


//Funcion para simular trafico

const simular = (e) => {
    e.preventDefault();
    clearInterval(timerInterval);


    //Obtener los datos de los inputs
    let start = dayjs(startDate.value);
    let end = dayjs(endDate.value);
    let distance = (end.diff(start, 'millisecond'));

    const timerInterval = setInterval(() => {

        //Calculos de tiempos

        let x = Math.floor(Math.random() * 2) + 1;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        //Temporizador (Cuenta regresiva)

        const day = document.getElementById("day");
        const info = document.getElementById("info");
        const timer = document.getElementById("timer").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";


        let dateAux = new Date(start);
        const currentDay = dateAux.getDay();
        const dayname = diasDeSemana[currentDay];
        day.innerHTML = `${dayname}`;

        if (distance <= 0) {

            timer.innerHTML = "Finalizo";
            clearInterval(timerInterval);
        } else {

            //Conteo por minuto.

            distance -= 60000;
            start = start.add(60000, 'millisecond');
            let hora = start.hour() + ":" + start.minute();

    
            //Simulacion de trafico por dia de semana.
            if (currentDay >= 1 && currentDay <= 5) {

                if (ruta === false) {
                    for (let i = 0; i < 3; i++) {
                        // De norte a sur
                        if (hora >= semana.norteSur[i].inicio && hora <= semana.norteSur[i].finaliza && (x===1)) {

                            cerrarRuta = (start.add(parseInt(semana.norteSur[i].horas), 'hour')).hour() + ":" + (start.add(2, 'hour')).minute();
                            info.innerHTML = `Ruta aerea norte sur abierta a las ${hora} `;
                            ruta = true;
                            ObjToPrint[cont] = {
                                sentido: "norte - sur",
                                apertura: hora,
                                cierre: cerrarRuta,
                                dia: dayname,
                            }
                            x++;
                            toPrint(ObjToPrint[cont]);
                            break;

                            // De sur a Norte
                        } else if (hora >= semana.surNorte[i].inicio && hora <= semana.surNorte[i].finaliza  && (x ===2)) {

                            cerrarRuta = (start.add(parseInt(semana.surNorte[i].horas), 'hour')).hour() + ":" + (start.add(2, 'hour')).minute();
                            info.innerHTML = `Ruta aerea sur norte abierta a las ${hora}`;
                            ruta = true;
                            ObjToPrint[cont] = {
                                sentido: "sur - norte",
                                apertura: hora,
                                cierre: cerrarRuta,
                                dia: dayname,
                            }
                            x++;
                            toPrint(ObjToPrint[cont]);
                            break;
                        }
                    }

                }
                else {

                    if (hora === cerrarRuta) {
                        info.innerHTML = `Ruta aerea cerrada a las ${hora}`;
                        despejarRuta = (start.add(2, 'hour')).hour() + ":" + (start.add(2, 'hour')).minute();
                    }

                    if (hora === despejarRuta) {
                        info.innerHTML = `Ruta Despejada`;
                        ruta = false;
                        cont++;
                    }

                }
                //-------------------------------------------------- Fines de semana --------------------------------------------------
            } else {

                if (ruta === false) {
                    for (let i = 0; i < 2; i++) {
                        //De norte a sur
                        if (hora >= finDeSemana.norteSur[i].inicio && hora <= finDeSemana.norteSur[i].finaliza && (x===1)) {

                            cerrarRuta = (start.add(parseInt(finDeSemana.norteSur[i].horas), 'hour')).hour() + ":" + (start.add(2, 'hour')).minute();
                            info.innerHTML = `Ruta aerea norte sur abierta a las ${hora} `;
                            console.log(`Ruta aerea abierta a las ${hora}`);
                            ruta = true;

                            ObjToPrint[cont] = {
                                sentido: "norte - sur",
                                apertura: hora,
                                cierre: cerrarRuta,
                                dia: dayname,
                            }
                            toPrint(ObjToPrint[cont]);
                            break;
                        // De sur a norte
                        } else if ((hora >= finDeSemana.surNorte[i].inicio && hora <= finDeSemana.surNorte[i].finaliza && (x===2))) {
                            cerrarRuta = (start.add(parseInt(finDeSemana.surNorte[i].horas), 'hour')).hour() + ":" + (start.add(2, 'hour')).minute();
                            info.innerHTML = `Ruta aerea sur norte abierta a las ${hora}`;
                            console.log(`<br/> Ruta aerea abierta a las ${hora}`);
                            ruta = true;
                            ObjToPrint[cont] = {
                                sentido: "sur - norte",
                                apertura: hora,
                                cierre: cerrarRuta,
                                dia: dayname,
                            }
                            toPrint(ObjToPrint[cont]);
                            break;
                        }
                    }

                }
                else {

                    //Si la ruta esta abierta y la hora de cierre es igual a la hora actual, se cierra la ruta.

                    if (hora === cerrarRuta) {
                        info.innerHTML = `Ruta aerea cerrada a las ${hora}`;
                        despejarRuta = (start.add(2, 'hour')).hour() + ":" + (start.add(2, 'hour')).minute();
                    }

                    //Si la ruta esta cerrada, y la hora de despeje es igual a la hora actual, se despeja la ruta.

                    if (hora === despejarRuta) {
                        info.innerHTML = `Ruta Despejada`;
                        ruta = false;
                        cont++;
                    }
                }
            }
        }


    }  , 100);


}


//Funcion para mostrar en pantalla los datos de la ruta.

const toPrint = (obj) => {

    document.getElementById("result").insertRow(-1).innerHTML = `
    <th scope="row">${obj.dia}</th>
    <td>${obj.apertura}</td>
    <td>${obj.cierre}</td>
    <td>${obj.sentido}</td>`
}


