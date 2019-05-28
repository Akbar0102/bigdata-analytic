// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
var randomScalingFactor = function() {
 return Math.round(Math.random() * 100);
};


var socket = io('http://localhost:8080/');
var ctx2 = document.getElementById('waste1a').getContext('2d');
var gradientStroke = ctx2.createLinearGradient(500, 0, 100, 0);
gradientStroke.addColorStop(0, "#000000");
gradientStroke.addColorStop(1, "#4286f4");
// var data2 = {
//     labels: ["Temperature"],
//     datasets: [{
//         data: [0],
//         label: 'Temperature',
//         backgroundColor: [gradientStroke],
//         borderWidth: 0,
//         label: "Score"
//     }]
// }

var chart2 = new Chart(ctx2, {
    type: 'radialGauge',
    data:{
        labels: ["Waste Level"],
        datasets: [{
            data: [0],
            label: 'Waste Level',
            backgroundColor: [gradientStroke],
            borderWidth: 0,
            label: "Score"
        }]
    },
    options: {
       animation: {
        // Boolean - Whether we animate the rotation of the radialGauge
        animateRotate: true,
        // Boolean - Whether we animate scaling the radialGauge from the centre
        animateScale: true,

      },
      domain: [0, 100],
    //   trackColor: 'rgb(204, 221, 238)',
      responsive: true,
      legend: {},
      title: {
       display: true,
       text: "Bin - 2"
      },
      centerPercentage: 80,
      centerArea: {
        // whether to display the center text value
        displayText: true,
        // font for the center text
        fontFamily: null,
        // color of the center text
        fontColor: null,
        // the size of the center text
        fontSize: null,
        // padding around the center area
        padding: 4,
        // an image to use for the center background
        backgroundImage: null,
        // a color to use for the center background
        backgroundColor: null,
        // the text to display in the center
        // this could be a string or a callback that returns a string
        // if a callback is provided it will be called with (value, options)
        text: null
      }
    }
})

chart2.data.datasets.forEach(function(dataset) {
    dataset.data = dataset.data.map(function() {
      return randomScalingFactor();
  });
});

socket.on('connect', function(){
    socket.on('message', function (msg) {
        var value = JSON.parse(msg.value)
        var length = chart2.data.datasets[0].data
        if(msg.topic == "waste1"){
          if(length >= 1){
              chart2.data.datasets[0].data.shift()
          }
          chart2.data.datasets[0].data.push(value.level)
          
          chart2.update()
        }
    });
});