let isDragging = false;
let offsetX, offsetY;
let draggableElement = null;

function startDragging(event) {
    event.preventDefault();
    const element = event.target;
    draggableElement = element.closest('#draggable').parentElement;

    const parentRect = draggableElement.getBoundingClientRect();
    offsetX = event.clientX - parentRect.left;
    offsetY = event.clientY - parentRect.top;

    isDragging = true;

    document.addEventListener('mousemove', moveElement);
    document.addEventListener('mouseup', stopDragging);

}

function moveElement(event) {
    event.preventDefault();


    if (!isDragging) return;

    const newX = event.clientX - offsetX - 10;
    const newY = event.clientY - offsetY - 10;

    const parentElement = document.querySelector('main');

    parentElement.style.left = newX + 'px';
    parentElement.style.top = newY + 'px';
}

function stopDragging() {
    if (!isDragging) return;

    isDragging = false;

    document.removeEventListener('mousemove', moveElement);
    document.removeEventListener('mouseup', stopDragging);
}

document.getElementById('draggable').addEventListener('mousedown', startDragging);
