//CAPTURANDO ELEMENTOS DO FORMULARIO:
const form = document.querySelector("form")//pegando o form para evnt submit
const amount = document.getElementById("amount")
const expense = document.getElementById("expense") //nome das despesas
const category = document.getElementById("category") //dropdown categorias


//EVENTOS

//- EVENTO PARA QUANDO O VALOR DO amount MUDAR, PODER REMOVER AS LETRAS E PEGAR SÓ NUMEROS

amount.oninput = () =>{
    //removendo as letras
    let value = amount.value.replace(/\D/g, "")


    //TRANSFORMANDO O VALOR EM CENTAVOS
    value = Number(value) / 100 //transformando em centavos

    //devolvendo só os números para o front
    amount.value = formatarMoedaBRL(value)


} //OBESERVA CONTEUDOS DO INPUT


//FUNÇÕES

//FORMATAR A MOEDA PARA pt-br
function formatarMoedaBRL(value){
    //FORMATA O VALOR NO PADRÃO BRL (real brasileiro)
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    //RETORNA O VALOR FORMATADO
    return value
}

form.onsubmit = (event)=>{
    event.preventDefault() //tirar a ação de reload no sumbit
}