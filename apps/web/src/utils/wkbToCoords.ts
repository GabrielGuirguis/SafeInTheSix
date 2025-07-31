import wkx from 'wkx';

export interface Point {
  lat: number;
  lng: number;
}

export function wkbToPoint(wkbHex: string): Point {
  const wkbBuffer = Buffer.from(wkbHex, 'hex');
  const geom = wkx.Geometry.parse(wkbBuffer);

  if (!(geom instanceof wkx.Point)) {
    throw new Error(`Expected geometry type Point but got ${geom.constructor.name}`);
  }

  return {
    lat: geom.y,
    lng: geom.x,
  };
}
