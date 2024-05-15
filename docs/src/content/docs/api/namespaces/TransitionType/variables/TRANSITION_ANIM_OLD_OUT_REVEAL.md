---
editUrl: false
next: false
prev: false
title: "TRANSITION_ANIM_OLD_OUT_REVEAL"
---

> `const` **TRANSITION\_ANIM\_OLD\_OUT\_REVEAL**: [`TransitionStep`](/api/enumerations/transitionstep/)[]

Creates the new state behind the current one and then animates out the current state.

## Description

Steps:
1. LoadAssets
2. AttachNewBehind
3. AnimCurrentOut
4. RemoveCurrent
5. UnloadAssets
6. AnimNewIn
7. UnloadUnusedAssets

## Source

[src/state/TransitionType.ts:124](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/TransitionType.ts#L124)
