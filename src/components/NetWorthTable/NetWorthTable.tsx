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

type NetWorthTableProps = {
  records: Record[]
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>
}

function NetWorthTable({ records, setRecords }: NetWorthTableProps) {
  const [sortByDateOrNetWorth, setSortByDateOrNetWorth] = useState<'date' | 'netWorth'>(
    'date'
  )
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
                <IconButton>
                  <ArrowUpwardIcon />
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
                <IconButton>
                  <ArrowDownwardIcon />
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
