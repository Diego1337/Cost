from flask import Blueprint, jsonify
from models import db, Produto, MateriaPrima, Preco, ProdutoMP
from sqlalchemy.sql import func

# Cria um Blueprint para as rotas de gráficos
graficos_bp = Blueprint('graficos_bp', __name__)

@graficos_bp.route('/graficos/custo-produtos', methods=['GET'])
def get_custo_produtos():
    """
    Calcula e retorna o custo total para cada produto.
    O custo de um produto é a soma dos custos de suas matérias-primas,
    onde o custo de cada matéria-prima é (quantidade * preço).
    """
    try:
        # Query para calcular o custo total de cada produto
        custo_produtos = db.session.query(
            Produto.nome_prdt.label('produto_nome'),
            func.sum(ProdutoMP.quantidade * Preco.valor_prc).label('custo_total')
        ).join(ProdutoMP, Produto.id_prdt == ProdutoMP.id_prdt)\
         .join(MateriaPrima, MateriaPrima.id_mp == ProdutoMP.id_mp)\
         .join(Preco, Preco.id_mp == MateriaPrima.id_mp)\
         .group_by(Produto.nome_prdt)\
         .all()

        # Formata o resultado em uma lista de dicionários
        resultado = [
            {'nome': nome, 'custo': float(custo)}
            for nome, custo in custo_produtos
        ]

        return jsonify(resultado), 200

    except Exception as e:
        # Em caso de erro, retorna uma mensagem de erro
        return jsonify({'error': str(e)}), 500
