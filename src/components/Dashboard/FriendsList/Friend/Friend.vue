  
<template>
<div>
    <div>
       {{friend.name}}
       {{friend.isOnline}}
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