<template>
    <div>
        <v-container>
            <v-card>
                <v-container>
                    <v-subheader>회원가입</v-subheader>
                    <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                        <v-text-field v-model="userId" label="이메일" required :rules="userIdRules" />
                        <v-text-field v-model="password" label="비밀번호" type="password" :rules="passwordRules" required/>
                        <v-text-field v-model="passwordCheck"  label="비밀번호확인" type="password" :rules="passwordCheckRules" required/>
                        <v-text-field v-model="nickname" label="닉네임" type="nickname" :rules="nicknameRules" required/>
                        <v-checkbox v-model="terms" required :rules="[v => !!v || '약관에 동의해야 합니다.']" label="동의합니다."/>
                        <v-btn color="green" type="submit">가입하기</v-btn>
                    </v-form>
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                valid: false,                //회원가입이 눌릴 수 있는지에 대한 데이터
                userId: '',
                password: '',
                passwordCheck: '',
                nickname: '',
                terms: false,
                userIdRules: [
                  v => !!v || '이메일이 필수입니다.',
                  v =>  /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',
                ],
                nicknameRules: [
                    v => !!v || '닉네임은 필수입니다.',
                ],
                passwordRules: [
                    v => !!v || '비밀번호는 필수입니다.',
                ],
                passwordCheckRules: [
                  v => !!v || '비밀번호 확인은 필수입니다.',
                  v => v === this.password || '비밀번호가 일치하지 않습니다.',
                ],
            };
        },
        computed: {
            me(){
                return this.$store.state.users.me;
            }
        },
        watch:{
            me(value, oldValue){                    // 회원 가입 페이지에서 로그인시 메인화면으로 넘겨주기
                if(value){
                    this.$router.push({
                        path: '/',
                    });
                }
            }
        },
        methods: {
            onSubmitForm(){
                if(this.$refs.form.validate()){
                    this.$store.dispatch('users/signUp', {
                        nickname: this.nickname,
                        userId: this.userId,
                        password: this.password,
                    })
                    .then(() => {
                        this.$router.push({
                            path: '/',
                        });
                    })
                    .catch(() => {
                        alert('회원가입 실패');
                    });
                }

            }
        },
        head() {
            return {
                title: '회원가입',
            }
        },
        middleware: 'anonymous',
    }
</script>

<style>

</style>