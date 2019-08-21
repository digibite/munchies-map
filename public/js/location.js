var infoWindow;
var map;
var marker;

$(document).ready(function () {
    
    $("#sidebarCollapse").on("click", function () {
        $("#sidebar").toggleClass("active");
        $(this).toggleClass("active");
    });

    $("#loc1").on("click", function () {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (position) {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('<h4>You are here</h4>');
                infoWindow.open(map);
                map.setCenter(pos);
            });
        }
    });
});

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 34.052235, lng: -118.243683 },
        zoom: 14,
        position: google.maps.ControlPosition.TOP_CENTER,
        styles: [
            {
                elementType: 'geometry',
                stylers: [{color: '#d9e2da'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#b7e2c1'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c8cec9'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#80a087'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#adb5ad'}]
            },
            {
                featureType: 'poi',
                stylers: [{visibility: 'off'}]
            }
        ]
       
    });
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {            
            var icon = {
                url: "/assets/images/businesslogo.png",
                scaledSize: new google.maps.Size(50,50)
            };
        
            var userPos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);
            
            var markUsr = new google.maps.Marker({
                position: userPos,
                map: map,
                
            });

            $("#search-button").on("click", function () {
                var searchInput = $("#search-box").val().trim();
                searchInput = searchInput.replace(/\s+/g, "").toLowerCase();
                console.log(searchInput);
                
                $.get("/api/vendors/" + searchInput, function(data) {
                    console.log(data);
                    map.setCenter(markUsr.position);

                    for (var i = 0; i < data.length; i++) {
                        var pos = new google.maps.LatLng(parseFloat(data[i].Locations[0].latitude), parseFloat(data[i].Locations[0].longitude));
    
                        var marker = new google.maps.Marker({
                            position: pos,
                            map: map,
                            info: data[i].business_name,
                            icon: icon
                            // description: data[i].desc,
                        });
    
                        infoWindow = new google.maps.infoWindow({
                            content: data[i].business_name
                        });                       
                        
                        infoWindow.open(map, marker);
                    }
                });
            });

            $.get("/api/vendors/" , function(data) {
                console.log(data);
                map.setCenter(markUsr.position);

                for (var i = 0; i < data.length; i++) {
                    var pos = new google.maps.LatLng(parseFloat(data[i].Locations[0].latitude), parseFloat(data[i].Locations[0].longitude));

                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        info: data[i].business_name,
                        icon: icon
                        // description: data[i].desc,
                    });

                    infoWindow = new google.maps.infoWindow({
                        content: data[i].business_name
                    });
                    
                    google.maps.event.addListener(marker, 'click', function () {
                        infoWindow.setContent(this.info);
                        infoWindow.open(map, this);
                    });
                }
            });
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }   
}

