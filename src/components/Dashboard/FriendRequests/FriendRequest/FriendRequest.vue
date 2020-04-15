  
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
        //this will be saved to both the current user object AND the friend object
        //to friends object
        fb.db.ref(`/friends/${this.currentUser.uid}/${this.request.senderUID}`).set({ name: this.request.senderName, testfield: 'testfield'  })
        .then( //save id to the user object
        fb.db.ref(`/users/${this.currentUser.uid}/friends/${this.request.senderUID}`).set( true ))
       
       .then(//this will be saved to both the senders user AND the friend object
        //to friends object
        fb.db.ref(`/friends/${this.request.senderUID}/${this.currentUser.uid}`).set({ name: this.request.recieverName, testfield: 'testfield' }) )
        .then(   //save id to the user object
        fb.db.ref(`/users/${this.request.senderUID}/friends/${this.currentUser.uid}`).set( true )
        )

        //then we delete the request
        .then(
        fb.db.ref(`/requests/${this.request.requestUID}`).remove()
        )

        //if something doesnt work we catch the error
        .catch(err => {
          console.log('fail:', err)
        })

    
     }  
  }
}
</script>