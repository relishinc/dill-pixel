#!/bin/sh
turbo build --filter={./packages/plugins/*,./packages/storage-adapters/*,!./packages/examples}
