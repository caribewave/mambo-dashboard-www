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