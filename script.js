document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const birthdate = new Date(document.getElementById('birthdate').value);
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();

    let valid = true;
    // Проверка логина
    const loginRegex = /^[A-Za-z]+$/;
    if (!loginRegex.test(login)) {
        document.getElementById('loginError').textContent = 'Логин должен содержать только английские буквы.';
        valid = false;
    } else {
        document.getElementById('loginError').textContent = '';
    }

    // Проверка возраста
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }
    if (age < 18) {
        document.getElementById('birthdateError').textContent = 'Вам должно быть не менее 18 лет.';
        valid = false;
    } else {
        document.getElementById('birthdateError').textContent = '';
    }
    // Блокировка ввода недопустимых символов в поле Логин
document.getElementById('login').addEventListener('input', function(event) {
    const loginRegex = /^[A-Za-z]*$/;
    if (!loginRegex.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^A-Za-z]/g, '');
    }
});


    // Проверка пароля
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Пароли не совпадают.';
        valid = false;
    } else {
        document.getElementById('confirmPasswordError').textContent = '';
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d{4,}).{8,}$/;
    if (!passwordRegex.test(password)) {
        document.getElementById('passwordError').textContent = 'Пароль должен содержать не менее 8 символов, одну заглавную букву и минимум 4 цифры.';
        valid = false;
    } else {
        document.getElementById('passwordError').textContent = '';
    }

    // Проверка ФИО
    const fullNameRegex = /^[А-Яа-яЁё\s]+$/;
    if (!fullNameRegex.test(fullName) || fullName.split(' ').length < 3) {
        document.getElementById('fullNameError').textContent = 'Введите корректные ФИО (Фамилия, Имя, Отчетсво).';
        valid = false;
    } else {
        document.getElementById('fullNameError').textContent = '';
    }

    // Проверка номера телефона
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('phoneError').textContent = 'Введите корректный номер телефона (только цифры).';
        valid = false;
    } else {
        document.getElementById('phoneError').textContent = '';
    }

    if (valid) {
       alert('Регистрация успешна!');
    }
});


// Блокировка ввода недопустимых символов в поле ФИО
document.getElementById('fullName').addEventListener('input', function(event) {
    const fullNameRegex = /^[А-Яа-яЁё\s]*$/;
    if (!fullNameRegex.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^А-Яа-яЁё\s]/g, '');
    }
});

// Блокировка ввода недопустимых символов в поле телефона
document.getElementById('phone').addEventListener('input', function(event) {
    const phoneRegex = /^\d*$/;
    if (!phoneRegex.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^\d]/g, '');
    }
});
// Связанные списки для формы записи
const doctorToServices = {
    therapist: ['Консультация', 'Обследование'],
    cardiologist: ['ЭКГ', 'Консультация'],
    dermatologist: ['Консультация', 'Лечение кожных заболеваний'],
    neurologist: ['Консультация', 'ЭЭГ']
};

// Доступные даты и время для врачей
const doctorToDates = {
    therapist: ['2023-11-01 10:00', '2023-11-01 14:00'],
    cardiologist: ['2023-11-02 12:00', '2023-11-02 16:00'],
    dermatologist: ['2023-11-03 09:00', '2023-11-03 13:00'],
    neurologist: ['2023-11-04 11:00', '2023-11-04 15:00']
};

// Обработчик изменения выбора врача
document.getElementById('doctor').addEventListener('change', function() {
    const serviceSelect = document.getElementById('service');
    serviceSelect.innerHTML = '<option value="" disabled selected hidden>Выберите услугу</option>';
    
    const selectedDoctor = this.value;
    if (doctorToServices[selectedDoctor]) {
        doctorToServices[selectedDoctor].forEach(service => {
            const option = document.createElement('option');
            option.value = service.toLowerCase();
            option.textContent = service;
            serviceSelect.appendChild(option);
        });
    }

    const availableDatesSelect = document.getElementById('availableDates');
    availableDatesSelect.innerHTML = '<option value="" disabled selected hidden>Выберите дату и время</option>';
    
    if (doctorToDates[selectedDoctor]) {
        doctorToDates[selectedDoctor].forEach(date => {
            const option = document.createElement('option');
            option.value = date;
            option.textContent = date;
            availableDatesSelect.appendChild(option);
        });
    }
});

// Очистка формы записи
document.getElementById('clearForm').addEventListener('click', function() {
    document.getElementById('appointmentForm').reset();
    // Обновляем плейсхолдеры после сброса формы
    document.getElementById('service').innerHTML = '<option value="" disabled selected hidden>Выберите услугу</option>';
    document.getElementById('availableDates').innerHTML = '<option value="" disabled selected hidden>Выберите дату и время</option>';
});