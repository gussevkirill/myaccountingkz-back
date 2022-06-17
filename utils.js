export const emailsLetterVariants = (type, body, file) => {
    switch (type) {
        case 'letter':
            return `
            <h1 style="text-transform:uppercase">Обратная связь</h1>
            <ul>
                <li style="margin-bottom:15px;list-style:none;">Имя : <span style="">${body['name']}</span></li>
                <li style="margin-bottom:15px;list-style:none;">Email : <span style=""> ${body['email']}</span></li>
                <li style="margin-bottom:15px;list-style:none;">Телефон : <span style="">${body['phone']}</span></li>
                <li style="list-style:none">Коментарий : <span>${body['comment']}</span></li>
            </ul>
            `
        case 'question':
            return `
            <h1 style="text-transform:uppercase">${body['title']}</h1>
            <ul>
                <li style="margin-bottom:15px;list-style:none;">Организационная форрма : <span style="">${body['organization']}</span></li>
                <li style="margin-bottom:15px;list-style:none;">Вид деятельности : <span style=""> ${body['type']}</span></li>
                <li style="margin-bottom:15px;list-style:none;">Налоговый режим : <span style="">${body['mode']}</span></li>
                <li style="margin-bottom:15px;list-style:none;">Плательщик НДС : <span style="">${body['isPayer'] === 'true' ? 'Да' : 'Нет'}</span></li>
                <li style="list-style:none">Представительство ТОО : <span>${body['respresentation']}</span></li>
                <li style="list-style:none">Контактное лицо : <span>${body['name']}</span></li>
                <li style="list-style:none">Электронная почта : <span>${body['email']}</span></li>
                <li style="list-style:none">Номер телефона : <span>${body['phone']}</span></li>
                <li style="list-style:none">Номер городского телеофна : <span>${body['home_phone']}</span></li>
                <li style="list-style:none">Вн.номер : <span>${body['number']}</span></li>
                <li style="list-style:none">Тема вопроса : <span>${body['question']}</span></li>
                ${body?.text ? `<li style="list-style:none">Текст вопроса : <span>${body['text']}</span></li>` : ''}
                ${file ? `<li style="list-style:none">Файл : <span><a href="${proccess.env.BACKAND_URL}/download/${file}" download>Скачать файл</a> </span></li>` : ''}
            </ul>
            `
        case 'review':
            return `
            <h1 style="text-transform:uppercase">Отзыв</h1>
            <ul>
                <li style="margin-bottom:15px;list-style:none;">Имя : <span style="">${body['name']}</span></li>
                <li style="margin-bottom:15px;list-style:none;">Отзыв : <span style=""> ${body['text']}</span></li>
            </ul>
            `
        default:
            break;
    }
}

