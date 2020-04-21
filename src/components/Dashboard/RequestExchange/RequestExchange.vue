  
<template>
<div class="has-p-1">


    <!-- RENDER IF THE USER IS NOT BUSY -->
       <div v-if="userProfile.status === 'free'">
            <h4>Set up exchange</h4>
            <p>Select intercambio partner</p>

            <div v-for="friend in friends" :key="friend.uid">
                <div v-if="friend.isOnline">
                    <p>{{ friend.name }}</p>
                    <button @click="sendRequest(friend)">Send request</button>
                </div>
            </div>
        </div>
    <!-- RENDER WHEN TEH USER HAS REQUESTED AN EXCHANGE -->
        <div v-if="userProfile.status === 'pending'">
            Waiting for {{partnerName}} to accept...
            <button @click="cancelRequest()">Cancel</button>
        </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../../../firebaseConfig.js')
export default {
    name: 'RequestExchange',
    data() {
        return {
            partnerName: null,
            partnerUID: null,
            requestUID: null,
            exchange: null,
        }
    },
    props: {
        friends: null,
    },
    updated() {
        if (this.exchange.status === 'active') {
        this.$router.push('/exchange')
        }
    },
    computed: {
        ...mapState(['userProfile', 'currentUser', 'friends', 'exchangeRequests']),
    },
    methods: {
        sendRequest(friend) {
            //set data required in the request for each user
            //in future here we will add all the details for the 
            let user1 = {}
            user1.name = this.userProfile.name
            user1.uid = this.currentUser.uid
            let user2 = {}
            user2.name = friend.name
            user2.uid = friend.uid
            fb.db.ref(`/exchanges/${friend.uid}`).set({ user1, user2, status: 'pending' }).then(

            //set the exchange in the data and listen for changes. If it changes, we update our data object with the latest version of the exchange! When it becomes active the router will send us to the exchange view.
            fb.db.ref(`/exchanges/${friend.uid}`).on('value', snap => this.exchange = snap.val()))

            //then we set both users to busy until the exchange is accepted or cancelled.
            .then(fb.db.ref(`/users/${this.currentUser.uid}`).update({ status: 'pending' }))
            .then(fb.db.ref(`/users/${friend.uid}`).update({ status: 'pending' }))

            //then we set a few data variables for future and render use.
            this.status = 'pending'
            this.partnerName = friend.name
            this.partnerUID = friend.uid
        },

        cancelRequest() {
            //we update the users so they are no longer busy, and available for other exchanges.
            fb.db.ref(`/users/${this.currentUser.uid}`).update({ status: 'free' })
            .then(
            fb.db.ref(`/users/${this.partnerUID}`).update({ status: 'free' })
            )
            .then(
            fb.db.ref(`/exchanges/${this.partnerUID}`).remove()
            )
            
            //then we clear our data!
            this.status = null
            this.partnerName = null
            this.partnerUID = null
            this.exchange = null
        }
    }
}
</script>