let search = document.querySelector("#image")
let cep

//DIGITAÇÃO DO CEP NO INPUT
let cepInput = document.querySelector("#cep")
cepInput.addEventListener("keyup",()=>{
    let cep2 = cepInput.value
    cep = cep2.replace("-","")
})


//EVENTO DE CLICAR NO BOTÃO DE PESQUISA
search.addEventListener("click", ()=>{
    let urlStr = "https://viacep.com.br/ws/"+cep+"/json/";
     $.ajax({
        url : urlStr,
        type: "get",
        dataType: "json",
        success : function(data){
            const rua = document.querySelector("#street")
            rua.value = data.logradouro
            
            const cidade = document.querySelector("#city")
            cidade.value = data.localidade

            const uf = document.querySelector("#state")
            uf.value = data.uf             
        },
        error : function(erro){
            alert("CEP INFORMADO INEXISTENTE")
        } 
    })
})