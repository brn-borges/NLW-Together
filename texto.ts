// nomeVariavel:tipoDaVarivel

interface Usuario {
  nome:string, email:string, telefone?:string // ? => faz com que não seja obrigatório o envio da variavel
}
function enviarEmail({email, nome, telefone}: Usuario){
  console.log(`Olá ${nome} seu email é ${email} e seu telefone é ${telefone}`)
}
enviarEmail({
  nome:"Daniele", 
  email:"dani.leao89@gmail.com", 
  telefone:"1212121212"
})