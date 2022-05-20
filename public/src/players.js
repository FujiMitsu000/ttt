import menu from './menu.js';

export default async() => {
  const responses = await Promise.all([
    fetch('/assets/svg/cancel.svg'),
    fetch('/assets/svg/close.svg'),
    fetch('/api/players')
  ]);
  const [cancel, close, users] =  await Promise.all(responses.map(
    (response, idx) => idx !== 2 ? response.text() : response.json())
  );
  const cancelTemplate = document.createElement('template');

  cancelTemplate.innerHTML = cancel;
  cancelTemplate.content.firstElementChild.classList.add('button__icon', 'button__icon_secondary');

  const closeTemplate = document.createElement('template');

  closeTemplate.innerHTML = close;
  closeTemplate.content.firstElementChild.classList.add('modal__close-icon');

  const template = document.createElement('template');

  function createElementTemplate() {
    template.innerHTML =
    `
      <main class="box container__content players">
        <div class="box__header">
          <h1 class="text text_title players__title">Список игроков</h1>
          <button class="button button_primary players__add-new">Добавить игрока</button>
        </div>
        <table class="players__table table">
          <tr class="table__row">
            <th class="text text_bold table__cell">Логин</th>
            <th class="text text_bold table__cell">Статус</th>
            <th class="text text_bold table__cell">Создан</th>
            <th class="text text_bold table__cell">Изменен</th>
            <th class="text text_bold table__cell"></th>
          </tr>
          ${
            users 
              .map(
                ({id, login, status, createdAt, updatedAt}) =>
                  `
                    <tr class="table__cell">
                      <th class="text table__cell players__login">${login}</th>
                      <th class="text table__cell">
                        <div class="players__status players__status_${status}">
                          ${status === 'active' ? 'Активен' : 'Заблокирован'}
                        </div>
                      </th>
                      <th class="text table__cell">${new Date(createdAt).toDateString().slice(4)}</th>
                      <th class="text table__cell">${new Date(updatedAt).toDateString().slice(4)}</th>
                      <th class="text table__cell players__button">
                        <button
                          class="button button_secondary players__${status === 'active' ? 'block' : 'unblock'}"
                          data-id="${id}"
                        >
                          ${status === 'active' ? cancelTemplate.innerHTML : ''}
                          ${status === 'active' ? 'Заблокировать' : 'Разблокировать'}
                        </button>
                      </th>
                    </tr>
                  `
              )
              .join('')
          }
        </table>
      </main>
    `;
  }
  createElementTemplate();

  for (const btnWrapper of template.content.querySelectorAll('.players__button')) {
    btnWrapper.firstElementChild.addEventListener(
      'click',
      (event) => {
        async function updateUser() {
          const response = await fetch(`/api/players/${event.target.dataset.id}`, {
            method: 'PUT',
          });
        }

        async function deleteUser() {
          const response = await fetch(`/api/players/${event.target.dataset.id}`, {
            method: 'DELETE',
          });
        }
        async function elementUpdate(selector) {
          try {
            let html = await (await fetch(location.href)).text();
            let newdoc = new DOMParser().parseFromString(html, 'text/html');
            document.querySelector(selector).outerHTML = newdoc.querySelector(selector).outerHTML;
            console.log('Элемент '+selector+' был успешно обновлен');
            return true;
          } catch(err) {
            console.log('При обновлении элемента '+selector+' произошла ошибка:');
            console.dir(err);
            return false;
          }
        }


        if (event.target.classList.contains('players__block')) {

          deleteUser();
        } else {

          updateUser();
        }

        createElementTemplate();
      }
    );
  }

  template.content.querySelector('.players__add-new').addEventListener(
    'click',
    () => {
      const modalTemplate = document.createElement('template');

      modalTemplate.innerHTML =
        `
          <div class="modal">
            <div class="modal__window">
              <div class="modal__header">
                <button class="modal__close">${closeTemplate.innerHTML}</button>
              </div>
              <h1 class="text text_title modal__title">Добавьте игрока</h1>
              <form class="modal__content form players-create">
                <div class="input form__field">
                  <label class="text text_bold input__label" for="create-user-login-input">Логин</label>
                  <input
                    id="create-user-login-input"
                    type="text"
                    class="text input__textbox players-create__login"
                    placeholder="Логин"
                  >
                </div>
                <input type="submit" class="button button_primary modal__submit" value="Добавить">
              </form>
            </div>
          </div>
        `;

      const closeModal = (modal) => () => {
        document.body.removeChild(modal);
      };
      const closeThis = closeModal(modalTemplate.content.firstElementChild);

      modalTemplate.content.querySelector('.modal__close').addEventListener(
        'click',
        closeThis
      );
      modalTemplate.content.querySelector('.modal__submit').addEventListener(
        'click',
        (event) => {
          event.preventDefault();
          event.stopPropagation();

          const loginInput = document.querySelector('.players-create__login');

          if (!loginInput.value) {
            const errorMessage = 'Введите логин';

            if (!loginInput.nextElementSibling) {
              const messageElement = document.createElement('small');

              messageElement.innerHTML = errorMessage;
              messageElement.classList.add('input__error-message')
              loginInput.after(messageElement);
            } else {
              loginInput.nextElementSibling.innerHTML = errorMessage;
            }

            loginInput.classList.add('input__textbox_errored');

            return;
          } else {
            if (loginInput.nextElementSibling) {
              loginInput.nextElementSibling.remove();
            }

            loginInput.classList.remove('input__textbox_errored');
          }

          function createRandomPassword() {
            let randomPassword = Math.random().toString(36).slice(2, 10);

            return randomPassword;
          };

          async function postUser(body) {
            const response = await fetch('/api/players', {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {
                'Content-Type': 'application/json'
              }
            });
          }
          
          const user = {
            login: loginInput.value,
            password: createRandomPassword(),
            status: 'active',
          }

          postUser(user);

          closeThis();
        }
      );

      document.body.append(modalTemplate.content.firstElementChild);
    }
  );

  template.content.prepend(await menu());

  return template.content;
};
