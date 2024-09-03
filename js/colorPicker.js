// colorPicker.js

export function initializeColorPicker(colorSelector, editButton) {
    for(let i = 0; i < 10; i++) {
        const input = document.createElement('input');
        input.classList.add('color');
        input.setAttribute('type', 'color');
        input.value = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        colorSelector.appendChild(input);
    }

    let selectedColor = colorSelector.children[0].value;

    colorSelector.addEventListener('click', (e) => {
        if (!e.target.classList.contains('color')) return;
        if (!e.target.classList.contains('editable')) {
            e.preventDefault();
            selectedColor = e.target.value;
        }
    });

    editButton.addEventListener('click', () => {
        const colorInputs = document.querySelectorAll('.color');
        colorInputs.forEach(input => {
            input.classList.toggle('editable');
        });
    });

    return {
        getSelectedColor: () => selectedColor
    };
}
