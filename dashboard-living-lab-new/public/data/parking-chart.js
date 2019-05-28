// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};
   
var socket = io('http://localhost:8080/');
var ctx_park = document.getElementById('parkChart').getContext('2d');
var gradientStroke = ctx_park.createLinearGradient(500, 0, 100, 0);
gradientStroke.addColorStop(0, '#80b6f4');
gradientStroke.addColorStop(1, '#f49080');

//park2
var ctx_park2 = document.getElementById('parkChart2').getContext('2d');
var gradientStroke2 = ctx_park2.createLinearGradient(500, 0, 100, 0);
gradientStroke2.addColorStop(0, '#80b6f4');
gradientStroke2.addColorStop(1, '#f49080');

var station = document.getElementById('parking-station');
var spaces = document.getElementById('parking-spaces');

//park2
var station2 = document.getElementById('parking-station2');
var spaces2 = document.getElementById('parking-spaces2');

var chart_park = new Chart(ctx_park, {
    type: 'radialGauge',
    data:{
        labels: ["Parking"],
        datasets: [{
            data: [0],
            label: 'Parking',
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
            animateScale: true
        },
        showValue: true,
        responsive: true,
        legend: {display: false},
        title: {
            display: true,
            text: "Parking Occupy"
        },
        centerPercentage: 80,
        domain: [0, 100],
        centerArea: {
            displayText: true,
            padding: 4,
            text: function(value, options) {
                return value + '%';
            }
          }
    }
})

//park2
var chart_park2 = new Chart(ctx_park2, {
    type: 'radialGauge',
    data:{
        labels: ["Parking"],
        datasets: [{
            data: [0],
            label: 'Parking',
            backgroundColor: [gradientStroke2],
            borderWidth: 0,
            label: "Score"
        }]
    },
    options: {
        animation: {
            // Boolean - Whether we animate the rotation of the radialGauge
            animateRotate: true,
            // Boolean - Whether we animate scaling the radialGauge from the centre
            animateScale: true
        },
        showValue: true,
        responsive: true,
        legend: {display: false},
        title: {
            display: true,
            text: "Parking Occupy"
        },
        centerPercentage: 80,
        domain: [0, 100],
        centerArea: {
            displayText: true,
            padding: 4,
            text: function(value, options) {
                return value + '%';
            }
          }
    }
})

chart_park.data.datasets.forEach(function(dataset) {
    dataset.data = dataset.data.map(function() {
        return randomScalingFactor();
    });
});

//park2
chart_park2.data.datasets.forEach(function(dataset) {
    dataset.data = dataset.data.map(function() {
        return randomScalingFactor();
    });
});

socket.on('connect', function(){
    socket.on('message', function (msg) {
        var value = JSON.parse(msg.value)
        if(msg.topic == "parking"){
            if(value.parking_id == "babraham-park-and-ride"){
                //console.log(msg)
                var length = chart_park.data.datasets[0].data.length
                if(length >= 1 || length == 0){
                    station.innerHTML = " ";
                    spaces.innerHTML = " ";
                    chart_park.data.datasets[0].data.shift()
                }
                station.innerHTML += '<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">' + value.parking_id + '</div>';
                spaces.innerHTML += '<div class="h5 mb-0 font-weight-bold text-gray-800">' + + value.spaces_occupied + '/' + value.spaces_capacity + '</div>';
                chart_park.data.datasets[0].data.push(((value.spaces_occupied/value.spaces_capacity)*100).toFixed(2))
                
                chart_park.update()
            }else if(value.parking_id == "queen-anne-terrace-car-park"){
                var length = chart_park2.data.datasets[0].data.length
                if(length >= 1 || length == 0){
                    station2.innerHTML = " ";
                    spaces2.innerHTML = " ";
                    chart_park2.data.datasets[0].data.shift()
                }
                station2.innerHTML += '<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">' + value.parking_id + '</div>';
                spaces2.innerHTML += '<div class="h5 mb-0 font-weight-bold text-gray-800">' + + value.spaces_occupied + '/' + value.spaces_capacity + '</div>';
                chart_park2.data.datasets[0].data.push(((value.spaces_occupied/value.spaces_capacity)*100).toFixed(2))
                
                chart_park2.update()
            }
        }
    });
});
   
   
   