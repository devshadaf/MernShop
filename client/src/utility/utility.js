export const unAuthorized=(code)=>{
    if(code===400 || code===401){
        localStorage.clear()
        sessionStorage.clear()
        window.location.href="/otp"
    }
}