<script lang="ts"></script>

<h1>Canonicalization Engine</h1>
<p>
	Singular source of truth per concept, allowed mirrors, drift detection, and <code>gate.canonical</code>.
	When a concept’s SoT is a declared array, CE may call DAE validate on that locator.
</p>
<p>Configure via <code>.ags/canonical.yml</code>. Soft-scoped — hard fail only when commit paths touch declared canonical surfaces.</p>
<p>MCP: <code>canon_get</code> · <code>canon_validate</code> · <code>canon_enforce</code> · <code>canon_drift</code> · <code>canon_plan_fix</code></p>
