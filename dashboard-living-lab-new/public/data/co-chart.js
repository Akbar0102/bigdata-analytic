// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var socket = io('http://localhost:8080/');
var ctx_co = document.getElementById('coChart').getContext('2d');
var data_co = {
    labels: [0],
    datasets: [{
        data: [0],
        label: 'Carbon Monoxide',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: '#ff0000'
    }]
}

var optionsAnimations = {animation: false}
var chart_co = new Chart(ctx_co, {
    type: 'line',
    data: data_co,
    options: optionsAnimations
})

socket.on('connect', function(){
    socket.on('message', function (msg) {
        var value = JSON.parse(msg.value)
        if(msg.topic == "sensorudara"){
            console.log(msg)
            var length = data_co.labels.length
            if(length >= 10){
                data_co.datasets[0].data.shift()
                data_co.labels.shift()
            }
            data_co.labels.push(moment.utc(value.datecol).format('HH:mm'))
            data_co.datasets[0].data.push(value.carbon_monoxide)
            
            chart_co.update()
        }
    });
});