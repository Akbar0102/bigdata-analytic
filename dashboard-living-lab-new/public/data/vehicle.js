Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

var color = Chart.helpers.color;
var colorNames = Object.keys(window.chartColors);
var socket = io('http://localhost:8080/');
var ctx_veh = document.getElementById('vehicleChart').getContext('2d');
var data_veh = {
    labels: [],
    datasets: [{
        data: [],
        label: 'Vehicle',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }]
}

var optionsAnimations = {animation: false}
var chart_veh = new Chart(ctx_veh, {
    type: 'bar',
    data: data_veh,
    options: optionsAnimations
})

socket.on('connect', function(){
    socket.on('message', function (msg) {
        var value = JSON.parse(msg.value)
        if(msg.topic == "vehicle"){
            var length = data_veh.labels.length
            if(length >= 10){
                data_veh.datasets[0].data.shift()
                data_veh.labels.shift()
            }

            var colorName = colorNames[data_veh.labels.length % colorNames.length];
            var dsColor = window.chartColors[colorName];
            
            var index = data_veh.labels.indexOf(value.type)
            console.log(index)
            if(index >= 0){
                console.log('sudah ada label')
                //update
                data_veh.datasets[0].data[index] = data_veh.datasets[0].data[index] + value.count
                data_veh.labels[index] = value.type
            }else{
                //data baru, label belum ada, insert data baru
                data_veh.labels.push(value.type)
                data_veh.datasets[0].data.push(value.count)
                //data_veh.datasets[0].backgroundColor = color(dsColor).alpha(0.5).rgbString()
            }
            
            chart_veh.update()
        }
    });
});