import { Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material'
import { Record } from '../../types/data'
import NetWorthTableRow from './NetWorthTableRow'

type NetWorthTableProps = {
  records: Record[]
}

function NetWorthTable({ records }: NetWorthTableProps) {
  return (
    <>
      <h1>Net Worth</h1>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Net Worth</TableCell>
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
