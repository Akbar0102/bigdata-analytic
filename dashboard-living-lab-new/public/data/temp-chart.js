// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var socket = io('http://localhost:8080/');
var ctx_temp = document.getElementById('tempChart').getContext('2d');
var data_temp = {
    labels: [0],
    datasets: [{
        data: [0],
        label: 'Temperature',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: '#0066cc'
    }]
}

var optionsAnimations = {animation: false}
var chart_temp = new Chart(ctx_temp, {
    type: 'line',
    data: data_temp,
    options: optionsAnimations
})

socket.on('connect', function(){
    socket.on('message', function (msg) {
        var value = JSON.parse(msg.value)
        if(msg.topic == "sensorudara"){
            var length = data_temp.labels.length
            if(length >= 10){
                data_temp.datasets[0].data.shift()
                data_temp.labels.shift()
            }
            data_temp.labels.push(moment.utc(value.datecol).format('HH:mm'))
            data_temp.datasets[0].data.push(value.temperature)
            
            chart_temp.update()
        }
    });
});