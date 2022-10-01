import OAuthClientDetails from '../model/OAuthClientDetails';

class OAuthClientDetailsRepository {

    async findByClientId(clientId) {
        return await OAuthClientDetails.findOne({
            where: {
                client_id: clientId
            }
        });
    }

    async findById(id) {
        return await OAuthClientDetails.findOne({
            where: {
                id
            }
        });
    }
}

export default OAuthClientDetailsRepository;
