  
<template>
    <header>
        <section>
            <div class="col1">
                <router-link to="dashboard"><h3>App Name</h3></router-link>
                <ul class="inline">
                    <li><router-link to="dashboard">Dashboard</router-link></li>
                    <li><router-link to="settings">Settings</router-link></li>
                    <li><a @click="logout">logout</a></li>
                </ul>
            </div>
        </section>
    </header>
</template>

<script>
import { currentUser } from '../firebaseConfig'
    const fb = require('../firebaseConfig.js')
    console.log("in Navigation", currentUser)
    export default {
        methods: {
            logout() {
                fb.auth.signOut().then(() => {
                    this.$store.dispatch('clearData')
                    this.$router.push('/login')
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>