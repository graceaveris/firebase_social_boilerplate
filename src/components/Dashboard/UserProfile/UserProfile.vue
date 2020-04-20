  
<template>
<div class="has-p-1">
    <h4>Welcome {{userProfile.name}}</h4>
    <div>
        <p>{{userProfile.email}}</p>
    </div>
    </div>
</template>

<script>
const fb = require('../../../firebaseConfig')
export default {
    name: 'UserProfile',
    props: {
        userProfile: null,
        currentUser: null,
    },
    computed: {
        getFriends() {
            return Object.keys(this.userProfile.friends)
        }
    },
    created() {
    //   this.setPresence()
    },
  methods: {
      setPresence() {
           let friends = this.getFriends
           console.log('outside', friends)
           let user = this.currentUser.uid

            //presense check and update online status
            var connectedRef = fb.db.ref(".info/connected");
            connectedRef.on("value", function(snap) {
            if (snap.val() === true) {
           
            //here we loop through the users freinds
            console.log('inside', friends)
            friends.forEach(friend => {
                console.log(friend)
                fb.db.ref(`friends/${friend}/${user}`).update({ isOnline: 1 })
            });
            alert("connected");
            console.log(snap.val())
            } else {
            //here we loop through the users freinds friend objects and set status to online
            friends.forEach(friend => {
                console.log(friend)
                fb.db.ref(`friends/${friend}/${user}`).update({ isOnline: 0 })
            });
            alert("not connected");
            console.log(snap.val())
            }
         });
        }
      }
}
</script>


