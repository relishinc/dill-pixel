import {FederatedEvent, Graphics, Point, Sprite} from 'pixi.js'
import {Container, Signal} from "dill-pixel";

export interface JoystickChangeEvent {
	angle: number;
	direction: Direction;
	power: number;
}

export enum Direction {
	NONE = 'none',
	LEFT = 'left',
	TOP = 'top',
	BOTTOM = 'bottom',
	RIGHT = 'right',
	TOP_LEFT = 'top_left',
	TOP_RIGHT = 'top_right',
	BOTTOM_LEFT = 'bottom_left',
	BOTTOM_RIGHT = 'bottom_right',
}

export interface JoystickSettings {
	outer?: Sprite | Graphics;
	inner?: Sprite | Graphics;
	outerScale?: number;
	innerScale?: number;
}

export class Joystick extends Container {
	onChange = new Signal<(detail: JoystickChangeEvent) => void>();
	onStart = new Signal<() => void>();
	onEnd = new Signal<() => void>();
	settings: JoystickSettings;
	
	outerRadius: number = 0;
	innerRadius: number = 0;
	
	outer!: Sprite | Graphics
	inner!: Sprite | Graphics
	
	innerAlphaStandby = 0.5;
	
	dragging: boolean = false;
	eventData: any;
	power: number;
	startPosition: Point;
	direction: Direction = Direction.NONE;
	
	constructor(opts: Partial<JoystickSettings>) {
		super();
		
		this.settings = Object.assign({
			outerScale: 1,
			innerScale: 1,
		}, opts);
		
		if (!this.settings.outer) {
			const outer = new Graphics();
			outer.circle(0, 0, 60).fill({color: 0x0})
			outer.alpha = 0.5;
			this.settings.outer = outer;
		}
		
		if (!this.settings.inner) {
			const inner = new Graphics();
			inner.circle(0, 0, 35).fill({color: 0x0})
			inner.alpha = this.innerAlphaStandby;
			this.settings.inner = inner;
		}
		
		this.initialize();
	}
	
	initialize() {
		this.outer = this.settings.outer!;
		this.inner = this.settings.inner!;
		
		this.outer.scale.set(this.settings.outerScale, this.settings.outerScale);
		this.inner.scale.set(this.settings.innerScale, this.settings.innerScale);
		
		if ('anchor' in this.outer) {
			this.outer.anchor.set(0.5);
		}
		if ('anchor' in this.inner) {
			this.inner.anchor.set(0.5);
		}
		
		this.addChild(this.outer);
		this.addChild(this.inner);
		
		// this.outerRadius = this.containerJoystick.width / 2;
		this.outerRadius = this.width / 2.5;
		this.innerRadius = this.inner.width / 2;
		
		this.bindEvents();
	}
	
	protected handleDragStart(event: FederatedEvent) {
		this.eventData = event.data;
		this.startPosition = this.eventData.getLocalPosition(this);
		
		this.dragging = true;
		this.inner.alpha = 1;
		
		this.onStart.emit();
	}
	
	protected handleDragEnd() {
		this.direction = Direction.NONE;
		if (this.dragging == false) {
			return;
		}
		this.inner.position.set(0, 0);
		
		this.dragging = false;
		this.inner.alpha = this.innerAlphaStandby;
		
		this.onEnd.emit();
	}
	
	handleDragMove(event: FederatedEvent) {
		if (this.dragging == false) {
			return;
		}
		
		this.eventData = event.data
		
		let newPosition = this.eventData.getLocalPosition(this);
		
		let sideX = newPosition.x - this.startPosition.x;
		let sideY = newPosition.y - this.startPosition.y;
		
		let centerPoint = new Point(0, 0);
		let angle = 0;
		
		if (sideX == 0 && sideY == 0) {
			return;
		}
		
		let direction = Direction.LEFT;
		
		if (sideX == 0) {
			if (sideY > 0) {
				centerPoint.set(0, (sideY > this.outerRadius) ? this.outerRadius : sideY);
				angle = 270;
				direction = Direction.BOTTOM;
			} else {
				centerPoint.set(0, -(Math.abs(sideY) > this.outerRadius ? this.outerRadius : Math.abs(sideY)));
				angle = 90;
				direction = Direction.TOP;
			}
			this.inner.position.set(centerPoint.x, centerPoint.y);
			this.power = this.getPower(centerPoint);
			this.direction = direction;
			this.onChange.emit({angle, direction, power: this.power});
			return;
		}
		
		if (sideY == 0) {
			if (sideX > 0) {
				centerPoint.set((Math.abs(sideX) > this.outerRadius ? this.outerRadius : Math.abs(sideX)), 0);
				angle = 0;
				direction = Direction.LEFT;
			} else {
				centerPoint.set(-(Math.abs(sideX) > this.outerRadius ? this.outerRadius : Math.abs(sideX)), 0);
				angle = 180;
				direction = Direction.RIGHT;
			}
			
			this.inner.position.set(centerPoint.x, centerPoint.y);
			this.power = this.getPower(centerPoint);
			this.direction = direction;
			this.onChange.emit({angle, direction, power: this.power});
			return;
		}
		
		let tanVal = Math.abs(sideY / sideX);
		let radian = Math.atan(tanVal);
		angle = radian * 180 / Math.PI;
		
		let centerX = 0;
		let centerY = 0;
		
		if (sideX * sideX + sideY * sideY >= this.outerRadius * this.outerRadius) {
			centerX = this.outerRadius * Math.cos(radian);
			centerY = this.outerRadius * Math.sin(radian);
		} else {
			centerX = Math.abs(sideX) > this.outerRadius ? this.outerRadius : Math.abs(sideX);
			centerY = Math.abs(sideY) > this.outerRadius ? this.outerRadius : Math.abs(sideY);
		}
		
		if (sideY < 0) {
			centerY = -Math.abs(centerY);
		}
		if (sideX < 0) {
			centerX = -Math.abs(centerX);
		}
		
		if (sideX > 0 && sideY < 0) {
			// < 90
		} else if (sideX < 0 && sideY < 0) {
			// 90 ~ 180
			angle = 180 - angle;
		} else if (sideX < 0 && sideY > 0) {
			// 180 ~ 270
			angle = angle + 180;
		} else if (sideX > 0 && sideY > 0) {
			// 270 ~ 369
			angle = 360 - angle;
		}
		centerPoint.set(centerX, centerY);
		this.power = this.getPower(centerPoint);
		
		direction = this.getDirection(centerPoint);
		this.direction = direction;
		this.inner.position.set(centerPoint.x, centerPoint.y);
		this.onChange.emit({angle, direction, power: this.power,});
	};
	
	protected bindEvents() {
		this.eventMode = 'static'
		this.on('pointerdown', this.handleDragStart)
		.on('pointerup', this.handleDragEnd)
		.on('pointerupoutside', this.handleDragEnd)
		.on('pointermove', this.handleDragMove)
	}
	
	protected getPower(centerPoint: Point) {
		const a = centerPoint.x;
		const b = centerPoint.y;
		return Math.min(1, Math.sqrt(a * a + b * b) / this.outerRadius);
	}
	
	protected getDirection(center: Point) {
		let rad = Math.atan2(center.y, center.x);// [-PI, PI]
		if ((rad >= -Math.PI / 8 && rad < 0) || (rad >= 0 && rad < Math.PI / 8)) {
			return Direction.RIGHT;
		} else if (rad >= Math.PI / 8 && rad < 3 * Math.PI / 8) {
			return Direction.BOTTOM_RIGHT;
		} else if (rad >= 3 * Math.PI / 8 && rad < 5 * Math.PI / 8) {
			return Direction.BOTTOM;
		} else if (rad >= 5 * Math.PI / 8 && rad < 7 * Math.PI / 8) {
			return Direction.BOTTOM_LEFT;
		} else if ((rad >= 7 * Math.PI / 8 && rad < Math.PI) || (rad >= -Math.PI && rad < -7 * Math.PI / 8)) {
			return Direction.LEFT;
		} else if (rad >= -7 * Math.PI / 8 && rad < -5 * Math.PI / 8) {
			return Direction.TOP_LEFT;
		} else if (rad >= -5 * Math.PI / 8 && rad < -3 * Math.PI / 8) {
			return Direction.TOP;
		} else {
			return Direction.TOP_RIGHT;
		}
	}
	
	
}
