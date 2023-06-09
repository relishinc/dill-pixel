export type ObjectOrArrayXY = { x: number; y: number } | [number, number?] | number;

export function resolveXYFromObjectOrArray(position: ObjectOrArrayXY) {
	let x = 0;
	let y = 0;

	if (Array.isArray(position)) {
		x = position[0];
		y = position[1] || position[0];
	} else if (typeof position === 'object') {
		// cast as an object
		const obj = position as { x: number; y: number };
		x = obj.x || 0;
		y = obj.y || 0;
	} else if (typeof position === 'number') {
		x = position;
		y = position;
	}

	return {x, y};
}
