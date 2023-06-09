import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Box,
} from '@mui/material'
import { Record } from '../../types/data'
import NetWorthTableRow from './NetWorthTableRow'
import SortIcon from './SortIcon'

export type SortOptions = 'date' | 'netWorth'

type NetWorthTableProps = {
  records: Record[]
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>
}

function NetWorthTable({ records, setRecords }: NetWorthTableProps) {
  const [sortByDateOrNetWorth, setSortByDateOrNetWorth] = useState<SortOptions>('date')
  const [sortAscending, setSortAscending] = useState(true)

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
                <SortIcon
                  sortedDataCategory="date"
                  sortAscending={sortAscending}
                  sortByDateOrNetWorth={sortByDateOrNetWorth}
                  setSortAscending={setSortAscending}
                  setSortByDateOrNetWorth={setSortByDateOrNetWorth}
                />
                <Typography variant="subtitle1" component="h6">
                  Date
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="right">
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
              >
                <SortIcon
                  sortedDataCategory="netWorth"
                  sortAscending={sortAscending}
                  sortByDateOrNetWorth={sortByDateOrNetWorth}
                  setSortAscending={setSortAscending}
                  setSortByDateOrNetWorth={setSortByDateOrNetWorth}
                />
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
