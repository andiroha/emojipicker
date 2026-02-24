const container = document.getElementById('emojiContainer');
const searchInput = document.getElementById('searchInput');
const toast = document.getElementById('toast');
let allEmojis = [];

async function loadEmojis() {
    try {
        // Corrected filename to emoji.json
        const response = await fetch('emoji.json');
        const data = await response.json();
        
        // Convert JSON object/data to a searchable array
        allEmojis = Object.keys(data).map(key => ({
            char: key,
            name: data[key].join(" ")
        }));

        // Search Input Logic
        searchInput.oninput = (e) => {
            const keyword = e.target.value.trim().toLowerCase();
            if (keyword.length > 0) {
                const filtered = allEmojis.filter(emoji => 
                    emoji.name.includes(keyword)
                );
                displayEmojis(filtered);
            } else {
                container.innerHTML = "";
            }
        };

    } catch (error) {
        console.error("Error loading emoji database:", error);
    }
}

function displayEmojis(emojis) {
    container.innerHTML = "";
    // Performance optimization: display first 200 results
    const limitedEmojis = emojis.slice(0, 200);

    limitedEmojis.forEach(emoji => {
        const div = document.createElement('div');
        div.classList.add('emoji-card');
        div.innerText = emoji.char;
        div.onclick = () => {
            navigator.clipboard.writeText(emoji.char);
            showToast();
        };
        container.appendChild(div);
    });

    if (emojis.length === 0) {
        container.innerHTML = "<p style='grid-column: 1/-1; color: #888;'>No emojis matched your search.</p>";
    }
}

// Category button function
window.filterByCategory = function(category) {
    searchInput.value = category;
    const event = new Event('input', { bubbles: true });
    searchInput.dispatchEvent(event);
}

function showToast() {
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
}

// Start the app
loadEmojis();
