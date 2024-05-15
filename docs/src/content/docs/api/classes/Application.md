---
editUrl: false
next: false
prev: false
title: "Application"
---

## Extends

- `Application`

## Type parameters

• **T** *extends* [`Application`](/api/classes/application/) = `any`

## Constructors

### new Application()

> **new Application**\<`T`\>(`appConfig`?): [`Application`](/api/classes/application/)\<`T`\>

The config passed in can be a json object, or an `AppConfig` object.

#### Parameters

• **appConfig?**: `Partial`\<[`DillPixelApplicationOptions`](/api/interfaces/dillpixelapplicationoptions/)\> & `object`

#### Returns

[`Application`](/api/classes/application/)\<`T`\>

#### Overrides

`PIXIApplication.constructor`

#### See

`AppConfig` for what can be contained in the passed-in config.

#### Default

```ts
autoResize: true
```

#### Default

```ts
resolution: utils.isMobile.any === false ? 2 : (window.devicePixelRatio > 1 ? 2 : 1);
```

#### Source

[src/core/Application.ts:148](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L148)

## Accessors

### add

> `get` **add**(): [`Add`](/api/classes/add/)

#### Returns

[`Add`](/api/classes/add/)

#### Source

[src/core/Application.ts:242](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L242)

***

### addToStage

> `get` **addToStage**(): \<`U`\>(...`children`) => `U`\[`0`\]

#### Returns

`Function`

Adds one or more children to the container.

Multiple items can be added like so: `myContainer.addChild(thingOne, thingTwo, thingThree)`

##### Type parameters

• **U** *extends* `DisplayObject`[]

##### Parameters

• ...**children**: `U`

The DisplayObject(s) to add to the container

##### Returns

`U`\[`0`\]

- The first child that was added.

#### Source

[src/core/Application.ts:250](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L250)

***

### audio

> `get` **audio**(): [`IAudioManager`](/api/interfaces/iaudiomanager/)

#### Returns

[`IAudioManager`](/api/interfaces/iaudiomanager/)

#### Source

[src/core/Application.ts:277](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L277)

***

### copy

> `get` **copy**(): [`CopyManager`](/api/classes/copymanager/)

#### Returns

[`CopyManager`](/api/classes/copymanager/)

#### Source

[src/core/Application.ts:301](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L301)

***

### defaultState

> `get` **defaultState**(): `undefined` \| `string` \| *typeof* [`State`](/api/classes/state/)

#### Returns

`undefined` \| `string` \| *typeof* [`State`](/api/classes/state/)

#### Source

[src/core/Application.ts:321](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L321)

***

### hitAreaRenderer

> `get` **hitAreaRenderer**(): [`HitAreaRenderer`](/api/classes/hitarearenderer/)

#### Returns

[`HitAreaRenderer`](/api/classes/hitarearenderer/)

#### Source

[src/core/Application.ts:293](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L293)

***

### htmlTextStyles

> `get` **htmlTextStyles**(): *typeof* [`HTMLTextStyleManager`](/api/classes/htmltextstylemanager/)

#### Returns

*typeof* [`HTMLTextStyleManager`](/api/classes/htmltextstylemanager/)

#### Source

[src/core/Application.ts:329](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L329)

***

### keyboard

> `get` **keyboard**(): [`KeyboardManager`](/api/classes/keyboardmanager/)

#### Returns

[`KeyboardManager`](/api/classes/keyboardmanager/)

#### Source

[src/core/Application.ts:269](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L269)

***

### load

> `get` **load**(): [`LoadManager`](/api/classes/loadmanager/)

#### Returns

[`LoadManager`](/api/classes/loadmanager/)

#### Source

[src/core/Application.ts:317](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L317)

***

### make

> `get` **make**(): *typeof* [`Make`](/api/classes/make/)

#### Returns

*typeof* [`Make`](/api/classes/make/)

#### Source

[src/core/Application.ts:246](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L246)

***

### orientationManager

> `get` **orientationManager**(): [`OrientationManager`](/api/classes/orientationmanager/)

#### Returns

[`OrientationManager`](/api/classes/orientationmanager/)

#### Source

[src/core/Application.ts:313](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L313)

***

### physics

> `get` **physics**(): [`PhysicsBase`](/api/classes/physicsbase/)

#### Returns

[`PhysicsBase`](/api/classes/physicsbase/)

#### Source

[src/core/Application.ts:325](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L325)

***

### popups

> `get` **popups**(): [`PopupManager`](/api/classes/popupmanager/)\<`T`\>

#### Returns

[`PopupManager`](/api/classes/popupmanager/)\<`T`\>

#### Source

[src/core/Application.ts:273](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L273)

***

### requiredAssets

> `get` **requiredAssets**(): [`AssetMapData`](/api/classes/assetmapdata/)[]

Override to specify assets that should persist between state loads.

Note: Splash screen assets are loaded before requiredAssets

#### Returns

[`AssetMapData`](/api/classes/assetmapdata/)[]

#### Source

[src/core/Application.ts:260](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L260)

***

### resizeOptions

> `set` **resizeOptions**(`value`): `void`

#### Parameters

• **value**: `Partial`\<`ResizeManagerOptions`\>

#### Source

[src/core/Application.ts:232](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L232)

***

### resizer

> `get` **resizer**(): `IResizeManager`

#### Returns

`IResizeManager`

#### Source

[src/core/Application.ts:297](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L297)

***

### resolutionSuffix

> `get` **resolutionSuffix**(): `string`

#### Returns

`string`

#### Source

[src/core/Application.ts:238](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L238)

***

### saveManager

> `get` **saveManager**(): [`SaveManager`](/api/classes/savemanager/)

#### Returns

[`SaveManager`](/api/classes/savemanager/)

#### Source

[src/core/Application.ts:309](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L309)

***

### screenSize

> `get` **screenSize**(): `Point`

#### Returns

`Point`

#### Source

[src/core/Application.ts:289](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L289)

***

### size

> `get` **size**(): `Point`

#### Returns

`Point`

#### Source

[src/core/Application.ts:285](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L285)

***

### state

> `get` **state**(): [`StateManager`](/api/classes/statemanager/)\<`T`\>

#### Returns

[`StateManager`](/api/classes/statemanager/)\<`T`\>

#### Source

[src/core/Application.ts:265](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L265)

***

### voiceover

> `get` **voiceover**(): [`IVoiceOverManager`](/api/interfaces/ivoiceovermanager/)

#### Returns

[`IVoiceOverManager`](/api/interfaces/ivoiceovermanager/)

#### Source

[src/core/Application.ts:281](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L281)

***

### webEvents

> `get` **webEvents**(): [`WebEventsManager`](/api/classes/webeventsmanager/)

#### Returns

[`WebEventsManager`](/api/classes/webeventsmanager/)

#### Source

[src/core/Application.ts:305](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L305)

***

### containerElement

> `get` `static` **containerElement**(): `undefined` \| `HTMLElement`

#### Returns

`undefined` \| `HTMLElement`

#### Source

[src/core/Application.ts:213](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L213)

***

### containerID

> `get` `static` **containerID**(): `string`

#### Returns

`string`

#### Source

[src/core/Application.ts:217](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L217)

***

### instance

> `get` `static` **instance**(): [`Application`](/api/classes/application/)\<`any`\>

gets the current singleton instance

#### Returns

[`Application`](/api/classes/application/)\<`any`\>

#### Source

[src/core/Application.ts:224](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L224)

## Methods

### addAssetGroup()

> **addAssetGroup**(`groupIdOrClass`, `assets`?): `void`

proxy function for

#### Parameters

• **groupIdOrClass**: `string` \| *typeof* [`State`](/api/classes/state/) \| *typeof* [`State`](/api/classes/state/)

• **assets?**: [`AssetMapData`](/api/classes/assetmapdata/)[]

#### Returns

`void`

#### Link

#### Source

[src/core/Application.ts:365](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L365)

***

### addPhysics()

> **addPhysics**(`type`): `Promise`\<[`PhysicsBase`](/api/classes/physicsbase/)\>

#### Parameters

• **type**: [`PhysicsEngineType`](/api/enumerations/physicsenginetype/)= `PhysicsEngineType.MATTER`

#### Returns

`Promise`\<[`PhysicsBase`](/api/classes/physicsbase/)\>

#### Source

[src/core/Application.ts:344](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L344)

***

### addStats()

> **addStats**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/core/Application.ts:333](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L333)

***

### hasAsset()

> **hasAsset**(`pAssetName`): `boolean`

#### Parameters

• **pAssetName**: `string`

#### Returns

`boolean`

#### Source

[src/core/Application.ts:380](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L380)

***

### init()

> **init**(): `Promise`\<`void`\>

Initializes all managers and starts the splash screen process.

#### Returns

`Promise`\<`void`\>

#### Source

[src/core/Application.ts:398](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L398)

***

### initialize()

> **initialize**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/core/Application.ts:384](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L384)

***

### listFonts()

> **listFonts**(): `FontFace`[]

#### Returns

`FontFace`[]

#### Source

[src/core/Application.ts:439](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L439)

***

### loadDocumentFonts()

> **loadDocumentFonts**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/core/Application.ts:431](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L431)

***

### loadHTMLTextStyles()

> **loadHTMLTextStyles**(): `Promise`\<`void`\>

Preload any custom font styles to be used later on with html text
currently not sure if there's a better way to do this...

#### Returns

`Promise`\<`void`\>

#### See

 - https://github.com/pixijs/html-text/pull/30
 - for functionality

#### Async

#### Example

```ts
// in your Application.ts:
import {loadAndAddHTMLTextStyle} from 'dill-pixel';

// override loadHTMLTextStyles and do:
await loadAndAddHTMLTextStyle('style1', FONT_FAMILY_NAME_1, { fontSize: 16, lineHeight: 19, fill: 'white' }, [{url:'assets/fonts/{fontFile1}.woff2', weight: 'normal'}, {url:'assets/fonts/{fontFile2}.woff2', weight: 'bold'}]);

// then later on, from anywhere in your app, you can do:
import {getHTMLTextStyle} from 'dill-pixel';
this.add.htmlText( 'This is some text', getHTMLTextStyle('style1'), ...);
```

#### Source

[src/core/Application.ts:465](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L465)

***

### createContainer()

> `static` **createContainer**(`pId`): `HTMLDivElement`

Creates a container element with the given id and appends it to the DOM.

#### Parameters

• **pId**: `string`

#### Returns

`HTMLDivElement`

#### Source

[src/core/Application.ts:124](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L124)

***

### getInstance()

> `static` **getInstance**\<`T`\>(): `T`

Creates a new instance of the Application class and returns it.

#### Type parameters

• **T** *extends* [`Application`](/api/classes/application/)\<`any`\> = [`Application`](/api/classes/application/)\<`any`\>

#### Returns

`T`

#### Source

[src/core/Application.ts:134](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/core/Application.ts#L134)
