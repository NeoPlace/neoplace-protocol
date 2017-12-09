import {Pipe} from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe {
    // Calculate position
    // Input: {{'46.454545,2.151454:46.15615,2.4754' | distance}}
    // Output: John Doe
  transform(value) {
    if (value) {
      const positions = value.split(':');
      const me = positions[0].split(',');
      const other = positions[1].split(',');

      if(me[0] == "n/a" || me[1] == "n/a" || other[0] == "n/a" || other[1] == "n/a") {
        return "N/A";
      }

      return getDistanceFromLatLonInKm(me[0], me[1], other[0], other[1]);
    }
    return value;
  }
}


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

