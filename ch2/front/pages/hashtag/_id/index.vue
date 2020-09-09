<template>
    <v-container v-if="post">
        <post-card :post="post" />
    </v-container>
    <div v-else>
        해당 아이디의 게시글이 존재하지 않습니다.
    </div>
</template>

<script>
    //post/_id.vue
    //주소 post/1    post/100 ...
    import PostCard from '~/components/PostCard';
    export default {
        components: {
            PostCard,
        },
        computed: {
            post(){
                //params가 문자열이기 때문에 형변환을 해야 한다.
                // _ 가 붙은 파일 -> params를 의미한다.
                return this.$store.state.posts.mainPosts.find(v => v.id === parseInt(this.$route.params.id, 10));
            },
        },
    };
</script>

<style>

</style>