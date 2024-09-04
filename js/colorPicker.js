// colorPicker.js

export function initializeColorPicker(colorSelector, editButton) {
    for(let i = 0; i < 10; i++) {
        const input = document.createElement('input');
        input.classList.add('color');
        input.setAttribute('type', 'color');
        input.value = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        colorSelector.appendChild(input);
    }

    let selectedColor = "#000000";
    document.querySelector('.selected-color-text').innerText = selectedColor

    colorSelector.addEventListener('click', (e) => {
        if (!e.target.classList.contains('color')) return;
        if (!e.target.classList.contains('editable')) {
            e.preventDefault();
            const child = e.target.parentElement.childNodes
            for(let i = 0; i < child.length; i++) {
                child[i].classList.remove("color-selected")
            }
            e.target.classList.add("color-selected")
        }
        selectedColor = e.target.value;
        document.querySelector('.selected-color-text').innerText = selectedColor
    });

    editButton.addEventListener('click', () => {
        const colorInputs = document.querySelectorAll('.color');
        colorInputs.forEach(input => {
            input.classList.toggle('editable');
        });
        console.log(editButton)
        if (editButton.classList.contains('editando')) {
            editButton.innerText = "Editar colores"
        } else {
            editButton.innerText = "Seleccionar colores"
        }
        editButton.classList.toggle('editando');
    });

    return {
        getSelectedColor: () => selectedColor
    };
}
