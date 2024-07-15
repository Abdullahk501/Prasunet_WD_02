document.addEventListener('DOMContentLoaded', function() {
  const timeDisplay = document.getElementById('time');
  const startButton = document.getElementById('start');
  const pauseButton = document.getElementById('pause');
  const resetButton = document.getElementById('reset');
  const lapButton = document.getElementById('lap');
  const lapTimes = document.getElementById('lap-times');

  let startTime;
  let elapsedTime = 0;
  let timerInterval;
  let running = false;

  function updateTime() {
      const now = Date.now();
      const diff = now - startTime + elapsedTime;
      const milliseconds = diff % 1000;
      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

      timeDisplay.textContent = 
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
  }

  function start() {
      if (!running) {
          running = true;
          startTime = Date.now();
          timerInterval = setInterval(updateTime, 10);
      }
  }

  function pause() {
      if (running) {
          running = false;
          elapsedTime += Date.now() - startTime;
          clearInterval(timerInterval);
      }
  }

  function reset() {
      running = false;
      clearInterval(timerInterval);
      elapsedTime = 0;
      timeDisplay.textContent = "00:00:00.000";
      lapTimes.innerHTML = '';
  }

  function lap() {
      if (running) {
          const lapTime = document.createElement('li');
          lapTime.textContent = timeDisplay.textContent;
          lapTimes.appendChild(lapTime);
      }
  }

  startButton.addEventListener('click', start);
  pauseButton.addEventListener('click', pause);
  resetButton.addEventListener('click', reset);
  lapButton.addEventListener('click', lap);
});