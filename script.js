const container = document.getElementById('emojiContainer');
const searchInput = document.getElementById('searchInput');
const toast = document.getElementById('toast');

// Fungsi untuk mengambil data dari file JSON
async function loadEmojis() {
    try {
        // Mengambil data dari file emojis.json
        const response = await fetch('emoji.json');
        const data = await response.json();
        
        // Karena format emojilib adalah objek, kita ubah jadi array agar mudah diolah
        const emojiArray = Object.keys(data).map(key => {
            return {
                char: key,
                name: data[key].join(" ") // menggabungkan kata kunci menjadi satu teks
            };
        });

        // Tampilkan semua emoji saat pertama kali load
        displayEmojis(emojiArray);

        // Aktifkan fitur pencarian
        searchInput.oninput = (e) => {
            const filtered = emojiArray.filter(emoji => 
                emoji.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            displayEmojis(filtered);
        };

    } catch (error) {
        console.error("Gagal mengambil data emoji:", error);
    }
}

function displayEmojis(emojis) {
    container.innerHTML = "";
    emojis.forEach(emoji => {
        const div = document.createElement('div');
        div.classList.add('emoji-card');
        div.innerText = emoji.char;
        div.onclick = () => {
            navigator.clipboard.writeText(emoji.char);
            showToast();
        };
        container.appendChild(div);
    });
}

function showToast() {
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 1500);
}

// Jalankan fungsi load
loadEmojis();
