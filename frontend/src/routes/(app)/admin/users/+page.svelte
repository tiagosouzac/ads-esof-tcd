<script lang="ts">
	import UserList from '$lib/ui/sections/user-list.svelte';
	const { data, form } = $props();
</script>

<UserList users={data.users} {form} />
