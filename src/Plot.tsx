import { Line } from 'react-chartjs-2'
import { Record } from './types/data'
import 'chartjs-adapter-date-fns'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)

type PlotProps = {
  records: Record[]
}

function Plot({ records }: PlotProps) {
  const data = [...records]
    .sort((a, b) => a.date.seconds - b.date.seconds)
    .map((record) => {
      return {
        x: new Date(record.displayDate),
        y: record.netWorth,
      }
    })

  return (
    <Line
      data={{
        datasets: [
          {
            label: 'Net worth data label',
            data,
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
        scales: {
          x: {
            type: 'time', // TODO: Fix tooltip format
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Net Worth',
            },
          },
        },
      }}
    ></Line>
  )
}

export default Plot
