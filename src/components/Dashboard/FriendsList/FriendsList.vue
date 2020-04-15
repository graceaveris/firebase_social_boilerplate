  
<template>
<div class="has-p-1">
    <h3>Your Friends</h3>
    <div v-for="friend in friends" :key="friend.name">
        <Friend :friend="friend" />
    </div>
</div>
</template>

<script>
import Friend from '@/components/Dashboard/FriendsList/Friend/Friend'
export default {
    name: 'FriendsList',
    components: { Friend },
    props: {
        friends: null,
    },
}
</script>


