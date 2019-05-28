// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var socket = io('http://localhost:8080/');
var ctx_ozone = document.getElementById('ozoneChart').getContext('2d');
var data_ozone = {
    labels: [0],
    datasets: [{
        data: [0],
        label: 'Ozone',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: '#66ccff'
    }]
}

var optionsAnimations = {animation: false}
var chart_ozone = new Chart(ctx_ozone, {
    type: 'line',
    data: data_ozone,
    options: optionsAnimations
})

socket.on('connect', function(){
    socket.on('message', function (msg) {
        var value = JSON.parse(msg.value)
        if(msg.topic == "sensorudara"){
            var length = data_ozone.labels.length
            if(length >= 10){
                data_ozone.datasets[0].data.shift()
                data_ozone.labels.shift()
            }
            data_ozone.labels.push(moment.utc(value.datecol).format('HH:mm'))
            data_ozone.datasets[0].data.push(value.ozone)
            
            chart_ozone.update()
        }
    });
});