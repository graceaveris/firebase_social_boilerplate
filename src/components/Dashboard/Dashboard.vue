<template>
  <div>
  <section id="dashboard">

    <div class="col1">
        <div>
            <!-- Wil be prompted to return to game if **isPlaying** -->
            <div v-if="userProfile.status === 'playing'">
                You are in an exchange. <a>return to exchange</a>
            </div>

            <!-- if not currently in game -->
            <div v-else>
            <!-- IF *PENDING** CHECKS IF USER HAS BEEN SENT A REQUEST AND RENDERS -->
                <div v-if="exchangeRequests">
                    <ExchangeRequest :exchangeRequest="this.exchangeRequests"/>
                </div>
                <!-- CAN REQUEST EXCHANGE IF **NOT BUSY** -->
                <div v-else>
                    <RequestExchange :friends="this.friends" />
                </div>
            </div>

        </div>
    </div>

    <div class="col2 has-p-1">
        <UserProfile :userProfile="this.userProfile" :currentUser="this.currentUser"/>
        <FriendsList :friends="this.friends" />
        <AddFriend :userProfile="this.userProfile" :currentUser="this.currentUser" :friendRequests="this.friendRequests" />
        <FriendRequests :friendRequests="this.friendRequests"/>
    </div>

  </section>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import UserProfile from '@/components/Dashboard/UserProfile/UserProfile'
import AddFriend from '@/components/Dashboard/AddFriend/AddFriend'
import FriendsList from '@/components/Dashboard/FriendsList/FriendsList'
import FriendRequests from '@/components/Dashboard/FriendRequests/FriendRequests'
import RequestExchange from '@/components/Dashboard/RequestExchange/RequestExchange'
import ExchangeRequest from '@/components/Dashboard/ExchangeRequest/ExchangeRequest'
export default {
    components: { AddFriend, FriendRequests, FriendsList, UserProfile, RequestExchange, ExchangeRequest },
    computed: {
        ...mapState(['userProfile', 'currentUser', 'friendRequests', 'friends', 'exchangeRequests']),
        isBusy() {
            if (this.userProfile.isBusy) {
                return true
            } else {
                return false
            }
        }
    },
}
</script>