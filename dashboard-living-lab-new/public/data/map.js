var map = L.map('map').setView([-6.914389, 107.613952], 18);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var LeafIcon = L.Icon.extend({
	options: {
		iconSize: [25, 25]
	}
});

var cctv = new LeafIcon({iconUrl: '/img/cctv.png'}),
	bin = new LeafIcon({iconUrl: '/img/bin.png'}),
	sensor = new LeafIcon({iconUrl: '/img/sensor.png'}),
	parking = new LeafIcon({iconUrl: '/img/parking.png'});

//cctv	
L.marker([-6.914954, 107.614348], {icon: cctv}).bindPopup("CCTV 1").addTo(map);
L.marker([-6.914886, 107.613937], {icon: cctv}).bindPopup("CCTV 2").addTo(map);
L.marker([-6.913825, 107.613726], {icon: cctv}).bindPopup("CCTV 3").addTo(map);

//bin
L.marker([-6.914187, 107.613911], {icon: bin}).bindPopup("Bin 1").addTo(map);
L.marker([-6.913511, 107.613482], {icon: bin}).bindPopup("Bin 2").addTo(map);
L.marker([-6.915130, 107.614761], {icon: bin}).bindPopup("Bin 3").addTo(map);

//sensor
L.marker([-6.914796, 107.614210], {icon: sensor}).bindPopup("Sensor 1").addTo(map);
L.marker([-6.914173, 107.613448], {icon: sensor}).bindPopup("Sensor 2").addTo(map);
L.marker([-6.913484, 107.613205], {icon: sensor}).bindPopup("Sensor 3").addTo(map);
L.marker([-6.913404, 107.613961	], {icon: sensor}).bindPopup("Sensor 4").addTo(map);

//parking
L.marker([-6.914644, 107.614013], {icon: parking}).bindPopup("Parking 1").addTo(map);
console.log(map);