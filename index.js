//CAPTURANDO ELEMENTOS DO FORMULARIO:
const form = document.querySelector("form"); //pegando o form para evnt submit
const amount = document.getElementById("amount");
const expense = document.getElementById("expense"); //nome das despesas
const category = document.getElementById("category"); //dropdown categorias

//SELECIONANDO OS ELEMENTOS DA LISTA
const listaDespesa = document.querySelector("ul")

//RECUPERANDO O ELEMENTO DE QUANTIDADE DE DESPESAS
const qtdDespesas = document.querySelector("aside header p span")//navegando para pegar a span

//RECUPERANDO O TOTAL DAS DESPESAS
const totalDespesas = document.querySelector("aside header h2")

//EVENTOS

//- EVENTO PARA QUANDO O VALOR DO amount MUDAR, PODER REMOVER AS LETRAS E PEGAR SÓ NUMEROS

amount.oninput = () => {
  //removendo as letras
  let value = amount.value.replace(/\D/g, "");

  //TRANSFORMANDO O VALOR EM CENTAVOS
  value = Number(value) / 100; //transformando em centavos

  //devolvendo só os números para o front
  amount.value = formatarMoedaBRL(value);
}; //OBESERVA CONTEUDOS DO INPUT

//FUNÇÕES

//FORMATAR A MOEDA PARA pt-br
function formatarMoedaBRL(value) {
  //FORMATA O VALOR NO PADRÃO BRL (real brasileiro)
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  //RETORNA O VALOR FORMATADO
  return value;
}

//CAPTURA O EVENTO DE SUBMIT DO FORMULARIO PARA OBTER OS VALORES
form.onsubmit = (event) => {
  event.preventDefault(); //tirar a ação de reload no sumbit

  //CRIA UM OBJETO COM OS DETALHES DAS INFORMACOES DE UMA NOVA DESPESA
  const novaDespesa = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    create_at: new Date(),
  };

  //CHAMADA DA FUNCAO QUE ADICIONA UM ITEM NA LISTA
  adicionarNovaDespesa(novaDespesa);
};

//FUNCAO PARA ADICIONAR UMA DESPESA
function adicionarNovaDespesa(novaDespesa) {
  try {

    //CRIANDO ELEMENTO PARA ADICIONAR NA LISTA
    const itemDespesa = document.createElement("li")//definimos qual elemento
    itemDespesa.classList.add("expense")//classe de estilo do item 

    //ICONE DA CATEGORIA
    const iconeDespesa = document.createElement("img")
    //DEFININDO O ATRIBUTO DA IMAGEM E DEFININDO O ICONE PELA CATEGORIA
    iconeDespesa.setAttribute("src", `img/${novaDespesa.category_id}.svg`)
    iconeDespesa.setAttribute("alt", novaDespesa.category_name)

    //CRIANDO A INFORMACAO DA DESPESA
    const infoDespesa = document.createElement("div")
    infoDespesa.classList.add("expense-info") //adicionando classe da div

    //CRIANDO NOME DA DESPESA
    const nomeDespesa = document.createElement("strong")
    nomeDespesa.textContent = novaDespesa.expense //ADICIONANDO O NOME DA DESPESA

    //CRIANDO A CATEGORIA DA DESPESA
    const categoriaDespesa = document.createElement("span")
    categoriaDespesa.textContent = novaDespesa.category_name

    //CRIANDO VALOR DA DESPESA
    const valorDespesa = document.createElement("span")
    valorDespesa.classList.add("expense-amount")
  
    //CRIANDO SIMBOLO BRL DO VALOR DA DESPESA
    const simboloBRL = document.createElement("small")
    simboloBRL.textContent = "R$"

    valorDespesa.append(simboloBRL)
    valorDespesa.append(novaDespesa.amount.toUpperCase().replace("R$", ""))

    //ADICIONANDO ICONE DE EXCLUIR NO ITEM
    const iconeExcluir = document.createElement("img")
    iconeExcluir.classList.add("remove-icon")
    iconeExcluir.setAttribute("src", "img/remove.svg")
    iconeExcluir.setAttribute("alt", "remover")
    
    //ADICIONANDO NOME E CATEGORIA NA div DAS INFORMACOES DA DESPESA
    infoDespesa.append(nomeDespesa, categoriaDespesa)
    

    //ADICIONA AS INFORMAÇÕES NO ITEM
    itemDespesa.append(iconeDespesa, infoDespesa, valorDespesa, iconeExcluir)


    //ADICIONANDO TUDO NA LISTA (ul)
    listaDespesa.append(itemDespesa) 

    //LIMPANDO O FORMULARIO PARA ADICIONAR UM NOVO ITEM
    limparDespesas()

    //SOMANDO A QUANTIDADE DE DESPESAS
    atualizarTotalDespesas()

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas");
    console.log(error);
  }
}

//ATUALIZA O NUMERO TOTAL DAS DESPESAS DA LISTA
function atualizarTotalDespesas(){
  try {
    
    //RECUPERA TODOS OS ITENS DA LISTA(li)
    const items = listaDespesa.children //mostra quantos filhos tem dentro da lista

    //ATUALIZANDO A QUANTIDADE DE ITENS DA LISTA
    qtdDespesas.textContent = `${items.length} ${items.length > 1 ? "desepesas" : "despesa"}`

    //VARIAVEL PARA ICREMENTAR O TOTAL DAS DESPESAS
    let total = 0
    //PERCORRENDO CADA li DA ul
    for(let item = 0; item < items.length; item++){
      const itemAmount = items[item].querySelector(".expense-amount") //acessando o item do momento

      console.log(itemAmount)

      //REMOVENDO CARCTERES NAO NUMERICOS E SUBSTITUINDO A VIRGULA PELO PONTO
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

      //CONVERTENDO O VALOR PARA float
      value = parseFloat(value)

      //VERIFICANDO SE É UM NUMERO VALIDO
      if(isNaN(value)){
        alert("Não foi possível calcular o total. O valor não parece ser um número.")
      }

      //INCREMENTANDO O VALOR TOTAL
      total += Number(value)
    }


    //CRIANDO SPAN PARA R$ FORMARADO
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    //FORMATA O VALOR E REMOVE O R$ QUE SERÁ EXIBIDO PELA SMALL COM UM ESTILO CUSTOMIZADO
    total = formatarMoedaBRL(total).toUpperCase().replace("R$", "")

    //LIMPA O CONTEUDO DO ELEMENTO
    totalDespesas.innerHTML = ""

    //ADICIONA O SIMBOLO DA MOEDA E O VALOR TOTAL FORMATADO
    totalDespesas.append(symbolBRL, total)

  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais")
  }
}

//EVENTO QUE CAPTURA O CLIQUE NOS ITENS DA LISTA
listaDespesa.addEventListener("click", function(event){
  //verificando se o elemento clicado é um item para remover
  if(event.target.classList.contains("remove-icon")){
    //OBTENDO A li PAI DO ELEMENTO CLICADO
    const item = event.target.closest(".expense")

    //REMOVENDO O ITEM DA LISTA
    item.remove()

  }

      //ATUALIZANDO O TOTAL DOS ITENS QUANDO É REMOVIDO
      atualizarTotalDespesas()
})

function limparDespesas(){
  //limpando os inputs
  expense.value = ""
  category.value = ""
  amount.value = ""

  //VOLTA PARA O NOME DA DESPESA AO ADICIONAR UM ITEM
  expense.focus()
}