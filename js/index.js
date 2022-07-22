const diasDeSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

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

const semana = {
    norteSur: {
        0: {
            hInicio: "06:00",
            hFinal: "09:00",
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
            inicio: "17:00",
            finaliza: "19:30",
            horario: "5:00 p.m. – 7:30 p.m.",
            horas: 2.5,
            densidad: 120
        }
    },
    surNorte: {
        0: {
            inicio: "06:00",
            finaliza: "09:00",
            horario: "6:00 a.m. – 9:00 a.m",
            horas: 3,
            densidad: 117
        },
        1: {
            inicio: "11:30",
            finaliza: "13:00",
            horario: "11:30 a.m. – 1:00 p.m.",
            horas: 1.5,
            densidad: 98
        },
        2: {
            inicio: "17:00",
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
            inicio: "13:00",
            finaliza: "15:00",
            horario: "1:00 p.m. – 3:00 p.m.",
            durancion: 2,
            densidad: 107
        },
        1: {
            inicio: "20:00",
            finaliza: "06:00",
            horario: "8:00 p.m. - 6:00 a.m.",
            durancion: 10,
            densidad: 80
        },
    },
    surNorte: {
        0: {
            finaliza: "09:30",
            inicio: "07:00",
            horario: "7:00 a.m. – 9:30 a.m.",
            durancion: 2.5,
            densidad: 105
        },
        1: {
            inicio: "22:00",
            finaliza: "04:30",
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









    //timer




    const timerInterval = setInterval(() => {

        //add days to day js



        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);


        const day = document.getElementById("day");
        const timer = document.getElementById("timer").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";


        let dateAux = new Date(start);
        const currentDay = dateAux.getDay() - 1;
        const dayname = diasDeSemana[currentDay];
        day.innerHTML = `${dayname}`;

        if (distance <= 0) {
    
            timer.innerHTML = "Finalizo";
            clearInterval(timerInterval);
        } else {
            distance -= 10000;
            start = start.add(10000, 'millisecond');

            let hora = new Date(start).getHours();


            console.log(hora);
   
        }




    }
        , 1);


}


