  
<template>
<div class="has-p-1">
    <h3>Your Friends</h3>
    {{getFriends}}
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'FriendList',
    computed: {
        ...mapState(['userProfile', 'currentUser']),

        getFriends() {
            return this.userProfile.friends
        },
    },
    methods: { 
  }
}
</script>