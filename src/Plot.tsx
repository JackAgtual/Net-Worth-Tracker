import { useState } from 'react'
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
import { Container, Typography } from '@mui/material'

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

type DateFilters = 'All' | '10y' | '2y'

function Plot({ records }: PlotProps) {
  const [dateFilter, setDateFilter] = useState<DateFilters>('All')

  const handleDateFilterChange = (selectedDate: DateFilters) => {
    setDateFilter(selectedDate)
  }

  const getMinimumDateFromFilter = (): number => {
    const todaySeconds = Date.now() / 1000
    const secondsPerYear = 3600 * 24 * 365

    switch (dateFilter) {
      case 'All':
        return Number.NEGATIVE_INFINITY
      case '10y':
        return todaySeconds - 10 * secondsPerYear
      case '2y':
        return todaySeconds - 2 * secondsPerYear
    }
  }

  const minimumDateSeconds = getMinimumDateFromFilter()

  const data = [...records]
    .sort((a, b) => a.date.seconds - b.date.seconds)
    .filter((record) => {
      return record.date.seconds >= minimumDateSeconds
    })
    .map((record) => {
      return {
        x: new Date(record.displayDate),
        y: record.netWorth,
      }
    })

  return (
    <>
      <Container
        sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
      >
        <Typography
          component="p"
          onClick={() => {
            handleDateFilterChange('All')
          }}
          sx={{
            mx: 2,
            cursor: dateFilter === 'All' ? 'default' : 'pointer',
            textDecoration: dateFilter === 'All' ? 'underline' : '',
          }}
        >
          All
        </Typography>
        <Typography sx={{ cursor: 'default' }} component="p">
          |
        </Typography>
        <Typography
          component="p"
          onClick={() => {
            handleDateFilterChange('10y')
          }}
          sx={{
            mx: 2,
            cursor: dateFilter === '10y' ? 'default' : 'pointer',
            textDecoration: dateFilter === '10y' ? 'underline' : '',
          }}
        >
          10y
        </Typography>
        <Typography sx={{ cursor: 'default' }} component="p">
          |
        </Typography>
        <Typography
          component="p"
          onClick={() => {
            handleDateFilterChange('2y')
          }}
          sx={{
            mx: 2,
            cursor: dateFilter === '2y' ? 'default' : 'pointer',
            textDecoration: dateFilter === '2y' ? 'underline' : '',
          }}
        >
          2y
        </Typography>
      </Container>
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
    </>
  )
}

export default Plot
