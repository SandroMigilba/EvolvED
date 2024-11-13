const questionsList = [
    "Saya sering merasa bahagia.",
    "Saya merasa kesepian.",
    "Saya mudah marah.",
    "Saya sering tertawa.",
    "Saya merasa cemas tanpa alasan.",
    "Saya puas dengan hidup saya.",
    "Saya sering merasa sedih.",
    "Saya merasa percaya diri.",
    "Saya merasa stres dalam kehidupan sehari-hari.",
    "Saya menikmati waktu bersama teman-teman.",
    "Saya merasa tenang dan damai.",
    "Saya sering merasa frustrasi.",
    "Saya merasa termotivasi untuk mencapai tujuan.",
    "Saya sering merasa tertekan.",
    "Saya mudah merasa tersinggung.",
    "Saya merasa bersyukur atas apa yang saya miliki.",
    "Saya sering merasa tidak berdaya.",
    "Saya senang melakukan hal-hal baru.",
    "Saya sering merasa iri pada orang lain.",
    "Saya merasa nyaman dengan diri saya sendiri.",
    "Saya sering merasa bersalah.",
    "Saya merasa optimis tentang masa depan.",
    "Saya sering merasa lelah tanpa alasan.",
    "Saya menikmati waktu sendirian.",
    "Saya merasa dunia ini tidak adil.",
    "Saya suka membantu orang lain.",
    "Saya sering merasa tegang.",
    "Saya merasa terhubung dengan orang-orang di sekitar saya.",
    "Saya mudah merasa kecewa.",
    "Saya sering merasa penuh energi."
  ];

  function generateQuestions() {
    const questionsContainer = document.getElementById("questions");
    questionsContainer.innerHTML = "";
    questionsList.sort(() => Math.random() - 0.5);

    questionsList.slice(0, 30).forEach((question, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.className = "question-container";
      questionDiv.innerHTML = `
        <div class="question">${index + 1}. ${question}</div>
        <div class="options">
          <label><input type="radio" name="q${index + 1}" value="-2"> Sangat Tidak Setuju</label>
          <label><input type="radio" name="q${index + 1}" value="-1"> Tidak Setuju</label>
          <label><input type="radio" name="q${index + 1}" value="0"> Netral</label>
          <label><input type="radio" name="q${index + 1}" value="1"> Setuju</label>
          <label><input type="radio" name="q${index + 1}" value="2"> Sangat Setuju</label>
        </div>
      `;
      questionsContainer.appendChild(questionDiv);
    });
  }

  function calculateEmotion() {
    const form = document.forms['emotionForm'];
    let emotions = {
      'Sangat Sedih': 0,
      'Sedih': 0,
      'Netral': 0,
      'Bahagia': 0,
      'Sangat Bahagia': 0,
      'Marah': 0
    };

    for (let i = 1; i <= 30; i++) {
      const selected = form['q' + i];
      if (selected) {
        for (let j = 0; j < selected.length; j++) {
          if (selected[j].checked) {
            const value = Math.abs(parseInt(selected[j].value)); // Ubah ke nilai absolut
            if (i <= 5) emotions['Sangat Sedih'] += value;
            else if (i <= 10) emotions['Sedih'] += value;
            else if (i <= 15) emotions['Netral'] += value;
            else if (i <= 20) emotions['Bahagia'] += value;
            else if (i <= 25) emotions['Sangat Bahagia'] += value;
            else emotions['Marah'] += value;
          }
        }
      }
    }

    displayCurrentEmotion(emotions);
    renderChart(emotions);
  }

  function displayCurrentEmotion(emotions) {
    const maxEmotion = Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);
    document.getElementById('result').style.display = 'block';
    document.getElementById('currentEmotion').textContent = maxEmotion;
  }

  function renderChart(emotions) {
    const ctx = document.getElementById('emotionChart').getContext('2d');
    document.getElementById('emotionChart').style.display = 'block';

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(emotions),
        datasets: [{
          label: 'Skor Emosi',
          data: Object.values(emotions),
          backgroundColor: ['#001f3f', '#0074D9', '#2ECC40', '#01FF70', '#FFDC00', '#FF4136']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  window.onload = generateQuestions;