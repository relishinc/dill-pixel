---
editUrl: false
next: false
prev: false
title: "TRANSITION_ANIM_SIMULTANEOUSLY_NEW_BEHIND"
---

> `const` **TRANSITION\_ANIM\_SIMULTANEOUSLY\_NEW\_BEHIND**: [`TransitionStep`](/api/enumerations/transitionstep/)[]

Animates in the new state and animates out the old state with the new state being behind the old one.

## Description

Steps:
1. LoadAssets
2. AttachNewBehind
3. AnimSimultaneously
4. RemoveCurrent
5. UnloadAssets
6. UnloadUnusedAssets

## Source

[src/state/TransitionType.ts:144](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/TransitionType.ts#L144)
