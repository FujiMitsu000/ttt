export default async() => {

    const responses = await Promise.all([
        fetch('/assets/svg/menu.svg'),
    ]);
    const [menu] = await Promise.all(responses.map((response) => response.text()));

    const menuTemplate = document.createElement('template');
    menuTemplate.innerHTML = menu;

    const template = document.createElement('template');

    template.innerHTML = 
    `
    <div class='visible-menu'></div>
    <button class='button-show-menu'>${menuTemplate.innerHTML}</button>
    `;

    return template.content;
};
