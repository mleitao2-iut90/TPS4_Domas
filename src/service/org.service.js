import {getRequest, patchRequest, postRequest} from './axios.service'

async function getAllOrgs(){
    return await getRequest('/orgs/get', 'GETALLORGS')
}

async function addOrg(body) {
    return await postRequest('/orgs/create', body, 'ADDORGS')
}

async function addTeamsInOrg(body){
    return await patchRequest('/orgs/addteam?org-secret='+body.org_secret, body.body, 'ADDTEAMINORG')
}

async function deleteTeamInOrg(body){
    return await patchRequest('/orgs/removeteam?org-secret='+body.org_secret, body.body, 'DELETETEAMINORG')
}

async function getOrgById(body){
    return await getRequest('/orgs/getbyid/'+body.body._id+'?org-secret='+body.org_secret, 'GETORGBYID')
    //return await getRequest('/orgs/getbyid/'+body.body._id, 'GETORGBYID')
}

export {
    getAllOrgs,
    addOrg,
    addTeamsInOrg,
    deleteTeamInOrg,
    getOrgById
}