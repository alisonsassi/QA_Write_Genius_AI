# QA Write Genius AI

**Objetivo do Sistema:**
Utilizar um modelo de inteligência artificial (IA) para melhorar a redação de casos de teste no processo de QA. O sistema será treinado com modelos e regras ideais de escrita, oferecendo sugestões precisas para aprimorar os casos de teste escritos pelos membros da equipe de QA. O objetivo é economizar tempo na redação dos casos de teste, padronizar a linguagem e estrutura, e consequentemente, elevar a qualidade da documentação de testes.

* Uma ferramenta assistente que valide o modelo de caso de teste, para aprimorar a eficiência e a qualidade do processo de teste.
Validação do Modelo de Escrita de Caso de Teste:
Asseguramos a validação do modelo de escrita de casos de teste, visando aprimorar a qualidade da documentação para um uso mais eficiente no futuro. Evitando retrabalho nas verificações formais.
Padronização Inteligente com Sugestões de IA:
* Utilizando um modelo de Linguagem de Aprendizado de Máquina (LLM) treinado, conseguimos padronizar as regras, oferecendo sugestões inteligentes para aprimorar a redação dos casos de teste.
* A padronização resultante contribui para uma uniformidade consistente na documentação, estabelecendo diretrizes claras que beneficiam toda a equipe de QA.
Padronização na Escrita:
* A Philips estabelece padrões rigorosos na redação de casos de teste, os quais são incorporados ao treinamento da IA. Isso resulta em sugestões mais precisas e alinhadas com as normas estabelecidas.
Aumento da Produtividade:
*Ao eliminar preocupações com o modelo, garantimos que os casos de teste atendam aos requisitos necessários. Recebendo sugestões para uma redação aprimorada, os profissionais podem concentrar-se mais na execução eficiente das tarefas, aumentando assim a produtividade."



**FEARURES:**
Ideia do Alison.... hehehe

1. Padronização na escrita: Através da escrita de um CT, fazer a padronização das variáveis, exigindo informações portantes para o caso de teste.
2. Ajuda da IA para sugerir melhorias, através da escrita realizada, a IA vai sugerir melhorias conforme seu treinamento.
3. Avaliação de feedback da sugestão, o sistema tem 3 possibilidades de avaliação, para que seja possível entender o quanto está sendo útil a recomendação.
4. Opinião com IA: a inteligência artificial fará um esboço do que entendeu da escrita, e fará recomendação de como melhorar.
5. Tutorial orientativo: com algumas sugestões de como usar o sistema, o usuário entende o objetivo e como utilizar.
6. Comparador de textos: para melhor entender O que mudou, essa feature foi desenvolvida. Ela compara o texto escrito com a sugestão da IA. Conta as diferenças de palavras no texto.
7. Técnico: Armazenamento das informações com para futuro treinamento.
8. Técnico: gerador de identificador de usuário através de cookies.
9. 


*Configuration*

Insira a chave de API gerada da OpenAI no arquivo "configAI":

```python
class OpenIA:
    api_key = "YOUR_TOKEN_OF_OPENAI"
```

## Instalação

Siga os passos abaixo para configurar o ambiente e instalar as dependências:

Crie um ambiente virtual:

``` bash
python -m venv venv
```

* Ative o ambiente virtual:

No Windows:
```bash
source venv\Scripts\activate
```

No Linux/Mac:

```bash
source venv/bin/activate
```

* Instale as dependências:

```bash
pip install fastapi
pip install uvicorn
pip install openai

```
* Execução

Para executar o projeto, utilize os seguintes comandos:

Inicie o servidor Uvicorn:

```bash

uvicorn main:app --reload
```
