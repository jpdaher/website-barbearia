document.querySelector('a').addEventListener('click', async () => {
    window.location.href = '/logout'
})

document.querySelector('#filtrar-barbeiros').addEventListener('click', async (e) => {
    e.preventDefault()
    const especialidadeId = document.getElementById('especialidade').value 
    const response = await fetch(`/barbeiros/especialidade/${especialidadeId}`)
    const barbeiros = await response.json()

    const select = document.getElementById('barbeiro')
    select.innerHTML = '<option value="">Selecione um barbeiro</option>'

    console.log(barbeiros)
    barbeiros.forEach(element => {
        const option = document.createElement('option')
        option.value = element.idbarbeiros
        option.textContent = element.nome
        select.appendChild(option)
    })
})

document.querySelector('#agendar').addEventListener('click', async () => {
    const idbarbeiro = document.getElementById('barbeiro').value
    const data = document.getElementById('data').value
    const horario = document.getElementById('horario').value
    const especialidade = document.getElementById('especialidade').value

    const response = await fetch(`/barbeiros/disponibilidade?idbarbeiro=${idbarbeiro}&data=${data}&horario=${horario}`)
    const resultado = await response.json()
    console.log(resultado)

    if (resultado.disponivel) {
        await fetch(`/barbeiros/agendar?idcliente=${resultado.idcliente}&idbarbeiro=${idbarbeiro}&especialidade=${especialidade}&data=${data}&horario=${horario}`, {
            method: 'POST'
        })
    } else {
        window.alert('Horário indisponível para este barbeiro')
    }
})

async function carregarAgendamentos() {
    const response = await fetch('/cliente/agendamentos')
    const agendamentos = await response.json()
    const tabela = document.querySelector('tbody')
    console.log(agendamentos)
    if(agendamentos) {
        agendamentos.forEach(element => {
            const row = tabela.insertRow();
    
            const id = element.id
            const dia = row.insertCell(0);
            const hora = row.insertCell(1);
            const barbeiro = row.insertCell(2);
            const especialidade = row.insertCell(3);
            const cellBotao = row.insertCell(4)
    
            dia.textContent = element.data;
            hora.textContent = element.horario;
            barbeiro.textContent = element.especialidade;
            especialidade.textContent = element.barbeiro;
            cellBotao.innerHTML = `<button onclick='deletarAgendamento(${id})'>Deletar</button>`
        });
    }
}

async function deletarAgendamento(id){
    const response = await fetch(`/cliente/agendamentos/${id}`, {
        method: 'DELETE'
    })
    window.location.reload()
}



carregarAgendamentos()
