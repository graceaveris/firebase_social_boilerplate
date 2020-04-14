  
<template>
<div class="has-p-1">
    <h3>Friend Requests</h3>
    <div v-for="request in getRequests" :key="request.uid">
        <FriendRequest :request="request" />
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import FriendRequest from '@/components/Dashboard/FriendRequests/FriendRequest/FriendRequest'
export default {
    name: 'FriendRequests',
    components: { FriendRequest },
    computed: {
        ...mapState(['userProfile', 'currentUser', 'friendRequests' ]),

        getRequests() {
            return JSON.parse(JSON.stringify(this.friendRequests));
        },
    },

    methods: { 
  }
}
</script>