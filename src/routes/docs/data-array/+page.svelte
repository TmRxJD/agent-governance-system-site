<script lang="ts"></script>

<h1>Data Array Engine</h1>
<p>
	Declared lists and registries: ordering, dedupe, shape, and <code>gate.array</code>. Normalize is
	<strong>plan-only</strong> in v1 (<code>array_plan_normalize</code> reports layout; apply stays human/CAP).
</p>
<p>Configure via <code>.ags/data-arrays.yml</code>. Soft-scoped — hard fail only when commit paths touch declared array surfaces.</p>
<p>MCP: <code>array_get</code> · <code>array_validate</code> · <code>array_enforce</code> · <code>array_plan_normalize</code></p>
