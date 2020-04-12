  
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
        acceptFriend() {
        //get the friend email
        // let email = this.findFriendForm.email
        // //find the friend in the db
        // let usersRef = fb.db.ref('users');
        // usersRef.orderByChild('email').equalTo(email).once('value')
        //  .then( friend => { 
        //     if (friend.val() === null) {
        //         //if the friend doesnt exist in the system
        //     console.log('Friend not found')
        //     } else {
        //     // define our vars from the val() object
        //     let receiverUID = Object.keys(friend.val())[0]
        //     let receiverName = friend.val()[receiverUID].name
        //     fb.db.ref(`requests/${receiverUID}_${this.currentUser.uid}_request`).set({
        //         senderUID: this.currentUser.uid,
        //         senderName: this.userProfile.name,
        //         recieverUID: receiverUID,
        //         recieverName: receiverName,
        //         status: 0
        //     })
        //   }
        // }).catch(
        //     console.log('sorry')
        // )
     }
    
  }
}
</script>