<script>
	import { page } from '$app/stores';
</script>

<h1>{$page.status}: {$page.error?.message ?? 'No error message'}</h1>
