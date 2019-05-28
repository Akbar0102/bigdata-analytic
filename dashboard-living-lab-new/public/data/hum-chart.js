// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var socket = io('http://localhost:8080/');
var ctx_hum = document.getElementById('humChart').getContext('2d');
var data_hum = {
    labels: [0],
    datasets: [{
        data: [0],
        label: 'Humidity',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: '#999966'
    }]
}

var optionsAnimations = {animation: false}
var chart_hum = new Chart(ctx_hum, {
    type: 'line',
    data: data_hum,
    options: optionsAnimations
})

socket.on('connect', function(){
    socket.on('message', function (msg) {
        var value = JSON.parse(msg.value)
        if(msg.topic == "sensorudara"){
            var length = data_hum.labels.length
            if(length >= 10){
                data_hum.datasets[0].data.shift()
                data_hum.labels.shift()
            }
            data_hum.labels.push(moment.utc(value.datecol).format('HH:mm'))
            data_hum.datasets[0].data.push(value.humidity)
            
            chart_hum.update()
        }
    });
});