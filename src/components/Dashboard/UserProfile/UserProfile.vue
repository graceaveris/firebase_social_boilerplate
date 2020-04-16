  
<template>
<div class="has-p-1">
    <h4>Welcome {{userProfile.name}}</h4>
    <div>
        <p>{{userProfile.email}}</p>
    </div>
    </div>
</template>

<script>
export default {
    name: 'UserProfile',
    props: {
        userProfile: null,
    },
}
</script>


