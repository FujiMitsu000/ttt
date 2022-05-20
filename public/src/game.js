import menu from './menu.js';

export default async(goTo) => {
    const template = document.createElement('template');

    template.innerHTML =
        `    
            <div id="play-area">
                <div class="current-turn-color_0 background-current-turn-player">
                    <div id="playerOne" class="players">
                        <p>Игрок 1</p>
                        <div>Х</div>
                    </div>
                </div>
                <div id="game-field" class="game-field">
                    <div class="game-field_cell top-left-cell-radius">
                    </div>
                    <div class="game-field_cell">
                    </div>
                    <div class="game-field_cell top-right-cell-radius">
                    </div>
                    <div class="game-field_cell">
                    </div>
                    <div class="game-field_cell">
                    </div>
                    <div class="game-field_cell">
                    </div>
                    <div class="game-field_cell bottom-left-cell-radius">
                    </div>
                    <div class="game-field_cell">
                    </div>
                    <div class="game-field_cell bottom-right-cell-radius">
                    </div>
                </div>
                <div id="rollback"></div>
                    <div class="current-turn-color_1 background-current-turn-player">
                        <div id="playerTwo" class="players">
                            <p>Игрок 2</p>
                            <div>О</div>
                        </div>
                    </div>
            </div>
            <div id="reset-button">
                <input id="window-reset-button" type="button" class="reset-button" value="Рестарт"/>
            </div>
            <div id="resultWindow">
                <div id="overlay">
                    <div id="modalWindow">
                        <div id="textWindow"></div>
                        <input id="modal-reset-button" type="button" class="reset-button"  value="Реванш"/>
                    </div> 
                </div>
            </div>
            <div id="text"></div>
        `;

    template.content.prepend(await menu());

    return template.content;
};