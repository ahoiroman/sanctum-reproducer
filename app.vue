<template>
    <div>
        <span>Logged In? {{$auth.loggedIn}}</span>
        <span>User: {{$auth.user}}</span>
        <form @submit.prevent="login">
            Email:
            <input v-model="form.email" type="email">
            Password:
            <input v-model="form.secret" type="password">
            <button type="submit">Login</button>
        </form>
    </div>
</template>
<script setup>
const {$auth} = useNuxtApp();
const form = ref({
    email: "",
    secret: null
});

function login() {
    $auth.login({
        body: {
            email: form.value.email,
            secret: form.value.secret
        }
    })
        .then((t) => {
            console.log(t)
        })
        .catch((e) => {
            console.log(e);
        });
}
</script>