  
<template>
<div>
    <p>
       {{friend.name}}
      <span v-if="friend.isOnline" >🟢</span>
    </p>
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