const container = document.getElementById('emojiContainer');
const searchInput = document.getElementById('searchInput');
const toast = document.getElementById('toast');

async function loadEmojis() {
    try {
        const response = await fetch('emoji.json');
        const data = await response.json();
        
        const emojiArray = Object.keys(data).map(key => {
            return {
                char: key,
                name: data[key].join(" ")
            };
        });

        // KUNCI UTAMA: Jangan panggil displayEmojis() di sini
        // agar halaman awal tetap kosong.

        searchInput.oninput = (e) => {
            const keyword = e.target.value.trim().toLowerCase();
            
            // Logika: Jika kolom kosong, bersihkan kontainer. 
            // Jika ada teks, cari dan tampilkan.
            if (keyword.length > 0) {
                const filtered = emojiArray.filter(emoji => 
                    emoji.name.toLowerCase().includes(keyword)
                );
                displayEmojis(filtered);
            } else {
                container.innerHTML = ""; // Kosongkan jika kolom pencarian dihapus
            }
        };

    } catch (error) {
        console.error("Gagal mengambil data emoji:", error);
    }
}

function displayEmojis(emojis) {
    container.innerHTML = "";
    
    // Opsional: Batasi jumlah hasil pencarian agar tidak terlalu berat (misal 100 emoji pertama)
    const limitedEmojis = emojis.slice(0, 100);

    limitedEmojis.forEach(emoji => {
        const div = document.createElement('div');
        div.classList.add('emoji-card');
        div.innerText = emoji.char;
        div.title = emoji.name; // Munculkan deskripsi saat kursor di atas emoji
        div.onclick = () => {
            navigator.clipboard.writeText(emoji.char);
            showToast();
        };
        container.appendChild(div);
    });

    // Jika tidak ada hasil
    if (emojis.length === 0) {
        container.innerHTML = "<p style='grid-column: 1/-1; color: #888;'>Emoji tidak ditemukan...</p>";
    }
}

function showToast() {
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 1500);
}

loadEmojis();

// Fungsi global agar bisa dipanggil dari HTML onclick
window.filterByCategory = function(category) {
    let searchTerm = category;

    // Jika yang diklik adalah 'object', kita cari beberapa kata kunci benda umum
    if (category === 'object') {
        // Kita bisa arahkan ke kata kunci yang paling banyak di file JSON untuk benda
        searchTerm = "instrument"; // atau 'tool', atau 'box'
    }

    searchInput.value = searchTerm;
    const event = new Event('input', { bubbles: true });
    searchInput.dispatchEvent(event);
}


