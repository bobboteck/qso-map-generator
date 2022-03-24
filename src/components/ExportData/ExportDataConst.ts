export const externalRef: string = '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin=""/>' + String.fromCharCode(10) +
    '<!-- Make sure you put this AFTER Leaflet CSS -->' + String.fromCharCode(10) +
    '<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>';

export const codeJs: string = '<script>' + String.fromCharCode(10) +
'fetch("<path of file>/data.json")' + String.fromCharCode(10) +
'.then(response => ' + String.fromCharCode(10) +
'{' + String.fromCharCode(10) +
'    return response.json();' + String.fromCharCode(10) +
'})' + String.fromCharCode(10) +
'.then(jsonData =>' + String.fromCharCode(10) +
'{' + String.fromCharCode(10) +
'    const stationIcon = L.icon(' + String.fromCharCode(10) +
'    {' + String.fromCharCode(10) +
'        iconUrl: "/assets/icon/map-station.png",' + String.fromCharCode(10) +
'        iconSize: [41,41],' + String.fromCharCode(10) +
'        iconAnchor: [20,40],' + String.fromCharCode(10) +
'        popupAnchor: [0,-30]' + String.fromCharCode(10) +
'    });' + String.fromCharCode(10) +
'' + String.fromCharCode(10) +
'    let map = L.map("mapcontainer").setView([jsonData.MapConfig.Latitude, jsonData.MapConfig.Longitude], jsonData.MapConfig.Zoom);' + String.fromCharCode(10) +
'' + String.fromCharCode(10) +
'    let Stamen_Terrain = L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}", ' + String.fromCharCode(10) +
'    {' + String.fromCharCode(10) +
'        attribution: ' + String.fromCharCode(39) + 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' + String.fromCharCode(39) + ',' + String.fromCharCode(10) +
'        subdomains: "abcd",' + String.fromCharCode(10) +
'        minZoom: 0,' + String.fromCharCode(10) +
'        maxZoom: 10,' + String.fromCharCode(10) +
'        ext: "png"' + String.fromCharCode(10) +
'    }).addTo(map);' + String.fromCharCode(10) +
'' + String.fromCharCode(10) +
'    let myPopUpDescription = jsonData.MyQTH.Location + "<br />" + jsonData.MyQTH.Locator + "<br />" + jsonData.MyQTH.Reference;' + String.fromCharCode(10) +
'    let myPosition = L.marker([jsonData.MyQTH.Latitude, jsonData.MyQTH.Longitude], {icon: stationIcon}).addTo(map);' + String.fromCharCode(10) +
'    myPosition.bindPopup(myPopUpDescription);' + String.fromCharCode(10) +
'' + String.fromCharCode(10) +
'    jsonData.QSOs.forEach(qso => ' + String.fromCharCode(10) +
'    {' + String.fromCharCode(10) +
'        let qsoDescription = "<b>" + qso.Call + "</b><br />" + qso.Locator;' + String.fromCharCode(10) +
'        L.marker([qso.Latitude, qso.Longitude]).addTo(map).bindPopup(qsoDescription);' + String.fromCharCode(10) +
'    });' + String.fromCharCode(10) +
'});' + String.fromCharCode(10) +
'</script>';

export const codeHtml: string = '<div id="mapcontainer" style="max-width: 100%;height: 450px;"></div>';