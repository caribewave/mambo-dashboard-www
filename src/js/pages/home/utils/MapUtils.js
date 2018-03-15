import mapboxgl from 'mapbox-gl';


export function contain(bigBox, smallBox) {
  if (!bigBox || !smallBox) {
    return false;
  }
  return (
    smallBox.getNorth() <= bigBox.getNorth()
    && smallBox.getEast() <= bigBox.getEast()
    && smallBox.getSouth() >= bigBox.getSouth()
    && smallBox.getWest() >= bigBox.getWest()
  );
}

export function enlarge(box, factor) {
  const n = box.getNorth();
  const e = box.getEast();
  const s = box.getSouth();
  const w = box.getWest();
  const f = (factor - 1) / 2;

  let lngSW = w - f * (e - w);
  let latSW = s - f * (n - s);
  let lngNE = e + f * (e - w);
  let latNE = n + f * (n - s);

  if (lngSW > 90) {
    lngSW = 90;
  }
  if (lngSW < -90) {
    lngSW = -90;
  }

  if (latSW > 90) {
    latSW = 90;
  }
  if (latSW < -90) {
    latSW = -90;
  }
  if (lngNE > 90) {
    lngNE = 90;
  }
  if (lngNE < -90) {
    lngNE = -90;
  }
  if (latNE > 90) {
    latNE = 90;
  }
  if (latNE < -90) {
    latNE = -90;
  }

  const sw = new mapboxgl.LngLat(lngSW, latSW);
  const ne = new mapboxgl.LngLat(lngNE, latNE);
  return new mapboxgl.LngLatBounds(sw, ne);
}


export function computeNextCoordinates (elapsedTime, speedKn, headingDeg, lat, lng)  {
  // Earth radius in meters
  const R = 6378137;
  // Translate speed into meters per second
  const speedMs = speedKn * 1.852 / 3.600;
  // Distance flown in meters at current heading since elapsedTime
  const distanceFlown = speedMs * elapsedTime / 1000;
  const headingRad = headingDeg * (Math.PI / 180);
  const dn = distanceFlown * Math.cos(headingRad);
  const de = distanceFlown * Math.sin(headingRad);
  // Coordinate offsets in radians
  const dLat = dn / R / (Math.PI / 180);
  const dLon = de / (R * Math.cos(lat * (Math.PI / 180))) / (Math.PI / 180);
  // OffsetPosition, decimal degrees
  const latO = lat + dLat;
  const lonO = lng + dLon;
  return [lonO, latO];
};