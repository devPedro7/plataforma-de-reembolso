//CAPTURANDO ELEMENTOS DO FORMULARIO:

const amount = document.getElementById("amount")


//EVENTOS

//- EVENTO PARA QUANDO O VALOR DO amount MUDAR, PODER REMOVER AS LETRAS E PEGAR SÓ NUMEROS

amount.oninput = () =>{
    //removendo as letras
    let value = amount.value.replace(/\D/g, "")

    //devolvendo só os números para o front
    amount.value = value


} //OBESERVA CONTEUDOS DO INPUT