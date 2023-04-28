import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export function createPerfStore(defaultValue: number = 0) {
	setContext('perfStore', writable(defaultValue));
}

export function readPerfStore() {
	return getContext<Writable<number>>('perfStore');
}
