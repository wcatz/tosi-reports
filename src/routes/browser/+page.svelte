<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { browser } from '$app/environment';

	// @ts-ignore
	let bind;
	onMount(function () {
		themeChange(false);
		// @ts-ignore
		bind.focus();
	});
	let apiKey = '';
	let result = '';
	let tokens = '';
	let key = [];
	async function getBalance() {
		'use strict';
		if (browser) {
			const encodedValue = encodeURIComponent(apiKey);
			let response = await fetch(`/api/?apiKey=${encodedValue}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json'
				}
			});
			result = await response.json();
			tokens = result.data;
			for (const [key, value] of Object.entries(tokens)) {
				//console.log(key, value);
				console.log(tokens[key]['name'], tokens[key]['balance']);
			}
		}
	}
</script>

<div class="container-fluid mx-6">
	<div class="navbar bg-base-100">
		<div class="flex-1">
			<a class="ml-5 normal-case text-xl" href="/">☔ Balance</a>
		</div>
		<div class="flex-end">
			<label class="pop-on-hover swap-rotate swap">
				<input
					class="hidden"
					type="checkbox"
					data-toggle-theme="business,lofi"
					data-act-class="ACTIVECLASS"
				/>
				<svg
					class="swap-on m-3 h-10 w-10 fill-current text-yellow-500"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<path
						d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
					/>
				</svg>
				<svg
					class="swap-off m-3 h-10 w-10 fill-current text-gray-400"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<path
						d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
					/>
				</svg>
			</label>
		</div>
	</div>
	<div class="flex justify-center mx-5">
		<form on:submit|preventDefault={getBalance} class="w-full max-w-lg">
			<label class="flex justify-center my-3" for="token">Enter Treasury Read Key</label>
			<input
				type="text"
				placeholder="Treasury API Token"
				bind:this={bind}
				bind:value={apiKey}
				class="input input-bordered w-full max-w-lg"
			/>
		</form>
	</div>
</div>
<div class="flex justify-center m-5">
	<ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each Object.entries(tokens) as [key]}
		<li
		class="col-span-1 flex flex-col rounded-lg bg-base-200 text-center"
	>
		<div class="flex flex-1 flex-col p-4">
			<h3 class="mb-1 font-medium">{tokens[key]['name']}</h3>
			<img
				class="mx-auto h-32 w-32"
				src={tokens[key]['logo']}
				alt=""
			/>
			
			<dl class="mt-1 flex flex-grow flex-col justify-between">
				<span>Ticker<dt class="">{tokens[key]['ticker']}</dt> </span>
				<dd class="text-sm text-primary">{tokens[key]['decimals']}</dd>
				<dt class="">Balance</dt>
				<dd class="mt-3">
					<span class="rounded-full bg-nuetral px-2 py-1 font-medium">{tokens[key]['balance']}</span>
				</dd>
			</dl>
		</div>
		<div class="-mt-px flex divide-x divide-gray-200">
			<div class="flex w-0 flex-1">
			  <a href="mailto:janecooper@example.com" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
				<!-- Heroicon name: mini/envelope -->
				<svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				  <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
				  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
				</svg>
				<span class="ml-3">Email</span>
			  </a>
			</div>
			<div class="-ml-px flex w-0 flex-1">
			  <a href="tel:+1-202-555-0170" class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
				<!-- Heroicon name: mini/phone -->
				<svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				  <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clip-rule="evenodd" />
				</svg>
				<span class="ml-3">Call</span>
			  </a>
			</div>
		  </div>
		<div>
			<div class="-mt-px flex divide-x divide-gray-200">
				<div class="flex w-0 flex-1">
					<span class="ml-3">Email</span>
	
				</div>
				<div class="-ml-px flex w-0 flex-1">
				  <a href="tel:+1-202-555-0170" class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
					<!-- Heroicon name: mini/phone -->
					<svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					  <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clip-rule="evenodd" />
					</svg>
					<span class="ml-3">Call</span>
				  </a>
				</div>
			  </div>
			<div>
		<div class="-mt-px flex divide-x divide-gray-200">
			<div class="flex w-0 flex-1">
			  <a href="mailto:janecooper@example.com" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
				<!-- Heroicon name: mini/envelope -->
				<svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				  <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
				  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
				</svg>
				<span class="ml-3">Email</span>
			  </a>
			</div>
			<div class="-ml-px flex w-0 flex-1">
			  <a href="tel:+1-202-555-0170" class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
				<!-- Heroicon name: mini/phone -->
				<svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				  <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clip-rule="evenodd" />
				</svg>
				<span class="ml-3">Call</span>
			  </a>
			</div>
		  </div>
		<div>

		</div>
	</li>
		{/each}
	</ul>
</div>

<style>
	input {
		-webkit-text-security: disc;
		-mox-text-security: disc;
	}
</style>
