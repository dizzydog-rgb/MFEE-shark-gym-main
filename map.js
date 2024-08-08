console.log('Hello map!');


function initMap() {
    // initialize map
    var iSpan = { lat: 24.1504802, lng: 120.6500765 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: iSpan
    });
    var marker = new google.maps.Marker({
        position: iSpan,
        map: map
    });


    // calculate diatnace
    const form = document.getElementById('address-form');
    const addressInput = document.getElementById('address');
    const resultsContainer = document.getElementById('results-container');

    const presetPoints = [
        { lat: 24.156481790837304, lng: 120.65558912124612 }, // 精明廠
        { lat: 24.1760372329102, lng: 120.65717696967201 }, // 逢甲廠
        { lat: 24.183397465446873, lng: 120.63237190167492 }, // 福科廠
        { lat: 24.169851177096838, lng: 120.67932128735285 }, // 中清廠
        { lat: 24.191775085844064, lng: 120.66103935173047 }, // 水湳廠
        { lat: 24.137114907129877, lng: 120.6910800915799 }, // 新時代廠
        { lat: 24.115259956022737, lng: 120.66061019834191 }, // 文心南廠
        { lat: 24.16710207743918, lng: 120.72566298240915 }, // 景賢廠
    ];
    const gymLocation = [
        "精明廠", "逢甲廠", "福科廠", "中清廠", "水湳廠", "新時代廠", "文心南廠", "景賢廠"
    ]

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const startAddress = addressInput.value;

        // Clear previous results
        resultsContainer.innerHTML = '';

        // Convert start address to coordinates using geocoding
        geocodeAddress(startAddress, function (startCoordinates) {
            if (!startCoordinates) {
                alert('Invalid start address');
                return;
            }

            // Remove existing marker from map center
            const existingMarker = marker;
            if (existingMarker) {
                existingMarker.setMap(null);
            }

            // Update the map center and add a marker
            map.setCenter(new google.maps.LatLng(startCoordinates.lat, startCoordinates.lng));
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(startCoordinates.lat, startCoordinates.lng),
                map: map
            });

            // Calculate distances and durations to each preset point
            calculateDistances(startCoordinates, presetPoints, function (results) {
                displayResults(results);
            });
        });
    });

    function geocodeAddress(address, callback) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, function (results, status) {
            if (status === 'OK' && results[0]) {
                const coordinates = results[0].geometry.location;
                callback({ lat: coordinates.lat(), lng: coordinates.lng() });
            } else {
                callback(null);
            }
        });
    }


    function calculateDistances(startCoordinates, presetPoints, callback) {
        if (!google.maps.DistanceMatrixService) {
            alert('DistanceMatrixService is not available');
            return;
        }
        const service = new google.maps.DistanceMatrixService();
        const request = {
            origins: [new google.maps.LatLng(startCoordinates.lat, startCoordinates.lng)],
            destinations: presetPoints.map(point => new google.maps.LatLng(point.lat, point.lng)),
            travelMode: google.maps.TravelMode.DRIVING
        };

        service.getDistanceMatrix(request, function (response, status) {
            if (status === 'OK' && response && response.rows && response.rows[0] && response.rows[0].elements) {
                const results = [];
                for (let i = 0; i < response.rows[0].elements.length; i++) {
                    const element = response.rows[0].elements[i];
                    if (element.status === 'OK') {
                        const distance = element.distance ? element.distance.text : 'N/A';
                        const duration = element.duration ? element.duration.text : 'N/A';
                        const distanceValue = element.distance ? element.distance.value : Infinity; // distance in meters for sorting
                        results.push({ gym: gymLocation[i], distance, duration, distanceValue });
                    } else {
                        results.push({ distance: 'N/A', duration: 'N/A', distanceValue: Infinity });
                    }
                }

                // Sort results by distanceValue in ascending order
                results.sort((a, b) => a.distanceValue - b.distanceValue);

                callback(results);
            } else {
                console.error('Error:', status, response);
                callback([]); // 返回空陣列，表示沒有結果
            }
        });
    }

    function displayResults(results) {
        // console.log(results);
        for (let i = 0; i < results.length; i++) {
            const resultElement = document.createElement('div');
            resultElement.innerHTML = `
      <p class="location-title"><b>鄰近的運動場館 ${i + 1}:</b> ${gymLocation[i]} </p>
      <div class="location-info"><p>距離: ${results[i].distance}</p>
      <p>交通時間: ${results[i].duration}</p><div><hr>
    `;
            resultsContainer.appendChild(resultElement);
        }
    }
}

initMap()







