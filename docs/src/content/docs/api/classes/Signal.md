---
editUrl: false
next: false
prev: false
title: "Signal"
---

## Extends

- `Signal`\<`THandler`\>

## Type parameters

• **THandler** *extends* (...`args`) => `any`

## Constructors

### new Signal()

> **new Signal**\<`THandler`\>(): [`Signal`](/api/classes/signal/)\<`THandler`\>

#### Returns

[`Signal`](/api/classes/signal/)\<`THandler`\>

#### Inherited from

`TsSignal<THandler>.constructor`

## Methods

### connectNTimes()

> **connectNTimes**(`callback`, `times`, `order`?): `SignalConnection`

#### Parameters

• **callback**: `THandler`

• **times**: `number`

• **order?**: `number`

#### Returns

`SignalConnection`

#### Source

[src/signals/Signal.ts:27](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/signals/Signal.ts#L27)

***

### connectOnce()

> **connectOnce**(`callback`, `order`?): `SignalConnection`

#### Parameters

• **callback**: `THandler`

• **order?**: `number`

#### Returns

`SignalConnection`

#### Source

[src/signals/Signal.ts:14](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/signals/Signal.ts#L14)
