const diasDeSemana = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado" ];
// View
// const spanTime = document.getElementById("time");
// const spanDay = document.getElementById("week-day");
// const nsInfo = document.getElementById("ns-info");
// const snInfo = document.getElementById("sn-info");
// const viaInfo = document.getElementById("via-info");

// Datos
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
            inicio: "06:0",
            finaliza: "09:0",
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


const simular = (e) => {
    e.preventDefault();

    let start = dayjs(startDate.value);
    let end = dayjs(endDate.value);
    let distance = (end.diff(start, 'millisecond'));


    const timerInterval = setInterval(() => {



        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);




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
            distance -= 60000;
            start = start.add(60000, 'millisecond');
            let hora = start.hour() + ":" + start.minute();


            console.log(hora);
            // const x = Math.floor(Math.random() * (3 - 1) + 1);


            if (currentDay >= 1 && currentDay <= 5) {

                if (ruta === false) {
                    for (let i = 0; i < 3; i++) {
                        if (hora >= semana.norteSur[i].inicio && hora <= semana.norteSur[i].finaliza) {

                            cerrarRuta = (start.add(parseInt(semana.norteSur[i].horas), 'hour')).hour() + ":" + (start.add(2, 'hour')).minute();
                            info.innerHTML = `<br/> Ruta aerea norte sur abierta a las ${hora} `;
                            console.log(`Ruta aerea abierta a las ${hora}`);
                            ruta = true;

                            ObjToPrint[cont] = {
                                sentido: "norte - sur",
                                apertura: hora,
                                cierre: cerrarRuta,
                            }
                            break;
                        } else if ((hora >= semana.surNorte[i].inicio && hora <= semana.surNorte[i].finaliza)) {
                            cerrarRuta = (start.add(parseInt(semana.surNorte[i].horas), 'hour')).hour() + ":" + (start.add(2, 'hour')).minute();
                            info.innerHTML = `Ruta aerea sur norte abierta a las ${hora}`;
                            console.log(`<br/> Ruta aerea abierta a las ${hora}`);
                            ruta = true;
                            ObjToPrint[cont] = {
                                sentido: "norte - sur",
                                apertura: hora,
                                cierre: cerrarRuta,
                            }
                            break;
                        }
                    }

                }
                else {

                    if (hora === cerrarRuta) {

                        info.innerHTML = `Ruta aerea cerrada a las ${hora}`;
                        despejarRuta = (start.add(2, 'hour')).hour() + ":" + (start.add(2, 'hour')).minute();
                        toPrint(ObjToPrint[cont]);

                    }

                    if (hora === despejarRuta) {
                        info.innerHTML = `Ruta Despejada`;
                        ruta = false;
                        cont++;
                    }

                }
//-------------------------------------------------- WKEEKEND --------------------------------------------------
            } else {

                if (ruta === false) {
                    for (let i = 0; i < 2; i++) {
                        if (hora >= finDeSemana.norteSur[i].inicio && hora <= finDeSemana.norteSur[i].finaliza) {

                            cerrarRuta = (start.add(parseInt(finDeSemana.norteSur[i].horas), 'hour')).hour() + ":" + (start.add(2, 'hour')).minute();
                            info.innerHTML = `Ruta aerea norte sur abierta a las ${hora} `;
                            console.log(`Ruta aerea abierta a las ${hora}`);
                            ruta = true;
                            ObjToPrint[cont] = {
                                sentido: "norte - sur",
                                apertura: hora,
                                cierre: cerrarRuta,
                            }
                            break;
                        } else if ((hora >= finDeSemana.surNorte[i].inicio && hora <= finDeSemana.surNorte[i].finaliza)) {
                            cerrarRuta = (start.add(parseInt(finDeSemana.surNorte[i].horas), 'hour')).hour() + ":" + (start.add(2, 'hour')).minute();
                            info.innerHTML = `Ruta aerea sur norte abierta a las ${hora}`;
                            console.log(`<br/> Ruta aerea abierta a las ${hora}`);
                            ruta = true;
                            ObjToPrint[cont] = {
                                sentido: "norte - sur",
                                apertura: hora,
                                cierre: cerrarRuta,
                            }
                            break;
                        }
                    }

                }
                else {

         
                    if (hora === cerrarRuta) {

                        info.innerHTML = `Ruta aerea cerrada a las ${hora}`;
                        despejarRuta = (start.add(2, 'hour')).hour() + ":" + (start.add(2, 'hour')).minute();
                        toPrint(ObjToPrint[cont]);

                    }

                    if (hora === despejarRuta) {
                        info.innerHTML = `Ruta Despejada`;
                        ruta = false;
                        cont++;
                    }

                }



            }



            // console.log(hora);


        }


    }
        , 100);


}


const toPrint = (obj) => {

    document.getElementById("result").insertRow(-1).innerHTML = `
    <th scope="row">${cont}</th>
    <td>${obj.apertura}</td>
    <td>${obj.cierre}</td>
    <td>${obj.sentido}</td>`


}

const toPrinta = (e) => {
    e.preventDefault();
    document.getElementById("result").insertRow(-1).innerHTML = `
    <th scope="row">${1}</th>
    <td>jaja}</td>
    <td>salu2}</td>
    <td>genial}</td>`


}


{/*  */ }