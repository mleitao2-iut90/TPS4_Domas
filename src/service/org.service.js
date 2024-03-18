import {getRequest, patchRequest, postRequest} from './axios.service'

async function getAllOrgs(){
    return await getRequest('/herocorp/orgs/get', 'GETALLORGS')
}

async function addOrg(body) {
    return await postRequest('/herocorp/orgs/create', body, 'ADDORGS')
}

async function addTeamsInOrg(body){
    //return await patchRequest('/herocorp/orgs/addteam?org-secret='+body.org_secret, body.body, 'ADDTEAMINORG')
    return await patchRequest('/herocorp/orgs/addteam', body.body, 'ADDTEAMINORG')
}

async function deleteTeamInOrg(body){
    //return await patchRequest('/herocorp/orgs/removeteam?org-secret='+body.org_secret, body.body, 'DELETETEAMINORG')
    return await patchRequest('/herocorp/orgs/removeteam', body.body, 'DELETETEAMINORG')
}

async function getOrgById(body){
    //return await getRequest('/herocorp/orgs/getbyid/'+body.body._id+'?org-secret='+body.org_secret, 'GETORGBYID')
    return await getRequest('/herocorp/orgs/getbyid/'+body.body._id, 'GETORGBYID')
}

export {
    getAllOrgs,
    addOrg,
    addTeamsInOrg,
    deleteTeamInOrg,
    getOrgById
}