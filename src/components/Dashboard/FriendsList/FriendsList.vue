  
<template>
<div class="has-p-1">
    <h4>Your Friends</h4>
    <div v-for="friend in friends" :key="friend.name">
        <Friend :friend="friend" class="has-pb-slight"/>
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


