var campoFiltro = document.querySelector("#filtrar-tabela");

campoFiltro.addEventListener("input", function() {
    console.log(this.value);
    var pacientes = document.querySelectorAll(".paciente");
    var digitado = this.value;
    if (digitado.length > 0) 
        pacientes.forEach(function(paciente) {
            var tdNome = paciente.querySelector(".info-nome");
            var nome = tdNome.textContent;
            var expressao = new RegExp(digitado, "i")
            if (!expressao.test(nome)) {
                console.log("invisivel");
                paciente.classList.add("invisivel");
            } else {
                console.log("visivel");
                paciente.classList.remove("invisivel");
            }
        });
    else 
        pacientes.forEach(function(paciente){
            paciente.classList.remove("invisivel");
        })
})