const buttonMenu = document.querySelector('.button-show-menu');
const svgMenu = document.querySelector('.svg-menu');
const svgMenuHover = document.querySelector('.svg-menu-hover');


buttonMenu.addEventListener('click', async() => {
    const visibleMenu = document.querySelector('.visible-menu');

    if (visibleMenu.children.length == 0) {
        const template = document.createElement('template');
        template.innerHTML =
        `
        <div id="navigation-menu">
            <div class='navigation-links'>
                <a class="link-navigation-menu shadow-text" href="/game">Игровое поле</a>
                <a class="link-navigation-menu shadow-text" href="/statistics">Рейтинг</a>
                <a class="link-navigation-menu shadow-text" href="/active-players">Активные игроки</a>
                <a class="link-navigation-menu shadow-text" href="/history">История игр</a>
                <a class="link-navigation-menu shadow-text" href="/players">Список игроков</a>
                <a class="link-navigation-menu shadow-text" href="/profile">Профиль</a>
            </div>
        </div>
        `;

        svgMenu.style.backgroundColor = '#2C3033';
        buttonMenu.style.backgroundColor = '#2C3033'

        visibleMenu.append(template.content);
    } else {
        buttonMenu.style.backgroundColor = '#2D3540'
        svgMenu.style.backgroundColor = '#2D3540';
        

        visibleMenu.innerHTML = '';
    }
});
