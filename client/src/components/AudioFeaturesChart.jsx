import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function AudioFeaturesChart({ features }) {
  if (!features) return null;

  const data = {
    labels: [
      "Danceability",
      "Energy",
      "Speechiness",
      "Acousticness",
      "Instrumentalness",
      "Liveness",
      "Valence",
    ],
    datasets: [
      {
        label: "Audio Features",
        data: [
          features.danceability || 0,
          features.energy || 0,
          features.speechiness || 0,
          features.acousticness || 0,
          features.instrumentalness || 0,
          features.liveness || 0,
          features.valence || 0,
        ],
        backgroundColor: "rgba(29, 185, 84, 0.2)",
        borderColor: "#1db954",
        borderWidth: 2,
        pointBackgroundColor: "#1db954",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#1db954",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        pointLabels: {
          color: "#ffffff",
          font: {
            size: 12,
          },
        },
        ticks: {
          color: "#9b9b9b",
          backdropColor: "transparent",
          stepSize: 0.2,
        },
        suggestedMin: 0,
        suggestedMax: 1,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        padding: 10,
        displayColors: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-[400px]">
      <Radar data={data} options={options} />
    </div>
  );
}

export default AudioFeaturesChart;
