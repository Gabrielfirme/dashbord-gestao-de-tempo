const url = './data/data.json';

const informationsField = document.querySelectorAll('.informacoes');
const btnTimeTracking = document.querySelectorAll('.rastreamento li');

// Renderiza as informações de rastreamento de tempo DIÁRIO
function handleTimeTrackingInitial(dataJSON) {
    informationsField.forEach((information, i) => {
        informationsField[i].innerHTML = `
            <p>${dataJSON[i].title}</p>
            <h2>${dataJSON[i].timeframes.dia.current}hrs</h2>
            <span>
               Última Dia - ${dataJSON[i].timeframes.dia.previous}hrs
            </span>
        `;
    });
}

// Renderiza as informações de rastreamento de tempo SEMANAL
function handleTimeTrackingWeekly(dataJSON) {
    informationsField.forEach((information, i) => {
        informationsField[i].innerHTML = `
            <p>${dataJSON[i].title}</p>
            <h2>${dataJSON[i].timeframes.semana.current}hrs</h2>
            <span>
                Última Semana - ${dataJSON[i].timeframes.semana.previous}hrs
            </span>
        `;
    });
}

// Renderiza as informações de rastreamento de tempo MENSAL
function handleTimeTrackingMonthly(dataJSON) {
    informationsField.forEach((information, i) => {
        informationsField[i].innerHTML = `
            <p>${dataJSON[i].title}</p>
            <h2>${dataJSON[i].timeframes.mes.current}hrs</h2>
            <span>
                Último Mês - ${dataJSON[i].timeframes.mes.previous}hrs
            </span>
        `;
    });
}

// Inicializa a renderização dos elementos
// de acordo com o retorno do click do usuário
// no escopo do rastreamento
async function initTimeTracking(targetBtn) {
    const dataResponse = await fetch(url);
    const dataJSON = await dataResponse.json();

    if (targetBtn === 'dia') handleTimeTrackingInitial(dataJSON);
    else if (targetBtn === 'semana') handleTimeTrackingWeekly(dataJSON);
    else if (targetBtn === 'mes') handleTimeTrackingMonthly(dataJSON);
}

// Captura o escopo do rastreamento de 
// acordo com a escolha do usuário
function handleTimeTracking(event) {
    btnTimeTracking.forEach((btn) => {
        btn.classList.remove('active');
    });

    this.classList.add('active');
    const targetBtn = event.target.id;
    initTimeTracking(targetBtn);
}

btnTimeTracking.forEach((btn) => {
    btn.addEventListener('click', handleTimeTracking);
});

// Inicializa como DIÁRIO por padrão
initTimeTracking('dia');