const url = './data/data.json';

const informationsField = document.querySelectorAll('.informacoes');
const btnTimeTracking = document.querySelectorAll('.rastreamento li');

// Processamento de informações do rastreamento de tempo por Dia
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

// Processamento de informações do rastreamento de tempo por semana
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

// Processamento de informações do rastreamento de tempo por Mês
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

// Dá inicio ao processamento de elementos de acordo com o click do usuário, por meio desta função assíncrona  
async function initTimeTracking(targetBtn) {
    const dataResponse = await fetch(url);
    const dataJSON = await dataResponse.json();

    if (targetBtn === 'dia') handleTimeTrackingInitial(dataJSON);
    else if (targetBtn === 'semana') handleTimeTrackingWeekly(dataJSON);
    else if (targetBtn === 'mes') handleTimeTrackingMonthly(dataJSON);
}


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

// O padrão de inicialização do dashboard de tempo se dará pelo tempo diário
initTimeTracking('dia');