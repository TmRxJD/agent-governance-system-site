<script lang="ts">
	import MermaidDiagram from "$lib/diagrams/MermaidDiagram.svelte";

	const def = `flowchart LR
  agent[Agent] --> staging[Staging]
  staging --> semantic[Semantic]
  semantic --> pointer[Pointer]
  pointer --> sentinel[Sentinel]
  sentinel --> cap[CAP]
  cap --> version[Versioning]
  version --> deploy[Deployment]`;
</script>

<h1>Architecture</h1>
<p>Governance flows Schema → Pointer → Staging → Semantic → Coordination → Confidence → CAP.</p>
<div class="not-prose my-6">
	<MermaidDiagram definition={def} />
</div>
<p>Private engines implement the muscle; this site visualizes the pipeline.</p>
