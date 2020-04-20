<template>
    <section id="settings">
        <div class="col1">
            <h3>Settings</h3>
            <p>Update your profile</p>

            <transition name="fade">
                <p v-if="showSuccess" class="success">profile updated</p>
            </transition>

            <form @submit.prevent>
                <label for="name">Name</label>
                <input v-model.trim="name" type="text" :placeholder="userProfile.name" id="name" />

                <button @click="updateProfile" class="button">Update Profile</button>
            </form>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')

export default {
    data() {
        return {
            name: '',
            showSuccess: false
        }
    },
    computed: {
        ...mapState(['userProfile', 'friends', 'currentUser'])
    },
    methods: {
        updateProfile() {

            let name = this.name
            let email = this.userProfile.email
            fb.db.ref(`/users/${this.currentUser.uid}`).update({ name, email }).then(user => {
            console.log('user:', user)
            }).catch(err => { console.log(err) })
            this.updateFriendProfiles()
            this.name = ''
            this.showSuccess = true

            setTimeout(() => {
                this.showSuccess = false
            }, 2000)
        },

        updateFriendProfiles() {
            let friendUIDS = Object.keys(this.friends)
            friendUIDS.forEach(uid => {
                fb.db.ref(`/friends/${uid}/${this.currentUser.uid}`).update({ name: this.name })
            })
        }
    }
}
</script>