// Timer variables
let sessionTime = 25;
let breakTime = 5;
let remainingMinutes = sessionTime;
let seconds = 0;
let timer;
let isRunning = false;
let isSession = true;

function formatTime(mins, secs) {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    document.getElementById('minutes').innerHTML = formatTime(remainingMinutes, seconds).split(':')[0];
    document.getElementById('seconds').innerHTML = formatTime(remainingMinutes, seconds).split(':')[1];
    document.getElementById('time-left').classList.add('active-timer');
    
    const sessionLabel = document.getElementById('session-label');
    const breakLabel = document.getElementById('break-label');
    
    if (isSession) {
        sessionLabel.style.color = 'var(--clr-ring)';
        breakLabel.style.color = 'var(--clr-text)'; // or set to a default color if needed
    } else {
        sessionLabel.style.color = 'var(--clr-text)'; // or set to a default color if needed
        breakLabel.style.color = 'var(--clr-ring)';
    }
}


function startTimer() {
    timer = setInterval(() => {
        if (seconds === 0) {
            if (remainingMinutes === 0) {
                if (isSession) {
                    remainingMinutes = breakTime;
                } else {
                    remainingMinutes = sessionTime;
                }
                isSession = !isSession;
            } else {
                remainingMinutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
        updateDisplay();
    }, 1000);
}

// Timer controls
// Timer controls
document.getElementById('start_stop').addEventListener('click', function() {
    const icon = this.querySelector('i');
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        // Change icon to play
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    } else {
        startTimer();
        isRunning = true;
        // Change icon to pause
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    // Reset session and break times to default values
    sessionTime = 25;
    breakTime = 5;
    remainingMinutes = sessionTime;
    seconds = 0;
    updateDisplay();
    // Reset icon to play
    const icon = document.getElementById('start_stop').querySelector('i');
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
});


// Toggling the popup menu
let tempSessionTime = sessionTime;
let tempBreakTime = breakTime;

document.getElementById('mini-display').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('popup-menu').classList.toggle('active');
    
    // Store current values when menu is opened
    if (document.getElementById('popup-menu').classList.contains('active')) {
        tempSessionTime = sessionTime;
        tempBreakTime = breakTime;
        updatePopupDisplay();
    }
});

// Popup menu variables
const sessionMinus = document.getElementById('session-decrement');
const sessionPlus = document.getElementById('session-increment');
const breakMinus = document.getElementById('break-decrement');
const breakPlus = document.getElementById('break-increment');
const saveChanges = document.getElementById('save-changes');
const cancelChanges = document.getElementById('cancel-changes');
const popupMenu = document.getElementById('popup-menu');

function updatePopupDisplay() {
    document.getElementById('session-length').textContent = tempSessionTime;
    document.getElementById('break-length').textContent = tempBreakTime;
}

// Decrement and increment logic
sessionMinus.addEventListener('click', () => {
    if (tempSessionTime > 1) {
        tempSessionTime--;
        updatePopupDisplay();
    }
});

sessionPlus.addEventListener('click', () => {
    if (tempSessionTime < 60) {
        tempSessionTime++;
        updatePopupDisplay();
    }
});

breakMinus.addEventListener('click', () => {
    if (tempBreakTime > 1) {
        tempBreakTime--;
        updatePopupDisplay();
    }
});

breakPlus.addEventListener('click', () => {
    if (tempBreakTime < 60) {
        tempBreakTime++;
        updatePopupDisplay();
    }
});

// Save Changes button
saveChanges.addEventListener('click', function() {
    sessionTime = tempSessionTime;
    breakTime = tempBreakTime;
    remainingMinutes = sessionTime;
    seconds = 0;
    updateDisplay();
    document.getElementById('start_stop').classList.add('play');
    document.getElementById('start_stop').classList.remove('pause');
    isRunning = false;
    isSession = true;
    // Hide the popup menu
    document.getElementById('mini-display').classList.remove('active');
    document.getElementById('popup-menu').classList.remove('active');
});

// Cancel button
cancelChanges.addEventListener('click', () => {
    // Revert to stored values
    tempSessionTime = sessionTime;
    tempBreakTime = breakTime;
    updatePopupDisplay();
    // Hide the popup menu
    document.getElementById('mini-display').classList.remove('active');
    document.getElementById('popup-menu').classList.remove('active');
});

// Theme management
const colorThemes = document.querySelectorAll('[name="theme"]');

const storeTheme = function (theme) {
    localStorage.setItem("theme", theme);
};

const retrieveTheme = function () {
    const activeTheme = localStorage.getItem("theme");
    colorThemes.forEach((themeOption) => {
        if (themeOption.id === activeTheme) {
            themeOption.checked = true;
        }
    });
};

colorThemes.forEach((themeOption) => {
    themeOption.addEventListener("click", () => {
        storeTheme(themeOption.id);
    });
});

window.onload = retrieveTheme;
