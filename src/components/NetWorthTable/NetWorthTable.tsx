import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Box,
  IconButton,
} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Record } from '../../types/data'
import NetWorthTableRow from './NetWorthTableRow'

const sortButtonShownStyle = {}
const sortButtonHiddenStyle = { opacity: 0, '&:hover': { opacity: 1 } }

type SortOptions = 'date' | 'netWorth'

type NetWorthTableProps = {
  records: Record[]
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>
}

function NetWorthTable({ records, setRecords }: NetWorthTableProps) {
  const [sortByDateOrNetWorth, setSortByDateOrNetWorth] = useState<SortOptions>('date')
  const [sortAscending, setSortAscending] = useState(true)

  const handleSortChange = (sortBy: SortOptions) => {
    if (sortBy === sortByDateOrNetWorth) {
      setSortAscending((prevSortAscending) => !prevSortAscending)
    } else {
      setSortByDateOrNetWorth(sortBy)
      setSortAscending(true)
    }
  }

  useEffect(() => {
    console.log({ sortByDateOrNetWorth, sortAscending, records })
    const ascendingMult = sortAscending ? 1 : -1
    if (sortByDateOrNetWorth === 'date') {
      setRecords((prevRecords) =>
        [...prevRecords].sort((a, b) => ascendingMult * (a.date.seconds - b.date.seconds))
      )
    } else {
      setRecords((prevRecords) =>
        [...prevRecords].sort((a, b) => ascendingMult * (a.netWorth - b.netWorth))
      )
    }
  }, [sortByDateOrNetWorth, sortAscending])

  return (
    <>
      <Typography component="h1" variant="h3">
        Net Worth
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
              >
                <IconButton
                  onClick={() => handleSortChange('date')}
                  sx={
                    sortByDateOrNetWorth === 'date'
                      ? sortButtonShownStyle
                      : sortButtonHiddenStyle
                  }
                >
                  {sortByDateOrNetWorth !== 'date' || sortAscending ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  )}
                </IconButton>
                <Typography variant="subtitle1" component="h6">
                  Date
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="right">
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
              >
                <IconButton
                  onClick={() => handleSortChange('netWorth')}
                  sx={
                    sortByDateOrNetWorth === 'netWorth'
                      ? sortButtonShownStyle
                      : sortButtonHiddenStyle
                  }
                >
                  {sortByDateOrNetWorth !== 'netWorth' || sortAscending ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  )}
                </IconButton>
                <Typography variant="subtitle1" component="h6">
                  Net Worth
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => {
            return <NetWorthTableRow key={record.id} record={record} />
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default NetWorthTable
