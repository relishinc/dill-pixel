/**
 * Import necessary classes and interfaces from 'pixi.js' library.
 */
 
 import { Application, DisplayObject, Container, Sprite, Graphics, Text, BitmapText, HTMLText, Texture, Point, Rectangle, TextStyle, HTMLTextStyle} from 'pixi.js';/**
 * Import necessary classes and interfaces from 'pixi.js' library.
 */

const PIXI = {
	Application,
	DisplayObject,
	Container,
	Sprite,
	Graphics,
	Text,
	BitmapText,
	HTMLText,
	Texture,
	Point,
	Rectangle,
	TextStyle,
	HTMLTextStyle
}/**
 * Export the PIXI object so it can be imported and used in other files.
 */

export { PIXI };
/**
 * Export the types of the imported classes and interfaces from 'pixi.js'.
 * This allows other files to use these types without needing to import 'pixi.js' directly.
 */
export type { Application as PIXIApplication, DisplayObject as PIXIDisplayObject, Container as PIXIContainer, Sprite as PIXISprite, Graphics as PIXIGraphics, Text as PIXIText, BitmapText as PIXIBitmapText, HTMLText as PIXIHTMLText, Texture as PIXITexture, Point as PIXIPoint, Rectangle as PIXIRectangle, TextStyle as PIXITextStyle, HTMLTextStyle as PIXIHTMLTextStyle, IApplicationOptions, IPoint, IHitArea, ITextStyle, IHTMLTextStyle, IBitmapTextStyle } from 'pixi.js';