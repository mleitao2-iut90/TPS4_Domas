import {postRequest, getRequest} from "@/service/axios.service";
async function authUser(body) {
    return await postRequest('/authapi/auth/signin', body, 'SIGNINAUTHUSER')
}

async function getAuthUser(login) {
    return await getRequest('/authapi/user/getuser/'+login, 'GETAUTHUSER')
}

export {
    authUser,
    getAuthUser
}