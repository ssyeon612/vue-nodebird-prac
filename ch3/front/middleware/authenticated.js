// 로그인 했는지 검사

export default function({ store, redirect}){
    // 로그인 하지 않은 사람은 메인 화면으로 리다렉트 됨
    if(!store.state.users.me){
        redirect('/');
    }
}
