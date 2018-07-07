/* global Chart, data */

Chart.defaults.global.defaultFontFamily = 'Open Sans';
Chart.defaults.global.legend.display = false;

const createChart = () => {
  const chart = new Chart(document.getElementById('chart'), {
    type: 'horizontalBar',
    data: {
      labels: ['Shakl', 'Emotion', 'Glamorous Native', 'Styled Components'],
      datasets: [
        {
          data,
          backgroundColor: [
            'rgba(40, 167, 69, 0.2)',
            'rgba(0, 92, 197, 0.2)',
            'rgba(111, 66, 193, 0.2)',
            'rgba(215, 58, 73, 0.2)'
          ],
          borderColor: [
            'rgb(40, 167, 69)',
            'rgb(0, 92, 197)',
            'rgb(111, 66, 193)',
            'rgb(215, 58, 73)'
          ],
          borderWidth: 1
        }
      ]
    }
  });

  return chart;
};

createChart();
