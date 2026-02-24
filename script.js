// Data Emoji sederhana (Nantinya bisa Anda tambah sampai ribuan)
const emojiList = [
    // SMILEYS & PEOPLE
    { char: "😀", name: "grinning face happy" },
    { char: "😃", name: "smiley face big eyes" },
    { char: "😄", name: "smile laughing" },
    { char: "😁", name: "grin beaming" },
    { char: "😆", name: "satisfied squint" },
    { char: "😅", name: "sweat smile relief" },
    { char: "🤣", name: "rofl rolling on the floor laughing" },
    { char: "😂", name: "joy tears of joy" },
    { char: "🙂", name: "slightly smiling" },
    { char: "🙃", name: "upside down" },
    { char: "😉", name: "wink" },
    { char: "😊", name: "blush" },
    { char: "😇", name: "innocent halo" },
    { char: "🥰", name: "smiling face with hearts love" },
    { char: "😍", name: "heart eyes love" },
    { char: "🤩", name: "star struck" },
    { char: "😘", name: "kissing heart blow a kiss" },
    { char: "😗", name: "kissing face" },
    { char: "😚", name: "kissing closed eyes" },
    { char: "😋", name: "yum tongue" },
    { char: "😛", name: "stuck out tongue" },
    { char: "😜", name: "winking tongue" },
    { char: "🤪", name: "zany goofy" },
    { char: "🤨", name: "raised eyebrow" },
    { char: "🧐", name: "monocle" },
    { char: "🤓", name: "nerd geek" },
    { char: "😎", name: "sunglasses cool" },
    { char: "🥳", name: "partying face celebration" },
    { char: "😏", name: "smirk" },
    { char: "😒", name: "unamused" },
    { char: "🙄", name: "eye roll" },
    { char: "😬", name: "grimacing" },
    { char: "🤥", name: "lying face pinocchio" },
    { char: "😌", name: "relieved" },
    { char: "😔", name: "pensive" },
    { char: "😪", name: "sleepy" },
    { char: "🤤", name: "drooling" },
    { char: "😴", name: "sleeping" },
    { char: "😷", name: "mask" },
    { char: "🤒", name: "thermometer sick" },
    { char: "🤢", name: "nauseated puke" },
    { char: "🤮", name: "vomiting" },
    { char: "🥵", name: "hot overheated" },
    { char: "🥶", name: "cold frozen" },
    { char: "🥴", name: "woozy tipsy" },
    { char: "😵", name: "dizzy" },
    { char: "🤯", name: "exploding head mind blown" },
    { char: "🤠", name: "cowboy" },
    { char: "🥳", name: "party" },
    { char: "😎", name: "cool" },
    { char: "😭", name: "loudly crying sob" },
    { char: "😱", name: "scream fear" },
    { char: "💀", name: "skull dead" },
    { char: "👻", name: "ghost" },
    { char: "👽", name: "alien" },
    { char: "🤖", name: "robot" },
    { char: "💩", name: "poop" },
    
    // HEARTS & SYMBOLS
    { char: "❤️", name: "red heart love" },
    { char: "🧡", name: "orange heart" },
    { char: "💛", name: "yellow heart" },
    { char: "💚", name: "green heart" },
    { char: "💙", name: "blue heart" },
    { char: "💜", name: "purple heart" },
    { char: "🖤", name: "black heart" },
    { char: "🤍", name: "white heart" },
    { char: "🤎", name: "brown heart" },
    { char: "💔", name: "broken heart" },
    { char: "❣️", name: "heart exclamation" },
    { char: "💕", name: "two hearts" },
    { char: "✨", name: "sparkles shine" },
    { char: "🔥", name: "fire hot lit" },
    { char: "💥", name: "collision explosion" },
    { char: "💯", name: "hundred points perfect" },
    { char: "💢", name: "anger symbol" },
    { char: "💨", name: "dash fast" },
    { char: "💦", name: "sweat droplets" },
    { char: "💤", name: "zzz sleep" },

    // GESTURES
    { char: "👍", name: "thumbs up" },
    { char: "👎", name: "thumbs down" },
    { char: "👊", name: "oncoming fist" },
    { char: "✌️", name: "victory peace hand" },
    { char: "👌", name: "ok hand" },
    { char: "🤞", name: "fingers crossed" },
    { char: "🤘", name: "rock on metal" },
    { char: "🤙", name: "call me" },
    { char: "✋", name: "raised hand" },
    { char: "🙏", name: "pray please thanks" },
    { char: "🤝", name: "handshake" },
    { char: "👏", name: "clapping hands" },
    { char: "💪", name: "flexed biceps muscle" },

    // OBJECTS & OTHERS
    { char: "🚀", name: "rocket ship space" },
    { char: "📱", name: "iphone smartphone mobile" },
    { char: "💻", name: "laptop computer" },
    { char: "💰", name: "money bag cash" },
    { char: "💎", name: "gem stone diamond" },
    { char: "🌈", name: "rainbow" },
    { char: "☀️", name: "sun sunny weather" },
    { char: "🌙", name: "moon night" },
    { char: "⭐", name: "star" },
    { char: "🍀", name: "clover lucky" },
    { char: "🗿", name: "moai stone head" }
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
