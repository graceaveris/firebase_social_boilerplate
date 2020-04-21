  
<template>
<div class="has-p-1">
    <div>
        {{exchangeRequest.user1.name}} wants to start an exchange!
        <button @click="startExchange">Accept</button>
    </div>
</div>
</template>

<script>
const fb = require('../../../firebaseConfig.js')
export default {
    name: 'ExchangeRequest',
    props: {
        exchangeRequest: null,
    },
    update() {
        if (this.exchangeRequest.status === 'active') {
            this.$router.push('/exchange')
        }
    },
    methods: {
        startExchange() {
            //update the exchange to active
            fb.db.ref(`/exchanges/${this.exchangeRequest.user2.uid}`).update({ status: 'active' })
            //update both to isPlaying = true
            .then(
                fb.db.ref(`/users/${this.exchangeRequest.user1.uid}`).update({ status: 'playing' }))
            .then(
                fb.db.ref(`/users/${this.exchangeRequest.user2.uid}`).update({ status: 'playing' }))
             //push the router view
             console.log('hello')
            .then(this.$router.push('/exchange'))
        }
    }
}
</script>