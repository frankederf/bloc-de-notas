document.addEventListener("DOMContentLoaded", function () {
    const noteArea = document.getElementById("noteArea");
    const saveButton = document.getElementById("saveButton");
    const clearButton = document.getElementById("clearButton");
    const notesList = document.getElementById("notesList");

    // Cargar notas guardadas al iniciar
    function loadNotes() {
        notesList.innerHTML = "";
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.forEach((note, index) => addNoteToDOM(note, index));
    }

    // Guardar nota
    saveButton.addEventListener("click", function () {
        const text = noteArea.value.trim();
        if (text !== "") {
            const notes = JSON.parse(localStorage.getItem("notes")) || [];
            
            // Crear objeto nota con fecha y hora
            const now = new Date();
            const note = {
                text: text,
                timestamp: now.toLocaleString() // ej: "21/08/2025, 11:32:15"
            };

            notes.push(note);
            localStorage.setItem("notes", JSON.stringify(notes));
            addNoteToDOM(note, notes.length - 1);
            noteArea.value = "";
        }
    });

    // Agregar nota a la lista visualmente
    function addNoteToDOM(note, index) {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="note-content">
                <strong>${note.text}</strong><br>
                <small>📅 ${note.timestamp}</small>
            </div>
            <button class="delete-btn" data-index="${index}">❌</button>
        `;
        notesList.appendChild(li);
    }

    // Eliminar una nota individualmente
    notesList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.getAttribute("data-index");
            let notes = JSON.parse(localStorage.getItem("notes")) || [];
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            loadNotes();
        }
    });

    // Borrar todas las notas
    clearButton.addEventListener("click", function () {
        localStorage.removeItem("notes");
        loadNotes();
    });

    // Cargar las notas al iniciar
    loadNotes();
});


