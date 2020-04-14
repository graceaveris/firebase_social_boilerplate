  
<template>
<div class="has-p-1">
    <div>
       {{request.senderName}}
       <button @click="acceptFriend">Accept</button>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../../../../firebaseConfig.js')
export default {
    name: 'FriendRequest',
    props: {
        request: null,
    },
    computed: {
        ...mapState(['userProfile', 'currentUser']),
    },

    methods: {
        acceptFriend() {
        console.log('test', this.request)
        //this will be saved to the current user/friend object
        fb.db.ref(`/users/${this.currentUser.uid}/friends/${this.request.senderUID}`).set( true )
        .then(
        //this will be saved to the senders user/friend object
        fb.db.ref(`/users/${this.request.senderUID}/friends/${this.currentUser.uid}`).set( true )
        //then we delete the request
        .then(
        fb.db.ref(`/requests/${this.request.requestUID}`).remove()
        )
        //if either doesnt work we catch the rror
        .catch(err => {
          console.log('fail:', err)
        }))
     }  
  }
}
</script>