import { Typography } from '@mui/material'
import { DateFilters } from '../../types/plot'

type PlotDateFilterProps = {
  dateFilter: DateFilters
  filterName: DateFilters
  handleDateFilterChange: (selectedDate: DateFilters) => void
}

function PlotDateFilter({
  dateFilter,
  filterName,
  handleDateFilterChange,
}: PlotDateFilterProps) {
  return (
    <Typography
      component="p"
      onClick={() => {
        handleDateFilterChange(filterName)
      }}
      sx={{
        mx: 2,
        cursor: dateFilter === filterName ? 'default' : 'pointer',
        textDecoration: dateFilter === filterName ? 'underline' : '',
      }}
    >
      {filterName}
    </Typography>
  )
}

export default PlotDateFilter
