import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';



createApp(App).use(ToastService).use(PrimeVue,{
    locale: {
        startsWith: 'Начинается с',
        contains: 'Содержит',
        notContains: 'Не содержит',
        endsWith: 'Заканчивается на',
        equals: 'Равно',
        notEquals: 'Не равно',
        noFilter: 'Без фильтра',
        lt: 'Less than',
        lte: 'Less than or equal to',
        gt: 'Greater than',
        gte: 'Greater than or equal to',
        dateIs: 'Date is',
        dateIsNot: 'Date is not',
        dateBefore: 'Date is before',
        dateAfter: 'Date is after',
        clear: 'Очистить',
        apply: 'Применять',
        matchAll: 'Match All',
        matchAny: 'Match Any',
        addRule: 'Добавить правило',
        removeRule: 'Удалить правило',
        accept: 'Да',
        reject: 'Нет',
        choose: 'Выбирать',
        upload: 'Загрузить',
        cancel: 'Отмета',
        dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        monthNames: ["Январь","Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        today: 'Сегодня',
        weekHeader: 'Нед.',
        firstDayOfWeek: 0,
        dateFormat: 'mm/dd/yy',
        weak: 'Слабый',
        medium: 'Середина',
        strong: 'Сильный',
        passwordPrompt: 'Введите пароль',
        emptyFilterMessage: 'No results found',
        emptyMessage: 'No available options'
    }
}).mount('#app')
