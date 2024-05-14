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

[src/utils/Delay.ts:24](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/Delay.ts#L24)
