import {getRequest, patchRequest, postRequest} from "@/service/axios.service";

async function getAllTeam(){
    return await getRequest('/herocorp/teams/get', 'GETALLTEAM')
}

async function createTeam(body){
    return await postRequest('/herocorp/teams/create', body, 'CREATETEAM')
}

async function addHeroeInTeam(body){
    return await patchRequest('/herocorp/teams/addheroes', body, 'ADDHEROEINTTEAMS')
}

async function deleteHeroesInTeam(body){
    return await patchRequest('/herocorp/teams/removeheroes', body, 'DELETEHEROSINTEAM')
}

export {
    getAllTeam,
    createTeam,
    addHeroeInTeam,
    deleteHeroesInTeam
}