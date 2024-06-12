#!/usr/bin/env node
import {exec} from 'node:child_process';

function create() {
	exec(`dill-pixel create`);
}

create();
