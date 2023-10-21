import {
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
  Typography,
} from '@mui/material'
import { Record } from '../../types/data'

type NetWorthBreakdownTableProps = {
  record: Record
  assetsOrLiabilities: 'assets' | 'liabilities'
}

function ItemTable({ record, assetsOrLiabilities }: NetWorthBreakdownTableProps) {
  const items = record[assetsOrLiabilities]
  const tableTitle =
    assetsOrLiabilities.charAt(0).toUpperCase() + assetsOrLiabilities.slice(1)

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1" component="h6">
                {tableTitle}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1" component="h6">
                Amount
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.name}</TableCell>
              <TableCell align="right">${item.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default ItemTable
