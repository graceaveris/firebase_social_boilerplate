<template>
  <div>
  <section id="dashboard">

    <div class="col1">
        <p>gameplay stuff goes here</p>
    </div>

    <div class="col2 has-p-1">
        <UserProfile :userProfile="this.userProfile" :currentUser="this.currentUser"/>
        <FriendsList :friends="this.friends" />
        <AddFriend :userProfile="this.userProfile" :currentUser="this.currentUser" :friendRequests="this.friendRequests" />
        <FriendRequests :friendRequests="this.friendRequests"/>
    </div>

  </section>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import UserProfile from '@/components/Dashboard/UserProfile/UserProfile'
import AddFriend from '@/components/Dashboard/AddFriend/AddFriend'
import FriendsList from '@/components/Dashboard/FriendsList/FriendsList'
import FriendRequests from '@/components/Dashboard/FriendRequests/FriendRequests'
export default {
    components: { AddFriend, FriendRequests, FriendsList, UserProfile },
    data() {
        return {
            findFriendForm: {
                email: '',
                message: '',
            }
        }
    },
    computed: {
        ...mapState(['userProfile', 'currentUser', 'friendRequests', 'friends'])
    }
}
</script>