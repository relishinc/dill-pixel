---
editUrl: false
next: false
prev: false
title: "TRANSITION_ANIM_SIMULTANEOUSLY_NEW_IN_FRONT"
---

> `const` **TRANSITION\_ANIM\_SIMULTANEOUSLY\_NEW\_IN\_FRONT**: [`TransitionStep`](/api/enumerations/transitionstep/)[]

Animates in the new state and animates out the old state with the new state being in front of the old one.

## Description

Steps:
1. LoadAssets
2. AttachNewInFront
3. AnimSimultaneously
4. RemoveCurrent
5. UnloadAssets
6. UnloadUnusedAssets

## Source

[src/state/TransitionType.ts:163](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/TransitionType.ts#L163)
