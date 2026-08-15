<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	export type GraphNode = { id: string; label: string; group?: string };
	export type GraphLink = { source: string; target: string; kind?: string };

	type Props = {
		nodes: GraphNode[];
		links: GraphLink[];
		height?: number;
		selectedId?: string | null;
		onselect?: (id: string) => void;
	};

	let {
		nodes,
		links,
		height = 320,
		selectedId = null,
		onselect
	}: Props = $props();

	let svgEl: SVGSVGElement | undefined = $state();

	onMount(() => {
		if (!svgEl) return;
		const width = svgEl.clientWidth || 640;

		const simNodes = nodes.map((n) => ({ ...n }));
		const simLinks = links.map((l) => ({ ...l }));

		const simulation = d3
			.forceSimulation(simNodes as d3.SimulationNodeDatum[])
			.force(
				'link',
				d3
					.forceLink(simLinks as d3.SimulationLinkDatum<d3.SimulationNodeDatum>[])
					.id((d) => (d as GraphNode).id)
					.distance(90)
			)
			.force('charge', d3.forceManyBody().strength(-220))
			.force('center', d3.forceCenter(width / 2, height / 2));

		const svg = d3.select(svgEl);
		svg.selectAll('*').remove();

		const link = svg
			.append('g')
			.attr('stroke', '#64748b')
			.attr('stroke-opacity', 0.7)
			.selectAll('line')
			.data(simLinks)
			.join('line')
			.attr('stroke-width', 1.5);

		const node = svg
			.append('g')
			.selectAll('g')
			.data(simNodes)
			.join('g')
			.style('cursor', 'pointer')
			.on('click', (_event, d) => onselect?.((d as GraphNode).id));

		node
			.append('circle')
			.attr('r', 14)
			.attr('fill', (d) => {
				const g = (d as GraphNode).group;
				if (g === 'warn') return '#e879f9';
				if (g === 'ok') return '#22d3ee';
				return '#a78bfa';
			})
			.attr('stroke', (d) => ((d as GraphNode).id === selectedId ? '#fff' : 'transparent'))
			.attr('stroke-width', 2);

		node
			.append('text')
			.text((d) => (d as GraphNode).label)
			.attr('x', 18)
			.attr('y', 4)
			.attr('fill', '#e2e8f0')
			.attr('font-size', 11);

		simulation.on('tick', () => {
			link
				.attr('x1', (d) => (d.source as d3.SimulationNodeDatum).x ?? 0)
				.attr('y1', (d) => (d.source as d3.SimulationNodeDatum).y ?? 0)
				.attr('x2', (d) => (d.target as d3.SimulationNodeDatum).x ?? 0)
				.attr('y2', (d) => (d.target as d3.SimulationNodeDatum).y ?? 0);
			node.attr(
				'transform',
				(d) => `translate(${(d as d3.SimulationNodeDatum).x},${(d as d3.SimulationNodeDatum).y})`
			);
		});

		return () => {
			simulation.stop();
		};
	});
</script>

<svg
	bind:this={svgEl}
	class="w-full rounded-xl border border-white/10 bg-black/30"
	{height}
	data-ags-diagram="d3"
	role="img"
	aria-label="Interactive graph"
></svg>
