  
<template>
<div>
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