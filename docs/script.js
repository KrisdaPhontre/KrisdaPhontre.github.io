    function createConfetti() {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
      confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
      document.body.appendChild(confetti);

      // ลบ confetti หลังจากตกลงมา
      setTimeout(() => confetti.remove(), 5000);
    }

    setInterval(createConfetti, 200);

    // เพิ่มเสียงเมื่อกดปุ่ม
    document.getElementById('revealMessage').addEventListener('click', function () {
      const surprise = document.getElementById('surprise');
      const audio = new Audio('surprise-sound.mp3'); // เสียงเซอร์ไพรส์
      audio.play();

      if (surprise.classList.contains('hidden')) {
        surprise.classList.remove('hidden');
      } else {
        surprise.classList.add('hidden');
      }
    });