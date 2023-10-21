import { useState } from 'react'
import NetWorthBreakdown from './NetWorthBreakdown'
import { TableRow, TableCell, IconButton } from '@mui/material'
import { Record } from '../../types/data'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

type NetWorthTableRowProps = {
  record: Record
}

function NetWorthTableRow({ record }: NetWorthTableRowProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen((prevOpen) => !prevOpen)}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{record.displayDate}</TableCell>
        <TableCell align="right">
          {record.netWorth >= 0
            ? `$${record.netWorth}`
            : `($${Math.abs(record.netWorth)})`}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <NetWorthBreakdown open={open} record={record} />
        </TableCell>
      </TableRow>
    </>
  )
}

export default NetWorthTableRow
