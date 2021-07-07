(async function($) {
  "use strict";
    var userCode = document.getElementById('usercode').value;
    $('input[name="dates"]').daterangepicker({
      opens: 'left',
      startDate: moment().startOf('year'),
      endDate: moment(),
      alwaysShowCalendars: true,
      autoApply: true,
      showDropdowns: true,
      locale: {
        format: 'DD/MM/YYYY'
      }
    }, async function(start, end, label) {
        for(var index in charsObj){
            charsObj[index].destroy();
        }
        response = await GetCharData(userCode, start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
        fillchart(response);
    });
  const current_year = moment().startOf('year').format('YYYY-MM-DD')
  const current_day = moment().format('YYYY-MM-DD')
  Promise.all([
    GetDayHabits(userCode),
    GetCharData(userCode, current_year,current_day)
  ]).then(([habitResponse, CharResponse]) => {
    FillDayCard(habitResponse.data);
    fillchart(CharResponse);
  }).catch((err) => {
    console.log(err);
});

  

})(jQuery)

var charsObj = {
  lectura: "",
  fragmento: "",
  audios: "",
  eventos: "",
  contactos: "",
  planes: "",
  invitactiones: "",
  seguimiento: "",
  volumen: ""
}

async function GetDayHabits(user_code){
    response = await fetch(`/dashboard/getdayhabit/${user_code}`);
    var daydata = await response.json();
    return daydata;
}
async function GetCharData(user_code, date_from, date_to)
{
  const url = new URL(window.location.origin + '/dashboard/gethabits');
  const param = {
    discordcode: user_code,
    datefrom: date_from,
    dateto: date_to
  }
  url.search = new URLSearchParams(param).toString();
  var response = await fetch(url);
  var monthdata = await response.json();
  return monthdata;
};

function fillchart(data){
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

  
  var filter = data.data.filter(element => element.UserHabits_Habit_name === 'lectura');
  var labels = filter.map(element =>  monthNames[new Date(element.UserAction_Created_Month).getMonth()])
  var ldata = filter.map(element => element.UserHabits_Action_quantity);
  charsObj.lectura = new Chart(document.getElementById("lectureChar"), {
    type: 'bar',
    data: {
      labels: labels,
      maxBarThickness: 8,
      minBarLength: 2,
      datasets: [
        {
          label: "Paginas Leidas",
          data: ldata,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
        }
      ],
    borderWidth: 1
    },
    options: {
        legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
});

var filter = data.data.filter(element => element.UserHabits_Habit_name === 'fragmento');
labels = filter.map(element =>  monthNames[new Date(element.UserAction_Created_Month).getMonth()])
ldata = filter.map(element => element.UserHabits_Action_quantity);
charsObj.fragmento = new Chart(document.getElementById("fragmentChar"), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: "Fragmentos Compartidos",
          data: ldata,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
        }
      ],
    borderWidth: 1
    },
    options: {
        legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
});

filter = data.data.filter(element => element.UserHabits_Habit_name === 'audios');
labels = filter.map(element =>  monthNames[new Date(element.UserAction_Created_Month).getMonth()])
ldata = filter.map(element => element.UserHabits_Action_quantity);
charsObj.audios = new Chart(document.getElementById("audiosChar"), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: "Audios",
          data: ldata,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
        }
      ],
    borderWidth: 1
    },
    options: {
        legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
});


filter = data.data.filter(element => element.UserHabits_Habit_name === 'eventos');
labels = filter.map(element =>  monthNames[new Date(element.UserAction_Created_Month).getMonth()])
ldata = filter.map(element => element.UserHabits_Action_quantity);
charsObj.eventos = new Chart(document.getElementById("eventChar"), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: "Asistencia",
          data: ldata,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
        }
      ],
    borderWidth: 1
    },
    options: {
        legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
});

filter = data.data.filter(element => element.UserHabits_Habit_name === 'contactos');
labels = filter.map(element =>  monthNames[new Date(element.UserAction_Created_Month).getMonth()])
ldata = filter.map(element => element.UserHabits_Action_quantity);
charsObj.contactos = new Chart(document.getElementById("contactChar"), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: "Contactos",
          data: ldata,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
        }
      ],
    borderWidth: 1
    },
    options: {
        legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
});

filter = data.data.filter(element => element.UserHabits_Habit_name === 'planes');
labels = filter.map(element =>  monthNames[new Date(element.UserAction_Created_Month).getMonth()])
ldata = filter.map(element => element.UserHabits_Action_quantity);
charsObj.planes = new Chart(document.getElementById("planChar"), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: "Planes",
          data: ldata,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
        }
      ],
    borderWidth: 1
    },
    options: {
        legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
});

filter = data.data.filter(element => element.UserHabits_Habit_name === 'invitaciones');
labels = filter.map(element =>  monthNames[new Date(element.UserAction_Created_Month).getMonth()])
ldata = filter.map(element => element.UserHabits_Action_quantity);
charsObj.invitactiones = new Chart(document.getElementById("invChar"), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: "Invitaciones",
          data: ldata,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
        }
      ],
    borderWidth: 1
    },
    options: {
        legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
});

filter = data.data.filter(element => element.UserHabits_Habit_name === 'seguimientos');
labels = filter.map(element =>  monthNames[new Date(element.UserAction_Created_Month).getMonth()])
ldata = filter.map(element => element.UserHabits_Action_quantity);
charsObj.seguimiento = new Chart(document.getElementById("followChar"), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: "Seguimientos",
          data: ldata,
          maxBarThickness: 8,
          minBarLength: 2,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
        },
      ],
    borderWidth: 1
    },
    options: {
        legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
});

filter = data.data.filter(element => element.UserHabits_Habit_name === 'volumen');
labels = filter.map(element =>  monthNames[new Date(element.UserAction_Created_Month).getMonth()])
ldata = filter.map(element => element.UserHabits_Action_quantity);
charsObj.volumen = new Chart(document.getElementById("volumen"), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: "Volumen",
          data: ldata,
          maxBarThickness: 8,
          minBarLength: 2,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
        },
      ],
    borderWidth: 1
    },
    options: {
        legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
});

}

function FillDayCard(data){
    var contacts = data.filter(e => e.UserHabits_Habit_name == "contactos")
    var inv = data.filter(e => e.UserHabits_Habit_name == "invitaciones")
    var plan = data.filter(e => e.UserHabits_Habit_name == "planes")
    document.getElementById("contacts").innerText = contacts.length == 0 ? 0 : contacts[0].UserHabits_Action_quantity
    document.getElementById("inv").innerText = inv.length == 0 ? 0 : inv[0].UserHabits_Action_quantity
    document.getElementById("planes").innerText = plan.length == 0 ? 0 : plan[0].UserHabits_Action_quantity
}