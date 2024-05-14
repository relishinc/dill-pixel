---
editUrl: false
next: false
prev: false
title: "TRANSITION_ANIM_SEQUENTIAL_MID_ASSETS"
---

> `const` **TRANSITION\_ANIM\_SEQUENTIAL\_MID\_ASSETS**: [`TransitionStep`](/api/enumerations/transitionstep/)[]

Animate out old state and then animate in new state with assets loaded in between.

## Description

Steps:
1. AnimCurrentOut
2. RemoveCurrent
3. UnloadAssets
4. LoadAssets
5. AttachNewInFront
6. AnimNewIn
7. UnloadUnusedAssets

## Source

[src/state/TransitionType.ts:84](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/TransitionType.ts#L84)
