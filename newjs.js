const tickets = [
    { title: "Проектор не включается", room: "203", category: "Оборудование", done: false },
    { title: "Не закрывается окно", room: "105", category: "Аудитория", done: false },
    { title: "В коридоре не горит свет", room: "Коридор, 2-й этаж", category: "Другое", done: true }
]
const sluchilos = document.getElementById(`sluchilos`);
const place = document.getElementById(`place`);
const categoriaSelect = document.getElementById(`categoriaSelect`);
const ticketList = document.getElementById(`ticketList`);
const addButton = document.getElementById(`addButton`);
const message = document.getElementById(`message`);

addButton.addEventListener(`click`, () => {
    if (sluchilos.value.trim() === '') {
        message.textContent = 'Введите причину';
        return;
    }
    if (place.value.trim() === '') {
        message.textContent = 'Введите место';
        return;
    }
    if (categoriaSelect.value === "") {
        message.textContent = 'Выберите категорию';
        return;
    }

    const newTicket = {
        title: sluchilos.value.trim(),
        room: place.value.trim(),
        category: categoriaSelect.value,
        done: false
    };
    tickets.push(newTicket);

    sluchilos.value = '';
    place.value = '';
    categoriaSelect.value = '';
    message.textContent = '';

    renderTickets();
});
function renderTickets() {
    ticketList.innerHTML = '';

    if (tickets.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Заявок пока нет';
        ticketList.append(li);
        return;
    }

    let ticketsToShow = 0;

    tickets.forEach((ticket, index) => {
        if (onlyOpen.checked === true && ticket.done === true) {
            return;
        }
        ticketsToShow++;

        const li = document.createElement('li');

        let statusText = '';
        if (ticket.done === true) {
            statusText = 'Выполнена';
        } else {
            statusText = 'Открыта';
        }

        const spanText = document.createElement('span');
        spanText.textContent = `Причина: ${ticket.title} | Кабинет: ${ticket.room} | Категория: ${ticket.category} | Статус: `;

        const spanStatus = document.createElement('span');
        spanStatus.textContent = statusText;
        if (ticket.done === true) {
            spanStatus.className = 'done';
        } else {
            spanStatus.className = 'open';
        }

        li.append(spanText, spanStatus);

        if (ticket.done === false) {
            const doneButton = document.createElement('button');
            doneButton.textContent = 'Выполнить';
            doneButton.addEventListener('click', () => {
                tickets[index].done = true;
                renderTickets();
            });
            li.append(doneButton);
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => {
            tickets.splice(index, 1);
            renderTickets();
        });
        li.append(deleteButton);

        ticketList.append(li);
    });

    if (ticketsToShow === 0) {
        const li = document.createElement('li');
        li.textContent = 'Открытых заявок нет';
        ticketList.append(li);
    }
}

onlyOpen.addEventListener('change', () => {
    renderTickets();
});

renderTickets();

