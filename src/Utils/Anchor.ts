import {Container, Sprite,Point} from 'pixi.js';
import {Application} from "../Application";
export interface IPadding{
	top?:number | (()=>number),
	left?:number | (()=>number),
	bottom?:number | (()=>number),
	right?:number| (()=>number)
}

export enum AnchorPosition{
	TOP_LEFT ="top left",
	LEFT ="left",
	BOTTOM_LEFT = "bottom left",
	TOP = "top",
	TOP_RIGHT = "top right",
	RIGHT = "right",
	BOTTOM_RIGHT = "bottom right",
	BOTTOM= "bottom",
	CENTER = "center"
}

export interface IAnchorValue{
	anchorPosition:AnchorPosition,
	padding?:IPadding
}

export class AnchorManager {
	width:number =0;
	height:number =0;
	_registry:Map<Sprite, IAnchorValue> = new Map<Sprite, IAnchorValue>;

	constructor(private container: Container) {
		this.onResize = this.onResize.bind(this);
		this.width = this.container.width;
		this.height = this.container.height;
		window.addEventListener('resize', this.onResize);
	}

	anchor(object:Sprite, anchorPosition:AnchorPosition, padding?:IPadding) {
		this._registry.set(object, {anchorPosition, padding});
		this.positionObject(object, {anchorPosition, padding});
	}

	private onResize(){
		this._registry.forEach((value, key)=>{
			this.positionObject(key, value);
		})
	}

	public setSize(size:Point):void{
		this.width = size.x;
		this.height = size.y;
	}

	positionObject(object:Sprite, value:IAnchorValue){
		const anchorPosition = value.anchorPosition;
		const padding = value?.padding || {top:0, left:0, right:0, bottom:0};
		switch(anchorPosition){
			case AnchorPosition.TOP_LEFT:
				object.anchor.set(0,0);
				object.position.set(this.container.x - this.width * 0.5 + this.renderPadding(padding?.left),this.container.y - this.height * 0.5+this.renderPadding(padding?.top));
				break;
		}
	}

	renderPadding(padding:number | (()=>number) | undefined):number{
		if (!padding){
			return 0;
		}
		if (typeof padding === "number"){
			return padding;
		}
		return padding();
	}
}
