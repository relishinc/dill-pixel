---
editUrl: false
next: false
prev: false
title: "isSupportedDevice"
---

> **isSupportedDevice**(`pToExclude`): `boolean`

Returns whether the current device is not within the supplied exclude list.

## Parameters

• **pToExclude**: `any`

The devices that are not supported.

## Returns

`boolean`

If the current device is supported.

## Example

```ts
isSupportedIOSDevice([PlatformUtils.IPHONE_4, PlatformUtils.IPHONE_3GS, PlatformUtils.IPHONE_1,
PlatformUtils.IPHONE_3G, PlatformUtils.IPAD_AIR_2]);
```

## Source

[src/utils/PlatformUtils.ts:467](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/PlatformUtils.ts#L467)
