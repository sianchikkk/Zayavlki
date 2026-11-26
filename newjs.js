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
    let ticketsToShow;
    tickets.forEach(ticket => {
        const li = document.createElement('li');
        if(ticket.done === true){
            ticket.done = "ДА"
        }
        else if(ticket.done === true){
            ticket.done = "НЕТ"
        }
        li.textContent = `Причина: ${ticket.title} Кабинет: ${ticket.room} Категория: ${ticket.category} Выполнил ли ${ticket.done}`;
        ticketList.append(li);
    });
}

