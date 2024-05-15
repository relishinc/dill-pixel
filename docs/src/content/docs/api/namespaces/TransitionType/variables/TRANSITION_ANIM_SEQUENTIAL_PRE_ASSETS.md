---
editUrl: false
next: false
prev: false
title: "TRANSITION_ANIM_SEQUENTIAL_PRE_ASSETS"
---

> `const` **TRANSITION\_ANIM\_SEQUENTIAL\_PRE\_ASSETS**: [`TransitionStep`](/api/enumerations/transitionstep/)[]

Animate out old state and then animate in new state with assets loaded first.

## Description

Steps:
1. LoadAssets
2. AnimCurrentOut
3. RemoveCurrent
4. UnloadAssets
5. AttachNewInFront
6. AnimNewIn
7. UnloadUnusedAssets

## Source

[src/state/TransitionType.ts:63](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/TransitionType.ts#L63)