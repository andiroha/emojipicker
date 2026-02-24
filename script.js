// Data Emoji sederhana (Nantinya bisa Anda tambah sampai ribuan)
const emojiList = [
    { char: "😀", name: "grinning smile" },
    { char: "😂", name: "joy laugh" },
    { char: "🤣", name: "rofl" },
    { char: "😍", name: "heart eyes love" },
    { char: "🔥", name: "fire hot" },
    { char: "✨", name: "sparkles shine" },
    { char: "👍", name: "thumbs up" },
    { char: "❤️", name: "red heart love" },
    { char: "🚀", name: "rocket ship" },
    { char: "🐱", name: "cat animal" },
    { char: "🍕", name: "pizza food" },
    { char: "🎉", name: "party popper" },
    { char: "🛸", name: "ufo alien space" }
];

const container = document.getElementById('emojiContainer');
const searchInput = document.getElementById('searchInput');
const toast = document.getElementById('toast');

// Fungsi untuk menampilkan Emoji
function displayEmojis(filter = "") {
    container.innerHTML = ""; // Bersihkan kontainer
    
    const filtered = emojiList.filter(emoji => 
        emoji.name.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach(emoji => {
        const div = document.createElement('div');
        div.classList.add('emoji-card');
        div.innerText = emoji.char;
        div.onclick = () => copyToClipboard(emoji.char);
        container.appendChild(div);
    });
}

// Fungsi Salin ke Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    
    // Munculkan notifikasi
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 1500);
}

// Fungsi Pencarian
searchInput.oninput = (e) => {
    displayEmojis(e.target.value);
};

// Jalankan saat pertama kali buka website
displayEmojis();