const words = ["CLOUD", "GHOST", "LIGHT", "BRAIN", "SPACE", "HEART"];
let targetWord = words[Math.floor(Math.random() * words.length)];
document.getElementById('targetWord').innerText = targetWord;

const thumb = document.getElementById('thumb');
const track = document.getElementById('track');
const msg = document.getElementById('statusMsg');

let isDragging = false;
let startX = 0;
let yTrace = [];

const isBot = () => navigator.webdriver;

thumb.onmousedown = (e) => {
    if (thumb.classList.contains('locked')) return;
    isDragging = true;
    startX = e.pageX - thumb.offsetLeft;
    thumb.style.transition = 'none';
};

window.onmousemove = (e) => {
    if (!isDragging) return;
    const limit = track.offsetWidth - thumb.offsetWidth - 10;
    let x = e.pageX - startX;
    if (x < 5) x = 5;
    if (x > limit) x = limit;
    thumb.style.left = x + 'px';
    yTrace.push(e.pageY);

    if (x >= limit - 1) {
        isDragging = false;
        const uniqueY = new Set(yTrace).size;
        if (isBot() || uniqueY < 3) {
            fail(1, "Bot detected");
        } else {
            success(1, "Verified");
            thumb.innerHTML = "✓";
            thumb.classList.add('success-ui', 'locked');
        }
    }
};

window.onmouseup = () => {
    if (!isDragging) return;
    isDragging = false;
    thumb.style.transition = 'left 0.4s cubic-bezier(0.19, 1, 0.22, 1)';
    thumb.style.left = '5px';
};

document.getElementById('checkCard').onclick = function() {
    if (this.classList.contains('locked')) return;
    const spin = document.getElementById('spinner');
    const icon = document.getElementById('checkIcon');
    spin.style.display = 'block';
    
    setTimeout(() => {
        spin.style.display = 'none';
        if (isBot()) {
            fail(2, "Environment error");
        } else {
            icon.style.display = 'block';
            document.getElementById('checkBox').classList.add('success-ui');
            success(2, "Identity confirmed");
            this.classList.add('locked');
        }
    }, 1200);
};

const cells = document.querySelectorAll('.cell');
cells.forEach((cell, idx) => {
    cell.oninput = (e) => {
        if (e.target.value.length === 1 && idx < cells.length - 1) {
            cells[idx + 1].focus();
        }
        checkCells();
    };
    cell.onkeydown = (e) => {
        if (e.key === "Backspace" && !e.target.value && idx > 0) {
            cells[idx - 1].focus();
        }
    };
});

function checkCells() {
    const result = Array.from(cells).map(c => c.value).join("").toUpperCase();
    if (result === targetWord) {
        cells.forEach(c => {
            c.classList.add('success-ui');
            c.disabled = true;
        });
        success(3, "Word matched");
    }
}

const sBtn = document.getElementById('smartBtn');
sBtn.onmousedown = () => sBtn.t = Date.now();
sBtn.onmouseup = () => {
    const d = Date.now() - sBtn.t;
    if (d > 150 && d < 600 && !isBot()) {
        sBtn.classList.add('success-ui');
        sBtn.innerText = 'VERIFIED';
        success(4, "Session secured");
    } else {
        fail(4, "Hold longer");
    }
};

function success(id, txt) {
    msg.innerText = txt;
    msg.style.color = "var(--success)";
    document.getElementById('row' + id).classList.add('done-row');
}

function fail(id, txt) {
    msg.innerText = txt;
    msg.style.color = "var(--error)";
}

document.addEventListener('keydown', (e) => {
    if (e.keyCode === 123 || (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83 || e.keyCode === 67)) || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
        e.preventDefault();
        return false;
    }
});

document.addEventListener('copy', (e) => {
    e.clipboardData.setData('text/plain', 'Access Denied');
    e.preventDefault();
});