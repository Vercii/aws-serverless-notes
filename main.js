const API_URL = "https://42f1yndawg.execute-api.us-east-1.amazonaws.com";

const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesList = document.getElementById("notesList");

// Load notes from backend
async function loadNotes() {
    try {
        const res = await fetch(`${API_URL}/notes`);
        const data = await res.json();

        notesList.innerHTML = "";
        data.forEach(note => {
            const li = document.createElement("li");
            li.textContent = note.text;

            const delBtn = document.createElement("button");
            delBtn.textContent = "Delete";
            delBtn.onclick = () => deleteNote(note.id);

            li.appendChild(delBtn);
            notesList.appendChild(li);
        });
    } catch (err) {
        console.error("Error loading notes:", err);
    }
}

// Add a note
async function addNote() {
    const text = noteInput.value.trim();
    if (!text) return;

    try {
        await fetch(`${API_URL}/notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });
        noteInput.value = "";
        loadNotes();
    } catch (err) {
        console.error("Error adding note:", err);
    }
}

// Delete a note
async function deleteNote(id) {
    try {
        await fetch(`${API_URL}/notes?id=${id}`, {
            method: "DELETE"
        });
        loadNotes();
    } catch (err) {
        console.error("Error deleting note:", err);
    }
}

// Event listeners
addBtn.addEventListener("click", addNote);
noteInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addNote();
});

// Initial load
loadNotes();
