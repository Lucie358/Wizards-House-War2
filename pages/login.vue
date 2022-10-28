<template>
    <v-card width="500" class="ma-auto mt-6">
        <v-card-title>
            Se connecter
        </v-card-title>
        <v-card-text>
        <form>
            <v-text-field v-model="auth.email" label="E-mail" required></v-text-field>
            <v-text-field v-model="auth.password" :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPwd ? 'text' : 'password'" @click:append="showPwd = !showPwd"></v-text-field>


            <v-btn class="mr-4" @click="login">
                Connexion
            </v-btn>

        </form>
        </v-card-text>
    </v-card>
</template>
  
<script lang="ts">
import Vue from 'vue'



export default Vue.extend({
    name: 'LoginPage',
    components: {

    },
    data: () => ({
        showPwd: false,
        auth: {
            password: '',
            email: '',

        },
        loading: false
    }),
    methods: {

        async login() {
            console.log('LOGIN --- :')
            await this.$fire.auth.signInWithEmailAndPassword(this.auth.email, this.auth.password)
            this.$router.push('/')
        },
        async logout() {
            this.loading = true
            await this.$store.dispatch('logout')
            this.loading = false

        }
    }
})
</script>
  