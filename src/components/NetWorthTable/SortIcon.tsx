import { IconButton } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { SortOptions } from './NetWorthTable'

const sortButtonShownStyle = {}
const sortButtonHiddenStyle = { opacity: 0, '&:hover': { opacity: 1 } }

type SortIconProps = {
  sortedDataCategory: SortOptions
  sortAscending: boolean
  sortByDateOrNetWorth: SortOptions
  setSortAscending: React.Dispatch<React.SetStateAction<boolean>>
  setSortByDateOrNetWorth: React.Dispatch<React.SetStateAction<SortOptions>>
}

function SortIcon({
  sortedDataCategory,
  sortAscending,
  sortByDateOrNetWorth,
  setSortAscending,
  setSortByDateOrNetWorth,
}: SortIconProps) {
  const handleSortChange = (sortBy: SortOptions) => {
    if (sortBy === sortByDateOrNetWorth) {
      setSortAscending((prevSortAscending) => !prevSortAscending)
    } else {
      setSortByDateOrNetWorth(sortBy)
      setSortAscending(true)
    }
  }

  return (
    <IconButton
      onClick={() => handleSortChange(sortedDataCategory)}
      sx={
        sortByDateOrNetWorth === sortedDataCategory
          ? sortButtonShownStyle
          : sortButtonHiddenStyle
      }
    >
      {sortByDateOrNetWorth !== sortedDataCategory || sortAscending ? (
        <ArrowUpwardIcon />
      ) : (
        <ArrowDownwardIcon />
      )}
    </IconButton>
  )
}

export default SortIcon
