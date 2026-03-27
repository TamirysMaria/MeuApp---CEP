/**
 * Função principal para buscar o CEP.
 * Usamos 'async' porque a busca na internet demora um pouco e o código precisa "esperar".
 */
async function buscarCEP() {
  // Aqui é onde pega o valor que o usuário digitou no campo de texto (input) do HTML
  const cep = document.getElementById("cep").value;

  // Verificação simples: se o campo estiver vazio, avisa o usuário e para a execução
  if (cep === "") {
    alert("Digite um CEP!");
    return;
  }

  /**
   * REDE DE SEGURANÇA (try/catch):
   * O 'try' tenta rodar o código. Se a internet cair ou a API falhar, 
   * o código pula direto para o 'catch' lá embaixo, evitando que o site trave.
   */
  try {
    /**
     * CHAMADA PARA A API:
     * O 'fetch' é o comando que vai buscar os dados no site do ViaCEP.
     * O 'await' diz para o JavaScript esperar a resposta chegar antes de continuar.
     * Usei ${cep} para colocar o número que foi digitado dentro do endereço da busca.
     */
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/` );
    
    /**
     * CONVERSÃO DE DADOS:
     * A resposta da internet vem em um formato bruto. 
     * O .json() transforma essa resposta em um objeto que o JavaScript consegue ler.
     */
    const dados = await resposta.json();

    /**
     * VERIFICAÇÃO DE ERRO DA API:
     * O ViaCEP retorna um campo chamado 'erro: true' se o CEP não existir nos Correios.
     * Se isso acontecer, é mandado uma mensagem na tela e paramos aqui.
     */
    if (dados.erro) {
      document.getElementById("resultado").innerHTML = "CEP não encontrado.";
      return;
    }

    /**
     * EXIBIÇÃO DOS RESULTADOS:
     * Aqui é onde injetei o HTML com os dados dentro da div 'resultado'.
     * Usei ${dados.campo} para pegar cada informação específica (Rua, Bairro, etc).
     */
    document.getElementById("resultado").innerHTML = `
      <p><strong>Rua:</strong> ${dados.logradouro}</p>
      <p><strong>Bairro:</strong> ${dados.bairro}</p>
      <p><strong>Cidade:</strong> ${dados.localidade}</p>
      <p><strong>Estado:</strong> ${dados.uf}</p>
    `;

  } catch (erro) {
    /**
     * TRATAMENTO DE FALHAS:
     * Se houver um erro de conexão (ex: você está sem internet), o código cai aqui.
     * O console.log(erro) mostra o erro técnico para o desenvolvedor no navegador.
     */
    console.log(erro);
    alert("Erro ao buscar CEP");
  }
}
