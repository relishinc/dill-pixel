---
editUrl: false
next: false
prev: false
title: "TRANSITION_ANIM_NEW_IN_FRONT"
---

> `const` **TRANSITION\_ANIM\_NEW\_IN\_FRONT**: [`TransitionStep`](/api/enumerations/transitionstep/)[]

Animates the new state in front of the old one.

## Description

Steps:
1. LoadAssets
2. AttachNewInFront
3. AnimNewIn
4. RemoveCurrent
5. UnloadAssets
6. UnloadUnusedAssets

## Source

[src/state/TransitionType.ts:104](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/TransitionType.ts#L104)
