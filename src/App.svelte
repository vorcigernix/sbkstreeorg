<script>
  import * as Pancake from "@sveltejs/pancake";
  import * as d3 from "d3-hierarchy";
  import { tweened } from "svelte/motion";
  import * as eases from "svelte/easing";
  import { fade } from "svelte/transition";
  import Treemap from "./components/Treemap.svelte";
  import data from "./data.js";

  const treemap = d3.treemap();

  const hierarchy = d3
    .hierarchy(data)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);

  const root = treemap(hierarchy);

  let selected = root;

  const select = (node) => {
    while (node.parent && node.parent !== selected) {
      node = node.parent;
    }

    if (node && node.children) selected = node;
  };

  const breadcrumbs = (node) => {
    const crumbs = [];
    while (node) {
      crumbs.unshift(node.data.name);
      node = node.parent;
    }

    return crumbs.join("/");
  };

  const extents = tweened(undefined, {
    easing: eases.cubicOut,
    duration: 600,
  });

  const is_visible = (a, b) => {
    while (b) {
      if (a.parent === b) return true;
      b = b.parent;
    }

    return false;
  };

  $: $extents = {
    x1: selected.x0,
    x2: selected.x1,
    y1: selected.y1,
    y2: selected.y0,
  };
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #f0f0f0;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 800;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
  .breadcrumbs {
    font-size: 3em;
    color: #f0f0f0;
    font-weight: 800;
    width: 100%;
    padding: 0.3rem 0.4rem;
    background-color: transparent;
    font-family: inherit;
    font-size: inherit;
    text-align: left;
    border: none;
    cursor: pointer;
    outline: none;
  }

  .breadcrumbs:disabled {
    cursor: default;
  }

  .chart {
    width: calc(100% + 2px);
    height: 500px;
    padding: 0;
    margin: 0 -1px 36px -1px;
	overflow: hidden;
	
    background-color: hsl(0, 0%, 100%);
  }

  .node {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
	pointer-events: all;
  }

  .node:not(.leaf) {
    cursor: pointer;
  }

  .contents {
    width: 100%;
    height: 100%;
	padding: 1em;
    border: 1px solid #2F3744;
    background-color: hsl(0, 0%, 95%);
    color: rgb(29, 29, 29);
    box-sizing: border-box;
  }

  .node:not(.leaf) .contents {
    background-color: hsl(0, 0%, 95%);
  }

  strong,
  span {
    display: block;
    font-size: 12px;
    white-space: nowrap;
    line-height: 1;
  }
</style>

<main>
  <h1>Socialbakers Engineering</h1>
  <p>A treemap of responsibilities in Socialbakers Engineering</p>
</main>

<button
  class="breadcrumbs"
  disabled={!selected.parent}
  on:click={() => (selected = selected.parent)}>
  {breadcrumbs(selected)}
</button>

<div class="chart">
  <Pancake.Chart
    x1={$extents.x1}
    x2={$extents.x2}
    y1={$extents.y1}
    y2={$extents.y2}>
    <Treemap {root} let:node>
      {#if is_visible(node, selected)}
        <div
          transition:fade={{ duration: 400 }}
          class="node"
          class:leaf={!node.children}
          on:click={() => select(node)}>
          <div class="contents">
            <strong>{node.data.name}</strong>
            <span>{node.data.role}</span>
          </div>
        </div>
      {/if}
    </Treemap>
  </Pancake.Chart>
</div>
