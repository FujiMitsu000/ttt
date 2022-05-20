export default async() => {
    const template = document.createElement('template');

    template.innerHTML =
    `
    <main id="main-holder">
        <h1 id="login-header">Вход</h1>
        <p class='login-notice'>Введите никнейм и пароль в поля ниже для входа или регистрации аккаунта</p>
        <div id="login-error-msg-holder">
        </div>
        
        <form id="login-form">
            <input type="text" name="username" id="username-field" class="login-form-field" placeholder="Никнейм">
            <input type="password" name="password" id="password-field" class="login-form-field" placeholder="Пароль">
            <input type="submit" value="Вход" id="login-form-submit" class='button-form-submit'>
            <p class='login-word-or'>или</p>
            <input type="submit" value="Регистрация" id="registration-form-submit" class='button-form-submit'>
        </form>

    </main>
    `;

    return template.content;
};