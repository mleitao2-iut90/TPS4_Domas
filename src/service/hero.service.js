import { getRequest } from "@/service/axios.service";

async function getAliases() {
    return await getRequest('/heroes/getaliases', 'GETALIAS')
}

export {
    getAliases,
}