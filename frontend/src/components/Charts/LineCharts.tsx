import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"
import { mockTickerData } from "../../Data/mockData"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function LineChart() {
    const labels = mockTickerData.history.map(item => item.time)
    const data = {
        labels,
        datasets: [
            {
                label: mockTickerData.symbol,
                data: mockTickerData.history.map(item => item.price),
                borderColor: "rgba(34,197,94,1)", // Tailwind green-500
                backgroundColor: "rgba(34,197,94,0.2)",
                tension: 0.3
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true },
            tooltip: { enabled: true }
        },
        scales: {
            y: { beginAtZero: false },
            x: { grid: { display: false } }
        }
    }

    return <Line data={data} options={options} />
}
