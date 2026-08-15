<script lang="ts">
	import {
		AccessDemo,
		ArtifactDemo,
		CanonicalDemo,
		DataArraysDemo,
		DependencyDemo,
		DeploymentDemo,
		EfficiencyDemo,
		HealthDemo,
		IdentityDemo,
		ImpactDemo,
		IntegrityDemo,
		ObservabilityDemo,
		OptimizationDemo,
		PointerDemo,
		PolicyDemo,
		PromotionDemo,
		ReflexDemo,
		RegistryDemo,
		ReleaseDemo,
		RollbackDemo,
		SecurityDemo,
		SemanticDemo,
		StagingDemo,
		VersioningDemo
	} from '$lib/demos';
	import GlassPanel from '$lib/ui/GlassPanel.svelte';

	type Props = { slug: string };
	let { slug }: Props = $props();
</script>

<GlassPanel class="overflow-hidden" padding="p-4 sm:p-5">
	{#if slug === 'staging'}
		<StagingDemo />
	{:else if slug === 'semantic-graph'}
		<SemanticDemo />
	{:else if slug === 'pointer-map'}
		<PointerDemo />
	{:else if slug === 'reflex-arcs'}
		<ReflexDemo />
	{:else if slug === 'versioning'}
		<VersioningDemo />
	{:else if slug === 'deployment'}
		<DeploymentDemo />
	{:else if slug === 'canonicalization'}
		<CanonicalDemo />
	{:else if slug === 'data-arrays'}
		<DataArraysDemo />
	{:else if slug === 'dependency'}
		<DependencyDemo />
	{:else if slug === 'policy'}
		<PolicyDemo />
	{:else if slug === 'release'}
		<ReleaseDemo />
	{:else if slug === 'promotion'}
		<PromotionDemo />
	{:else if slug === 'health'}
		<HealthDemo />
	{:else if slug === 'observability'}
		<ObservabilityDemo />
	{:else if slug === 'rollback'}
		<RollbackDemo />
	{:else if slug === 'efficiency'}
		<EfficiencyDemo />
	{:else if slug === 'impact'}
		<ImpactDemo />
	{:else if slug === 'optimization'}
		<OptimizationDemo />
	{:else if slug === 'artifact'}
		<ArtifactDemo />
	{:else if slug === 'registry'}
		<RegistryDemo />
	{:else if slug === 'integrity'}
		<IntegrityDemo />
	{:else if slug === 'identity'}
		<IdentityDemo />
	{:else if slug === 'access'}
		<AccessDemo />
	{:else if slug === 'security'}
		<SecurityDemo />
	{:else}
		<p class="text-sm text-slate-400">No interactive demo for this engine yet.</p>
	{/if}
</GlassPanel>
