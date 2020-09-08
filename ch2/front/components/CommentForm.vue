<template>
    <v-form ref="form" v-model="valid" style="position: relative" @submit.prevent="onSubmitForm">
        <v-textareav
                v-model="content"
                filled
                auto-grow
                label="댓글 달기"
                :hide-details="hiddenDetails"
                :success="success"
                :success-message="successMessage"
                @input="onChangeTextarea"
        />
        <v-btn color="green" dark absolute top right type="submit">삐약</v-btn>
    </v-form>
</template>

<script>
    export default{
        props:{
            postId: {
                type: String,
                required: true,
            },
        },
        data(){
            return{
                valid: false,
                content: '',
                success: false,
                successMessages: '',
                hideDetails : true,
            }
        },
        computed: {
            me(){
                return this.$store.state.users.me;
            },
        },
        methods: {
            onChangeTextarea(value){
                if(value.length){
                    this.hideDetails = true;
                    this.success = false;
                    this.successMessages = '';
                }
            },
            onSubmitForm(){
                if(this.$ref.form.validate()){
                    this.$store.dispatch('posts/addComment', {
                        if: Date.now(),
                        postId: this.value,
                        content: this.content,
                        Users:{
                            nickname: this.me.nickname,
                        }
                    })
                    .then(() => {
                        this.content = '';
                        this.success = true;
                        this.successMessages = '댓글이 작성되었었습니다.';
                        this.hideDetails = false;
                   })
                    .catch(() => {

                    });
                }
            }
        },
    }
</script>

<style>

</style>