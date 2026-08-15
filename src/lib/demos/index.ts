/** AGS showcase demo components — simulated behavior only. */

// Wave A
export { default as StagingDemo } from './StagingDemo.svelte';
export { default as SemanticDemo } from './SemanticDemo.svelte';
export { default as PointerDemo } from './PointerDemo.svelte';
export { default as ReflexDemo } from './ReflexDemo.svelte';
export { default as VersioningDemo } from './VersioningDemo.svelte';
export { default as DeploymentDemo } from './DeploymentDemo.svelte';

// Wave B
export { default as CanonicalDemo } from './CanonicalDemo.svelte';
export { default as DataArraysDemo } from './DataArraysDemo.svelte';
export { default as DependencyDemo } from './DependencyDemo.svelte';
export { default as PolicyDemo } from './PolicyDemo.svelte';
export { default as ReleaseDemo } from './ReleaseDemo.svelte';
export { default as PromotionDemo } from './PromotionDemo.svelte';

// Wave C
export { default as HealthDemo } from './HealthDemo.svelte';
export { default as ObservabilityDemo } from './ObservabilityDemo.svelte';
export { default as RollbackDemo } from './RollbackDemo.svelte';
export { default as EfficiencyDemo } from './EfficiencyDemo.svelte';
export { default as ImpactDemo } from './ImpactDemo.svelte';
export { default as OptimizationDemo } from './OptimizationDemo.svelte';
export { default as ArtifactDemo } from './ArtifactDemo.svelte';
export { default as RegistryDemo } from './RegistryDemo.svelte';

// Wave D
export { default as IntegrityDemo } from './IntegrityDemo.svelte';
export { default as IdentityDemo } from './IdentityDemo.svelte';
export { default as AccessDemo } from './AccessDemo.svelte';
export { default as SecurityDemo } from './SecurityDemo.svelte';

export const DEMO_COMPONENTS = {
	staging: 'StagingDemo',
	'semantic-graph': 'SemanticDemo',
	'pointer-map': 'PointerDemo',
	'reflex-arcs': 'ReflexDemo',
	versioning: 'VersioningDemo',
	deployment: 'DeploymentDemo',
	canonicalization: 'CanonicalDemo',
	'data-arrays': 'DataArraysDemo',
	dependency: 'DependencyDemo',
	policy: 'PolicyDemo',
	release: 'ReleaseDemo',
	promotion: 'PromotionDemo',
	health: 'HealthDemo',
	observability: 'ObservabilityDemo',
	rollback: 'RollbackDemo',
	efficiency: 'EfficiencyDemo',
	impact: 'ImpactDemo',
	optimization: 'OptimizationDemo',
	artifact: 'ArtifactDemo',
	registry: 'RegistryDemo',
	integrity: 'IntegrityDemo',
	identity: 'IdentityDemo',
	access: 'AccessDemo',
	security: 'SecurityDemo'
} as const;

export type DemoSlug = keyof typeof DEMO_COMPONENTS;
