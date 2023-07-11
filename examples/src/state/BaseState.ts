import Application from "@/Application.ts";
import {GREEN} from "@/utils/Constants";
import {gsap} from "gsap";
import {AssetMapData, AssetType, State, TextureAsset} from "html-living-framework";
import {Point, Sprite, Text} from "pixi.js";

export class BaseState extends State {
	protected _bg: Sprite;
	protected _mainTitle: Text;
	protected _title: Text;
	protected _footerTitle: Text;

	public constructor() {
		super();
	}

	public static get Assets(): AssetMapData[] {
		return [new TextureAsset("black2x2", AssetType.PNG)]
	}

	public get app(): Application {
		return Application.instance;
	}

	public init(pSize: Point) {
		super.init(pSize);

		// add the bg first, so it's always at the bottom
		this._bg = this.add.coloredSprite(GREEN);
		this._bg.eventMode = "static"

		// add the layout
		this.createLayout()
		this.layout.alpha = 0;

		const header = this.getLayoutById("header")
		const main = this.getLayoutById("main")
		const footer = this.getLayoutById("footer")

		header.setStyles({
			fontFamily: "arboria",
			height: 80,
			paddingLeft: 25,
			paddingTop: 8,
			fontSize: 54,
			color: "white",
			background: "rgba(0,0,0,0.05)"
		});

		footer.setStyles({
			fontFamily: "arboria",
			paddingRight: 20,
			paddingBottom: 10,
			fontSize: 14,
			color: "white",
		});

		main.setStyles({
			fontFamily: "arboria",
			paddingRight: 10,
			paddingBottom: 10,
			fontSize: 18,
			color: "white",
			opacity: 0.2,
			textAlign: "center",
			verticalAlign: "middle",
			align: "center",
		});

		this._title = this.make.text("", {fontFamily: "arboria", fill: 0xffffff});
		this._title.alpha = 0;

		this._mainTitle = this.make.text("", {
			fontFamily: "arboria",
			fill: 0xffffff,
			fontSize: 14,
			align: "center",
		});
		this._mainTitle.alpha = 0;

		this._footerTitle = this.make.text(`Ⓒ ${new Date().getFullYear()} Relish Digital`, {
			fontFamily: "arboria",
			fill: 0xffffff,
			fontSize: 14
		});
		this._footerTitle.alpha = 0;

		header.addContent(this._title);
		main.addContent(this._mainTitle);
		footer.addContent(this._footerTitle);
	}

	public async animateIn(pOnComplete: () => void): Promise<void> {
		const timeline = gsap.timeline();
		await timeline.to(this.layout, {
			alpha: 1,
			duration: 0.5
		}).fromTo(this.getLayoutById("header"), {y: -200}, {
			y: 0,
			duration: 0.4, ease: "sine.out"
		}).fromTo([this._title, this._mainTitle, this._footerTitle], {alpha: 0}, {
			duration: 0.4,
			alpha: 1,
			stagger: 0.1
		})

		pOnComplete();
	}

	public async animateOut(pOnComplete: () => void): Promise<void> {
		const timeline = gsap.timeline();
		await timeline.to(this, {
			duration: 0.5,
			alpha: 0,
		});
		pOnComplete();
	}

	public onResize(pSize: Point) {
		super.onResize(pSize);
		if (this._bg) {
			this._bg.width = this._size.x;
			this._bg.height = this._size.y;
		}
	}

	public destroy() {
		super.destroy()
	}

	protected setHeaderText(pText: string) {
		this._title.text = pText;
	}

	protected setMainText(pText: string) {
		this._mainTitle.text = pText;
	}
}
