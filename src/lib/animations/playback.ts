import { writable, derived, get } from 'svelte/store';

export type PlaybackState = {
	playing: boolean;
	frame: number;
	totalFrames: number;
	label: string;
};

export function createPlayback(labels: string[], fps = 2) {
	const totalFrames = Math.max(1, labels.length);
	const state = writable<PlaybackState>({
		playing: false,
		frame: 0,
		totalFrames,
		label: labels[0] ?? 'Idle'
	});

	let timer: ReturnType<typeof setInterval> | null = null;

	function clear() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	}

	function setFrame(frame: number) {
		const next = ((frame % totalFrames) + totalFrames) % totalFrames;
		state.update((s) => ({
			...s,
			frame: next,
			label: labels[next] ?? `Frame ${next + 1}`
		}));
	}

	function play() {
		clear();
		state.update((s) => ({ ...s, playing: true }));
		timer = setInterval(() => {
			const cur = get(state);
			setFrame(cur.frame + 1);
		}, 1000 / fps);
	}

	function pause() {
		clear();
		state.update((s) => ({ ...s, playing: false }));
	}

	function toggle() {
		const cur = get(state);
		if (cur.playing) pause();
		else play();
	}

	function scrub(frame: number) {
		pause();
		setFrame(frame);
	}

	function destroy() {
		clear();
	}

	const progress = derived(state, ($s) => ($s.totalFrames <= 1 ? 1 : $s.frame / ($s.totalFrames - 1)));

	return { state, progress, play, pause, toggle, scrub, setFrame, destroy };
}

export type PlaybackController = ReturnType<typeof createPlayback>;
