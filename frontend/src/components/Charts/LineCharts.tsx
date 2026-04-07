import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function LineCharts({ ticker, history }: { ticker: any, history: any[] }) {
    if (!ticker || !history || history.length === 0) return null;
    const isPositive = ticker.change >= 0;

    const data = {
        labels: history.map((item: any) => item.time),
        datasets: [
            {
                label: `${ticker.symbol} Price`,
                data: history.map((item: any) => item.price),
                fill: true,
                borderColor: isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)",
                backgroundColor: isPositive ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
                tension: 0.2,
                pointRadius: 0,
                pointHoverRadius: 6,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
            },
        },
        scales: {
            y: {
                grid: { color: "rgba(0, 0, 0, 0.05)" },
                ticks: { maxTicksLimit: 5 }
            },
            x: {
                display: false, 
                grid: { display: false },
            },
        },
    };

    return <Line data={data} options={options} />;
}