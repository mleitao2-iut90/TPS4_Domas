import {getRequest, patchRequest, postRequest} from "@/service/axios.service";

async function getAllTeam(){
    return await getRequest('/teams/get', 'GETALLTEAM')
}

async function createTeam(body){
    return await postRequest('/teams/create', body, 'CREATETEAM')
}

async function addHeroeInTeam(body){
    return await patchRequest('/teams/addheroes', body, 'ADDHEROEINTTEAMS')
}

async function deleteHeroesInTeam(body){
    return await patchRequest('/teams/removeheroes', body, 'DELETEHEROSINTEAM')
}

export {
    getAllTeam,
    createTeam,
    addHeroeInTeam,
    deleteHeroesInTeam
}