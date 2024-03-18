import {getRequest, postRequest, putRequest} from "@/service/axios.service";

async function getAliases() {
    return await getRequest('/herocorp/heroes/getaliases', 'GETALIAS')
}

async function createHero(body){
    return await postRequest('/herocorp/heroes/create', body, 'CREATEHEROS')
}

async function updateHero(body){
    //return await putRequest('/herocorp/heroes/update?org-secret='+body.org_secret, body, 'UPDATEHEROS')
    return await putRequest('/herocorp/heroes/update', body, 'UPDATEHEROS')
}

async function getHerosById(body){
    //return await getRequest('/herocorp/heroes/getbyid/'+body._id+'?org-secret='+body.org_secret, 'GETHEROBYID')
    return await getRequest('/herocorp/heroes/getbyid/'+body._id, 'GETHEROBYID')
}

export {
    getAliases,
    createHero,
    updateHero,
    getHerosById,
}