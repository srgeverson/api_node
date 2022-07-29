import Permissao from '../model/Permissao';

class PermissaoRepository {
    async findAll() {
        return await Permissao.findAll();
    }
}

export default PermissaoRepository;
