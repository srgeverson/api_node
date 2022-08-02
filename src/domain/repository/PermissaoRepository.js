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
    
    async updatePermissaoAtivo(permissao) {
        return await Permissao.update(
            {
                ativo: permissao.ativo
            },
            {
                where: {
                    id: permissao.id
                }
            }
        );
    }
}

export default PermissaoRepository;
