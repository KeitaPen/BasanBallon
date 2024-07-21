document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const taskName = document.getElementById('task-name').value;
    const taskDeadline = document.getElementById('task-deadline').value;

    if (new Date(taskDeadline) <= new Date()) {
        alert('締め切りは現在の時刻よりも後に設定してください。');
        return;
    }
    
    addTask(taskName, taskDeadline);
    
    document.getElementById('task-name').value = '';
    document.getElementById('task-deadline').value = '';
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function calculateBalloonSize(taskDeadline) {
    const timeDiff = new Date(taskDeadline) - new Date();
    const hoursLeft = Math.ceil(timeDiff / (1000 * 60 * 60));
    const minBalloonSize = 100;
    const maxBalloonSize = 400;
    const balloonSize = Math.min(maxBalloonSize, minBalloonSize + (maxBalloonSize - minBalloonSize) * (1 - hoursLeft / (24 * 7)));
    return Math.max(minBalloonSize, balloonSize);
}

function formatTimeLeft(timeDiff) {
    const totalSeconds = Math.floor(timeDiff / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function addTask(taskName, taskDeadline) {
    const balloonContainer = document.getElementById('balloon-container');
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    
    const taskNameElement = document.createElement('div');
    taskNameElement.classList.add('task-name');
    taskNameElement.textContent = taskName;
    
    const deadlineElement = document.createElement('div');
    deadlineElement.classList.add('deadline');
    deadlineElement.textContent = new Date(taskDeadline).toLocaleString();
    
    const timeLeftElement = document.createElement('div');
    timeLeftElement.classList.add('time-left');
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'X';
    deleteButton.title = 'タスクを削除する';  // Added tooltip
    deleteButton.addEventListener('click', function() {
        balloonContainer.removeChild(balloon);
    });

    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-button');
    completeButton.textContent = '✔';
    completeButton.title = 'タスクを完了する';  // Added tooltip
    completeButton.addEventListener('click', function() {
        balloon.style.animation = 'explode 0.5s forwards';
        balloon.addEventListener('animationend', function() {
            balloonContainer.removeChild(balloon);
        });
    });
    
    balloon.appendChild(taskNameElement);
    balloon.appendChild(deadlineElement);
    balloon.appendChild(timeLeftElement);
    balloon.appendChild(deleteButton);
    balloon.appendChild(completeButton);
    balloonContainer.appendChild(balloon);

    // Set the initial color
    const balloonColor = getRandomColor();
    balloon.style.backgroundColor = balloonColor;

    function updateTask() {
        updateBalloonSize(balloon, taskNameElement, deadlineElement, timeLeftElement, taskDeadline, deleteButton, completeButton);
        const timeDiff = new Date(taskDeadline) - new Date();
        if (timeDiff <= 0) {
            timeLeftElement.textContent = 'Time is up!';
        } else {
            timeLeftElement.textContent = formatTimeLeft(timeDiff);
        }
    }

    updateTask();
    setInterval(updateTask, 1000);
}

function updateBalloonSize(balloon, taskNameElement, deadlineElement, timeLeftElement, taskDeadline, deleteButton, completeButton) {
    const balloonSize = calculateBalloonSize(taskDeadline);
    balloon.style.width = balloonSize + 'px';
    balloon.style.height = balloonSize + 'px';

    const fontSize = balloonSize / 12; // タスク名の文字サイズを少し小さくする
    taskNameElement.style.fontSize = fontSize * 1.5 + 'px'; // 小さめに設定
    taskNameElement.style.top = (balloonSize * 0.3) + 'px'; // 中央に寄せる
    deadlineElement.style.fontSize = fontSize + 'px';
    deadlineElement.style.top = (balloonSize * 0.5) + 'px';
    timeLeftElement.style.fontSize = fontSize + 'px';
    timeLeftElement.style.top = (balloonSize * 0.7) + 'px'; // 中央に寄せる

    // ボタンサイズと位置を風船サイズに応じて動的に変更
    const buttonSize = Math.max(20, balloonSize * 0.15); // 最小サイズを設定
    deleteButton.style.width = buttonSize + 'px';
    deleteButton.style.height = buttonSize + 'px';
    deleteButton.style.fontSize = buttonSize * 0.5 + 'px';
    deleteButton.style.top = balloonSize * 0.8 + 'px';
    deleteButton.style.left = balloonSize * 0.2 + 'px';

    completeButton.style.width = buttonSize + 'px';
    completeButton.style.height = buttonSize + 'px';
    completeButton.style.fontSize = buttonSize * 0.5 + 'px';
    completeButton.style.top = balloonSize * 0.8 + 'px';
    completeButton.style.right = balloonSize * 0.2 + 'px';
}
