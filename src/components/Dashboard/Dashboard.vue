<template>
  <div>
  <section>

    <div class="col1 has-p-1">
        <h2>Exchange Zone</h2>
        <p>gameplay stuff goes here</p>
    </div>

    <div class="col2 has-p-1">
        <div class="has-p-1">
            <h3>Your Details</h3>
            <p>name: {{userProfile.name}}</p>
            <p>email: {{userProfile.email}}</p>
            <p>email: {{currentUser.uid}}</p>
        </div>
        <div class="has-p-1">
            <div>
                <FriendsList />
            </div>
        </div>
        
        <AddFriend />
        <FriendRequests />
    </div>

  </section>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import AddFriend from '@/components/Dashboard/AddFriend/AddFriend'
import FriendsList from '@/components/Dashboard/FriendsList/FriendsList'
import FriendRequests from '@/components/Dashboard/FriendRequests/FriendRequests'
export default {
    components: { AddFriend, FriendRequests, FriendsList },
    data() {
        return {
            findFriendForm: {
                email: '',
                message: '',
            }
        }
    },
    computed: {
        ...mapState(['userProfile', 'currentUser', 'friendRequests' ])
    },
}
</script>