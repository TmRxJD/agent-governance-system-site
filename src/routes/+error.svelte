<script lang="ts">
	let { message = 'Page not found' } = $props();
</script>

<section class="mx-auto max-w-lg py-20 text-center">
	<p class="text-sm tracking-wide text-fuchsia-300 uppercase">404</p>
	<h1 class="mt-2 text-3xl font-semibold">{message}</h1>
	<p class="mt-3 text-slate-400">That route is not part of the AGS showcase.</p>
</section>
