  
<template>
<div class="has-p-1">
    <h4>Friend Requests</h4>
    <div v-for="request in getRequests" :key="request.uid">
        <FriendRequest :request="request" />
    </div>
</div>
</template>

<script>
import FriendRequest from '@/components/Dashboard/FriendRequests/FriendRequest/FriendRequest'
export default {
    name: 'FriendRequests',
    components: { FriendRequest },
    props: {
        friendRequests: null,
    },
    computed: {
        getRequests() {
            return JSON.parse(JSON.stringify(this.friendRequests));
        },
    },
}
</script>