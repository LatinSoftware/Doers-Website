$(document).ready(async function()
{
  var userCode = document.getElementById('usercode').value;

  var response = await fetch(`/dashboard/getuserhabit/${userCode}`);
  var monthdata = await response.json();

  if(monthdata.data.length > 0){
    response = await fetch(`/dashboard/getdayhabit/${userCode}`);
    var daydata = await response.json();
    if(daydata.data.length > 0){
      FillDayCard(daydata.data)
    }    
      fillchart(monthdata);
  }else{
    Swal.fire({
      icon: 'info',
      title: 'No hay Datos',
      text: 'No hemos encontrado habitos registrados este año',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `OK`,
      denyButtonText: `Volver`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        window.location.href = window.location.origin;
      }
    })
  }

});

function fillchart(data){
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
  var lectura = data.data.filter(element => element.id === 3);
  var labels = lectura.map(element =>  monthNames[new Date(element.habit_month).getMonth()])
  var ldata = lectura.map(element => element.total);
  new Chart(document.getElementById("lectureChar"), {
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

var filter = data.data.filter(element => element.id === 4);
labels = filter.map(element =>  monthNames[new Date(element.habit_month).getMonth()])
ldata = filter.map(element => element.total);
new Chart(document.getElementById("fragmentChar"), {
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

filter = data.data.filter(element => element.id === 5);
labels = filter.map(element =>  monthNames[new Date(element.habit_month).getMonth()])
ldata = filter.map(element => element.total);
new Chart(document.getElementById("audiosChar"), {
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


filter = data.data.filter(element => element.id === 1);
labels = filter.map(element =>  monthNames[new Date(element.habit_month).getMonth()])
ldata = filter.map(element => element.total);
new Chart(document.getElementById("eventChar"), {
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

filter = data.data.filter(element => element.id === 6);
labels = filter.map(element =>  monthNames[new Date(element.habit_month).getMonth()])
ldata = filter.map(element => element.total);
new Chart(document.getElementById("contactChar"), {
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

filter = data.data.filter(element => element.id === 7);
labels = filter.map(element =>  monthNames[new Date(element.habit_month).getMonth()])
ldata = filter.map(element => element.total);
new Chart(document.getElementById("planChar"), {
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

filter = data.data.filter(element => element.id === 8);
labels = filter.map(element =>  monthNames[new Date(element.habit_month).getMonth()])
ldata = filter.map(element => element.total);
new Chart(document.getElementById("invChar"), {
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

filter = data.data.filter(element => element.id === 17);
labels = filter.map(element =>  monthNames[new Date(element.habit_month).getMonth()])
ldata = filter.map(element => element.total);
new Chart(document.getElementById("followChar"), {
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
}

function FillDayCard(data){
    var contacts = data.filter(e => e.name == "contactos")
    var inv = data.filter(e => e.name == "invitaciones")
    var plan = data.filter(e => e.name == "planes")
    document.getElementById("contacts").innerText = contacts.length == 0 ? 0 : contacts[0].quantity
    document.getElementById("inv").innerText = inv.length == 0 ? 0 : inv[0].quantity
    document.getElementById("planes").innerText = plan.length == 0 ? 0 : plan[0].quantity
}