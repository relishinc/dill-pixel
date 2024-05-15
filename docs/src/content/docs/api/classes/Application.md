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

[src/core/Application.ts:150](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L150)

## Accessors

### add

> `get` **add**(): [`Add`](/api/classes/add/)

#### Returns

[`Add`](/api/classes/add/)

#### Source

[src/core/Application.ts:245](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L245)

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

[src/core/Application.ts:253](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L253)

***

### audio

> `get` **audio**(): [`IAudioManager`](/api/interfaces/iaudiomanager/)

#### Returns

[`IAudioManager`](/api/interfaces/iaudiomanager/)

#### Source

[src/core/Application.ts:280](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L280)

***

### copy

> `get` **copy**(): [`CopyManager`](/api/classes/copymanager/)

#### Returns

[`CopyManager`](/api/classes/copymanager/)

#### Source

[src/core/Application.ts:304](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L304)

***

### defaultState

> `get` **defaultState**(): `undefined` \| `string` \| *typeof* [`State`](/api/classes/state/)

#### Returns

`undefined` \| `string` \| *typeof* [`State`](/api/classes/state/)

#### Source

[src/core/Application.ts:324](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L324)

***

### hitAreaRenderer

> `get` **hitAreaRenderer**(): [`HitAreaRenderer`](/api/classes/hitarearenderer/)

#### Returns

[`HitAreaRenderer`](/api/classes/hitarearenderer/)

#### Source

[src/core/Application.ts:296](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L296)

***

### htmlTextStyles

> `get` **htmlTextStyles**(): *typeof* [`HTMLTextStyleManager`](/api/classes/htmltextstylemanager/)

#### Returns

*typeof* [`HTMLTextStyleManager`](/api/classes/htmltextstylemanager/)

#### Source

[src/core/Application.ts:332](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L332)

***

### keyboard

> `get` **keyboard**(): [`KeyboardManager`](/api/classes/keyboardmanager/)

#### Returns

[`KeyboardManager`](/api/classes/keyboardmanager/)

#### Source

[src/core/Application.ts:272](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L272)

***

### load

> `get` **load**(): [`LoadManager`](/api/classes/loadmanager/)

#### Returns

[`LoadManager`](/api/classes/loadmanager/)

#### Source

[src/core/Application.ts:320](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L320)

***

### make

> `get` **make**(): *typeof* [`Make`](/api/classes/make/)

#### Returns

*typeof* [`Make`](/api/classes/make/)

#### Source

[src/core/Application.ts:249](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L249)

***

### orientationManager

> `get` **orientationManager**(): [`OrientationManager`](/api/classes/orientationmanager/)

#### Returns

[`OrientationManager`](/api/classes/orientationmanager/)

#### Source

[src/core/Application.ts:316](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L316)

***

### physics

> `get` **physics**(): [`PhysicsBase`](/api/classes/physicsbase/)

#### Returns

[`PhysicsBase`](/api/classes/physicsbase/)

#### Source

[src/core/Application.ts:328](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L328)

***

### popups

> `get` **popups**(): [`PopupManager`](/api/classes/popupmanager/)\<`T`\>

#### Returns

[`PopupManager`](/api/classes/popupmanager/)\<`T`\>

#### Source

[src/core/Application.ts:276](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L276)

***

### requiredAssets

> `get` **requiredAssets**(): [`AssetMapData`](/api/classes/assetmapdata/)[]

Override to specify assets that should persist between state loads.

Note: Splash screen assets are loaded before requiredAssets

#### Returns

[`AssetMapData`](/api/classes/assetmapdata/)[]

#### Source

[src/core/Application.ts:263](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L263)

***

### resizeOptions

> `set` **resizeOptions**(`value`): `void`

#### Parameters

• **value**: `Partial`\<`ResizeManagerOptions`\>

#### Source

[src/core/Application.ts:235](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L235)

***

### resizer

> `get` **resizer**(): `IResizeManager`

#### Returns

`IResizeManager`

#### Source

[src/core/Application.ts:300](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L300)

***

### resolutionSuffix

> `get` **resolutionSuffix**(): `string`

#### Returns

`string`

#### Source

[src/core/Application.ts:241](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L241)

***

### saveManager

> `get` **saveManager**(): [`SaveManager`](/api/classes/savemanager/)

#### Returns

[`SaveManager`](/api/classes/savemanager/)

#### Source

[src/core/Application.ts:312](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L312)

***

### screenSize

> `get` **screenSize**(): `Point`

#### Returns

`Point`

#### Source

[src/core/Application.ts:292](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L292)

***

### size

> `get` **size**(): `Point`

#### Returns

`Point`

#### Source

[src/core/Application.ts:288](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L288)

***

### state

> `get` **state**(): [`StateManager`](/api/classes/statemanager/)\<`T`\>

#### Returns

[`StateManager`](/api/classes/statemanager/)\<`T`\>

#### Source

[src/core/Application.ts:268](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L268)

***

### voiceover

> `get` **voiceover**(): [`IVoiceOverManager`](/api/interfaces/ivoiceovermanager/)

#### Returns

[`IVoiceOverManager`](/api/interfaces/ivoiceovermanager/)

#### Source

[src/core/Application.ts:284](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L284)

***

### webEvents

> `get` **webEvents**(): [`WebEventsManager`](/api/classes/webeventsmanager/)

#### Returns

[`WebEventsManager`](/api/classes/webeventsmanager/)

#### Source

[src/core/Application.ts:308](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L308)

***

### containerElement

> `get` `static` **containerElement**(): `undefined` \| `HTMLElement`

#### Returns

`undefined` \| `HTMLElement`

#### Source

[src/core/Application.ts:216](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L216)

***

### containerID

> `get` `static` **containerID**(): `string`

#### Returns

`string`

#### Source

[src/core/Application.ts:220](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L220)

***

### instance

> `get` `static` **instance**(): [`Application`](/api/classes/application/)\<`any`\>

gets the current singleton instance

#### Returns

[`Application`](/api/classes/application/)\<`any`\>

#### Source

[src/core/Application.ts:227](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L227)

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

[src/core/Application.ts:368](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L368)

***

### addPhysics()

> **addPhysics**(`type`): `Promise`\<[`PhysicsBase`](/api/classes/physicsbase/)\>

#### Parameters

• **type**: [`PhysicsEngineType`](/api/enumerations/physicsenginetype/)= `PhysicsEngineType.MATTER`

#### Returns

`Promise`\<[`PhysicsBase`](/api/classes/physicsbase/)\>

#### Source

[src/core/Application.ts:347](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L347)

***

### addStats()

> **addStats**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/core/Application.ts:336](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L336)

***

### hasAsset()

> **hasAsset**(`pAssetName`): `boolean`

#### Parameters

• **pAssetName**: `string`

#### Returns

`boolean`

#### Source

[src/core/Application.ts:383](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L383)

***

### init()

> **init**(): `Promise`\<`void`\>

Initializes all managers and starts the splash screen process.

#### Returns

`Promise`\<`void`\>

#### Source

[src/core/Application.ts:401](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L401)

***

### initialize()

> **initialize**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/core/Application.ts:387](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L387)

***

### listFonts()

> **listFonts**(): `FontFace`[]

#### Returns

`FontFace`[]

#### Source

[src/core/Application.ts:452](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L452)

***

### loadDocumentFonts()

> **loadDocumentFonts**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/core/Application.ts:444](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L444)

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

[src/core/Application.ts:478](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L478)

***

### createContainer()

> `static` **createContainer**(`pId`): `HTMLDivElement`

Creates a container element with the given id and appends it to the DOM.

#### Parameters

• **pId**: `string`

#### Returns

`HTMLDivElement`

#### Source

[src/core/Application.ts:126](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L126)

***

### getInstance()

> `static` **getInstance**\<`T`\>(): `T`

Creates a new instance of the Application class and returns it.

#### Type parameters

• **T** *extends* [`Application`](/api/classes/application/)\<`any`\> = [`Application`](/api/classes/application/)\<`any`\>

#### Returns

`T`

#### Source

[src/core/Application.ts:136](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/core/Application.ts#L136)
