  
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
                message: '',
            }
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
                console.log('Friend not found')
            //if the user tries to add themselves
            } else if (Object.keys(friend.val())[0] === this.currentUser.uid) {
                console.log('You cant add yourself as a friend')
            //if target is already a friend
            } else if (this.isExistingFriend(Object.keys(friend.val())[0])) {
                console.log('You are already friends!')
            } else {
            // define our vars from the val() object
                console.log('Sending request...')
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
            console.log('Request sent!')
          }
        }).catch( err => console.log('catch going for some reason', err))
     }
    
  }
}
</script>