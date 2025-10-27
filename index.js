//CAPTURANDO ELEMENTOS DO FORMULARIO:
const form = document.querySelector("form"); //pegando o form para evnt submit
const amount = document.getElementById("amount");
const expense = document.getElementById("expense"); //nome das despesas
const category = document.getElementById("category"); //dropdown categorias

//SELECIONANDO OS ELEMENTOS DA LISTA
const listaDespesa = document.querySelector("ul")

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
    infoDespesa.append(nomeDespesa, categoriaDespesa, valorDespesa)

    //ADICIONA AS INFORMAÇÕES NO ITEM
    itemDespesa.append(iconeDespesa, infoDespesa, iconeExcluir)


    //ADICIONANDO TUDO NA LISTA (ul)
    listaDespesa.append(itemDespesa) 

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas");
    console.log(error);
  }
}
