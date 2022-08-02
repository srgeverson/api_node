import Permissao from '../model/Permissao';

class PermissaoRepository {

    async findAll() {
        return await Permissao.findAll();
    }
    
    async findById(id) {
        return await Permissao.findOne({
            where: {
                id
            }
        });
    }
}

export default PermissaoRepository;
