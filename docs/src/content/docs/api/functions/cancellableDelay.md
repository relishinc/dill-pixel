---
editUrl: false
next: false
prev: false
title: "cancellableDelay"
---

> **cancellableDelay**(`delayInSeconds`): [`Promise`\<`unknown`\>, () => `void`]

delay

## Parameters

• **delayInSeconds**: `number`= `0`

## Returns

[`Promise`\<`unknown`\>, () => `void`]

## Usage

const [delay, cancel] = cancellableDelay(5);

// Assume checkCondition is some function that returns a boolean
if (checkCondition()) {
  cancel();  // Cancel the delay if the condition is met
} else {
  await delay;  // Otherwise, wait for the delay to elapse
}

// Continue with the rest of your code...

## Source

[src/utils/Delay.ts:24](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/Delay.ts#L24)
