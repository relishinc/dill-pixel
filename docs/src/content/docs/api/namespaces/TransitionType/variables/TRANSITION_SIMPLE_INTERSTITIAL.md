---
editUrl: false
next: false
prev: false
title: "TRANSITION_SIMPLE_INTERSTITIAL"
---

> `const` **TRANSITION\_SIMPLE\_INTERSTITIAL**: [`TransitionStep`](/api/enumerations/transitionstep/)[]

A simple interstitial transition.

## Description

Steps:
1. ShowLoadScreen
2. RemoveCurrent
3. UnloadAssets
4. LoadAssets
5. AttachNewInFront
6. HideLoadScreen
7. AnimNewIn
8. UnloadUnusedAssets

## Source

[src/state/TransitionType.ts:31](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionType.ts#L31)
