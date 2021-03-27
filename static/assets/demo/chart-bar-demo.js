// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const options = {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: "",
      data: [],
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
    }],
  },
  options: {
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  },
    legend: {
      display: false
    }
  }
}

fetch('/dashboard/getuserhabit/301432605499326464')
.then(response => response.json())
.then(data => 
  {
    // habito - lectura
    var lectura = data.data.filter(element => element.id = 3);
    labels = lectura.map(element =>  monthNames[new Date(element.habit_month).getMonth()])
    ldata = lectura.map(element => element.total);
    var ctx = document.getElementById("lectureChar");
    var lectura = new Chart(ctx, options);
    console.log("lecturaChart", lectura);
    lectura.data.labels = labels;
    lectura.data.datasets[0].label = "Paginas Leidas";
    lectura.data.datasets[0].data = ldata;
    lectura.update();
    //habito - fragment
    var filter = data.data.filter(element => element.id == 4);
    var fabels = filter.map(element =>  monthNames[new Date(element.habit_month).getMonth()])
    var fdata = filter.map(element => element.total);
    console.log("labels", fabels)
    console.log("data", fdata)
    var ctx2 = document.getElementById("fragmentChar");
    var fragmentChar = new Chart(ctx2, options);
    fragmentChar.data.labels = fabels;
    fragmentChar.data.datasets[0].label = "Fragmentos Compartidos";
    fragmentChar.data.datasets[0].data = fdata;
    fragmentChar.update();
    // // habito - audios
    // var filter = data.data.filter(element => element.id == 5);
    // labels = filter.map(element =>  monthNames[new Date(element.habit_month).getMonth()])
    // ldata = filter.map(element => element.total);
    // var ctx = document.getElementById("audiosChar");
    // var audiosChar = new Chart(ctx, options);
    // audiosChar.data.labels = labels;
    // audiosChar.data.datasets[0].label = "Paginas Leidas";
    // audiosChar.data.datasets[0].data = ldata;
    // audiosChar.update();
    // // habito - event
    // var filter = data.data.filter(element => element.id == 1);
    // labels = filter.map(element =>  monthNames[new Date(element.habit_month).getMonth()])
    // ldata = filter.map(element => element.total);
    // var ctx = document.getElementById("eventChar");
    // var eventChar = new Chart(ctx, options);
    // eventChar.data.labels = labels;
    // eventChar.data.datasets[0].label = "Paginas Leidas";
    // eventChar.data.datasets[0].data = ldata;
    // eventChar.update();
    // // habito - Contactos
    // var filter = data.data.filter(element => element.id == 6);
    // labels = filter.map(element =>  monthNames[new Date(element.habit_month).getMonth()])
    // ldata = filter.map(element => element.total);
    // var ctx = document.getElementById("contactChar");
    // var contactChar = new Chart(ctx, options);
    // contactChar.data.labels = labels;
    // contactChar.data.datasets[0].label = "Paginas Leidas";
    // contactChar.data.datasets[0].data = ldata;
    // contactChar.update();
    // // habito - planChar
    // var filter = data.data.filter(element => element.id == 7);
    // labels = filter.map(element =>  monthNames[new Date(element.habit_month).getMonth()])
    // ldata = filter.map(element => element.total);
    // var ctx = document.getElementById("planChar");
    // var planChar = new Chart(ctx, options);
    // planChar.data.labels = labels;
    // planChar.data.datasets[0].label = "Paginas Leidas";
    // planChar.data.datasets[0].data = ldata;
    // planChar.update();
    
    // // habito - invChar
    // var filter = data.data.filter(element => element.id == 8);
    // labels = filter.map(element =>  monthNames[new Date(element.habit_month).getMonth()])
    // ldata = filter.map(element => element.total);
    // var ctx = document.getElementById("invChar");
    // var invChar = new Chart(ctx, options);
    // invChar.data.labels = labels;
    // invChar.data.datasets[0].label = "Paginas Leidas";
    // invChar.data.datasets[0].data = ldata;
    // invChar.update();

    // // habito - Fllow
    // var filter = data.data.filter(element => element.id == 17);
    // labels = filter.map(element =>  monthNames[new Date(element.habit_month).getMonth()])
    // ldata = filter.map(element => element.total);
    // var ctx = document.getElementById("followChar");
    // var followChar = new Chart(ctx, options);
    // followChar.data.labels = labels;
    // followChar.data.datasets[0].label = "Paginas Leidas";
    // followChar.data.datasets[0].data = ldata;
    // followChar.update();
    
});




