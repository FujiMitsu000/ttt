
// document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    console.log('result');
    const checkToken = fetch ('/history', {
        method: 'POST',
        body: JSON.stringify({userId, token}),
        headers: {
            'Content-Type': 'application/json',
            'Autorization': `Bearer ${token}`
        }
    })
    // .then(response => response.json())
    // .then((result) => {
    //     console.log(result);
    //     if (result) {
            // window.location.href = 'http://localhost:8000/history';
    //     }
    // });
// });
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const registrationButton = document.getElementById("registration-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg-holder");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const body = {
        username: loginForm.username.value,
        password: loginForm.password.value
    }

    try {
        const login = fetch ('api/auth/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((result) => {

            if (result) {
                localStorage.setItem('user_id', result.userId);
                localStorage.setItem('token', result.token);
                window.location.href = 'http://localhost:8000/history';
            }
        });
    } catch {
        console.error('Что-то пошло не так', error);
    }
});

registrationButton.addEventListener("click", (e) => {
    e.preventDefault();

    const body = {
        username: loginForm.username.value,
        password: loginForm.password.value
    }
    try {
        const registration = fetch ('api/auth/registration', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((user) => {
            if (user.registrationErrors) {
                let errorMessage = user.registrationErrors.errors;

                if (!errorMessage[1]) {
                    loginErrorMsg.innerHTML = 
                    `
                    <p id="login-error-msg">${errorMessage[0].msg} 
                    `;
                } else {
                    loginErrorMsg.innerHTML = 
                    `
                    <p id="login-error-msg">${errorMessage[0].msg} 
                    <span id="error-msg-second-line">${errorMessage[1].msg}</span></p>
                    `;
                }

                return loginErrorMsg.content;
            } else if (user.msg) {

                loginErrorMsg.innerHTML = 
                    `
                    <p id="login-error-msg">${user.msg}
                    `;                  
            } else if (user.id) {

                localStorage.setItem('user_id', user.id)

                loginErrorMsg.innerHTML = 
                `
                <p id="login-error-msg">Регистрация прошла успешно!
                <span id="error-msg-second-line">Нажмите "Вход"</span></p>
                `;

                const loginErrorBackground = document.getElementById("login-error-msg");

                loginErrorBackground.style.backgroundColor = '#94ea92';
                loginErrorBackground.style.border = '1px solid #1a6d00';
                loginErrorBackground.style.color = '#1a6d00';
            } else {

                loginErrorMsg.innerHTML = 
                `
                <p id="login-error-msg">Что-то пошло не так.
                <span id="error-msg-second-line">Попробуйте еще раз.</span></p>
                `;
            }
        });
    } catch {
        console.error('Что-то пошло не так', error);
    }
});

