  
<template>
<div class="has-p-1">
    <h4>Add Friend</h4>
        <form @submit.prevent>
            <label for="friendemail">Find by email</label>
            <input v-model.trim="findFriendForm.email" type="text" placeholder="yourfriend@email.com" id="friendemail" />
            <button @click="requestFriend" class="button button_sml">Search</button>
        </form>
        <transition name="fade">
            <p v-if="showMessage" v-html="this.message" class="message" :class="{success: messageType }"></p>
        </transition>

    </div>
</template>

<script>
const fb = require('../../../firebaseConfig.js')
export default {
    name: 'AddFriend',
    props: {
        userProfile: null,
        currentUser: null,
        friendRequests: null,
    },
    data() {
        return {
            findFriendForm: {
                email: '',
            },
            //vars for success/fail of form
            showMessage: false,
            messageType: false,
            message: ''
        }
    },
    methods: {
        isExistingFriend(uid) {
            let status = false
            //if the user has existing friends we loops
            if (this.userProfile.friends) {
                let friends = Object.keys(this.userProfile.friends)
                //if the user doesnt have any friends we get null
                friends.forEach( friend => {
                    console.log(friend)
                    if (friend === uid) {
                         status = true
                    }
                })
            }
            return status
        },
        
        requestFriend() {
        //get the friend email
        let email = this.findFriendForm.email
        //find the friend in the db
        let usersRef = fb.db.ref('users');
        usersRef.orderByChild('email').equalTo(email).once('value')
         .then( friend => { 
            //if the friend doesnt exist in the system
            if (friend.val() === null) {
                this.message = 'Friend not found'
            //if the user tries to add themselves
            } else if (Object.keys(friend.val())[0] === this.currentUser.uid) {
                this.message = 'You cant add yourself'
            //if target is already a friend
            } else if (this.isExistingFriend(Object.keys(friend.val())[0])) {
                this.message = 'You are already friends!'
            } else {
            // define our vars from the val() object
                let receiverUID = Object.keys(friend.val())[0]
                let receiverName = friend.val()[receiverUID].name
                let requestUID = receiverUID + '_' + this.currentUser.uid + '_request'
                fb.db.ref(`requests/${requestUID}`).set({ 
                    requestUID: receiverUID + '_' + this.currentUser.uid + '_request',
                    senderUID: this.currentUser.uid,
                    senderName: this.userProfile.name,
                    recieverUID: receiverUID,
                    recieverName: receiverName,
                    status: 0
                })
            this.messageType = true
            this.message = 'Request sent!'
          }
        }).catch( err => this.message = err)
        //show our message with success/fail
        this.showMessage = true
        this.messageType = false
        this.findFriendForm.email = ''
        setTimeout(() => {
                this.showMessage = false
            }, 2000)
     }
    
  }
}
</script>