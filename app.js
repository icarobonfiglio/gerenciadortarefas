document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const input = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value.trim()) {
            addTaskWithLocation(input.value.trim());
            input.value = '';
        }
    });

    function addTaskWithLocation(taskText) {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                addTask(taskText, lat, lon);
            }, () => {
                addTask(taskText);
            });
        } else {
            addTask(taskText);
        }
    }

    function addTask(taskText, lat, lon) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${taskText}
            ${lat && lon ? `<small>(${lat.toFixed(2)}, ${lon.toFixed(2)})</small>` : ''}
            <button onclick="this.parentElement.remove()">Remover</button>
        `;
        taskList.appendChild(li);
    }
});