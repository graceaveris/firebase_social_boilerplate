  
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
         //save id to the user object
        fb.db.ref(`/users/${this.currentUser.uid}/friends/${this.request.senderUID}`).set( true )
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