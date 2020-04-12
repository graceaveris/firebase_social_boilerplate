  
<template>
<div class="has-p-1">
    <h3>Add Friend</h3>
        <form @submit.prevent>
            <label for="friendemail">Find by email</label>
            <input v-model.trim="findFriendForm.email" type="text" placeholder="yourfriend@email.com" id="friendemail" />
            <button @click="requestFriend" class="button">Search</button>
        </form>

    </div>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../../../firebaseConfig.js')
export default {
    name: 'AddFriend',
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
    methods: {
        requestFriend() {
        //get the friend email
        let email = this.findFriendForm.email
        //find the friend in the db
        let usersRef = fb.db.ref('users');
        usersRef.orderByChild('email').equalTo(email).once('value')
         .then( friend => { 
            if (friend.val() === null) {
                //if the friend doesnt exist in the system
            console.log('Friend not found')
            } else {
            // define our vars from the val() object
            let receiverUID = Object.keys(friend.val())[0]
            let receiverName = friend.val()[receiverUID].name
            fb.db.ref(`requests/${receiverUID}_${this.currentUser.uid}_request`).set({
                senderUID: this.currentUser.uid,
                senderName: this.userProfile.name,
                recieverUID: receiverUID,
                recieverName: receiverName,
                status: 0
            })
          }
        }).catch(
            console.log('sorry')
        )
     }
    
  }
}
</script>