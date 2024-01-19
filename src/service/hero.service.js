import {getRequest, postRequest, putRequest} from "@/service/axios.service";

async function getAliases() {
    return await getRequest('/heroes/getaliases', 'GETALIAS')
}

async function createHero(body){
    return await postRequest('/heroes/create', body, 'CREATEHEROS')
}

async function updateHero(body){
    return await putRequest('/heroes/update?org_secret='+body.org_secret, body, 'UPDATEHEROS')
}

async function getHerosById(body){
    return await getRequest('/heroes/getbyid/'+body._id+'?org_secret='+body.org_secret, 'GETHEROBYID')
}

export {
    getAliases,
    createHero,
    updateHero,
    getHerosById,
}