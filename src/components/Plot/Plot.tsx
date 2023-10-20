import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Record } from '../../types/data'
import { DateFilters } from '../../types/plot'
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
import PlotDateFilter from './PlotDateFilter'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
)

type PlotProps = {
  records: Record[]
}

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
        <PlotDateFilter
          filterName="All"
          dateFilter={dateFilter}
          handleDateFilterChange={handleDateFilterChange}
        />
        <Typography sx={{ cursor: 'default' }} component="p">
          |
        </Typography>
        <PlotDateFilter
          filterName="10y"
          dateFilter={dateFilter}
          handleDateFilterChange={handleDateFilterChange}
        />
        <Typography sx={{ cursor: 'default' }} component="p">
          |
        </Typography>
        <PlotDateFilter
          filterName="2y"
          dateFilter={dateFilter}
          handleDateFilterChange={handleDateFilterChange}
        />
      </Container>
      <Line
        data={{
          datasets: [
            {
              label: 'Net worth data label',
              data,
              borderColor: 'rgb(0, 137, 123)',
              backgroundColor: 'rgba(0, 137, 123, 0.5)',
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
