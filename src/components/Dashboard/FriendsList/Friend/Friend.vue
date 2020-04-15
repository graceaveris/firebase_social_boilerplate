  
<template>
<div class="has-p-1">
    <div>
       {{friend.name}}
    </div>
</div>
</template>

<script>
export default {
    name: 'Friend',
    props: {
        friend: null,
    },
}
</script>