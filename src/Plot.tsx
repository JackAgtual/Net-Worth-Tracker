import { Line } from 'react-chartjs-2'
import { Record } from './types/data'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type PlotProps = {
  records: Record[]
}

function Plot({ records }: PlotProps) {
  const labels = [...records]
    .sort((a, b) => a.date.seconds - b.date.seconds)
    .map((record) => record.displayDate)
  const data = [...records]
    .sort((a, b) => a.date.seconds - b.date.seconds)
    .map((record) => record.netWorth)

  return (
    <Line
      data={{
        labels: labels,
        datasets: [
          {
            data: data,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    ></Line>
  )
}

export default Plot
