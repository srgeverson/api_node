import Permissao from '../model/Permissao';

class PermissaoRepository {
    async findAll() {
        console.log('ops')
        return await Permissao.findAll();
    }
}

export default PermissaoRepository;
