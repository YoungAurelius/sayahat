var map = L.map('map').setView([48.0196, 66.9237], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const cities = [
    {
        name: 'Astana',
        coords: [51.1605, 71.4704],
        image: 'images/astana.jpg',
        info: 'Astana, the capital of Kazakhstan, is known for its futuristic skyline and architecture.'
    },
    {
        name: 'Almaty',
        coords: [43.2220, 76.8512],
        image: 'images/almaty.jpg',
        info: 'Almaty is the largest city in Kazakhstan, famous for its beautiful mountains and rich culture.'
    },
    {
        name: 'Shymkent',
        coords: [42.3417, 69.5901],
        image: 'images/shymkennt.jpeg',
        info: 'Shymkent is known for its vibrant markets and historic sites.'
    },
    {
        name: 'Karaganda',
        coords: [49.8008, 73.0944],
        image: 'images/karaganda.jpg',
        info: 'Karaganda is known for its mining history and Soviet architecture.'
    },
    {
        name: 'Aktobe',
        coords: [50.2920, 57.1645],
        image: 'images/aktobe.jpg',
        info: 'Aktobe is a key industrial city in Kazakhstan.'
    },
    {
        name: 'Taraz',
        coords: [42.8956, 71.3658],
        image: 'images/taraz.jpg',
        info: 'Taraz is known for its ancient history and cultural heritage.'
    },
    {
        name: 'Pavlodar',
        coords: [52.2812, 76.9674],
        image: 'images/pavlodar.jpg',
        info: 'Pavlodar is an industrial city located on the Irtysh River.'
    },
    {
        name: 'Ust-Kamenogorsk',
        coords: [49.9482, 82.6124],
        image: 'images/oskemen.jfif',
        info: 'Ust-Kamenogorsk is known for its scenic rivers and mountains.'
    },
    {
        name: 'Semey',
        coords: [50.4216, 80.4510],
        image: 'images/semey.jpeg',
        info: 'Semey is famous for its historical significance and cultural sites.'
    }
];


cities.forEach(function(city) {
    var popupContent = '<div class="city-popup">' +
        '<h3>' + city.name + '</h3>' +
        '<img src="' + city.image + '" alt="' + city.name + '" />' +
        '<p>' + city.info + '</p>' +
        '</div>';

    L.marker(city.coords).addTo(map)
        .bindPopup(popupContent);
});