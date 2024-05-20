

let isDragging = false;
let offsetX, offsetY;

function startDragging(event) {
    const element = event.target;
    const rect = element.getBoundingClientRect();

    // Запазваме офсет координатите на мишката спрямо елемента
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    isDragging = true;

    // Започваме да слушаме за движение на мишката
    document.addEventListener('mousemove', moveElement);
    event.preventDefault();
}

function moveElement(event) {
    if (!isDragging) return;

    // Изчисляваме новите координати на елемента
    const newX = event.clientX - offsetX;
    const newY = event.clientY - offsetY - 16;



    const element = document.getElementById('draggable');
    const draggableElement = element.parentNode.parentNode
    console.log(draggableElement)
    draggableElement.style.left = newX + 'px';
    draggableElement.style.top = newY + 'px';
}

function stopDragging() {
    isDragging = false;

    // Спираме да слушаме за движение на мишката
    document.removeEventListener('mousemove', moveElement);
}

// Добавяме слушател за натискане на мишката върху елемента
document.getElementById('draggable').addEventListener('mousedown', startDragging);

// Добавяме слушател за пускане на мишката в целия документ
document.addEventListener('mouseup', stopDragging);



