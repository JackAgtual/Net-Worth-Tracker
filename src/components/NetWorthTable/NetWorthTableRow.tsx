import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Grid,
} from '@mui/material'
import { useState } from 'react'
import { Record } from '../../types/data'
import NetWorthBreakdownTable from './NetWorthBreakdownTable'
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
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                sx={{ textAlign: { xs: 'center', sm: 'left' } }}
                variant="h6"
                gutterBottom
                component="h3"
              >
                Net Worth Breakdown
              </Typography>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <NetWorthBreakdownTable record={record} assetsOrLiabilities="assets" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <NetWorthBreakdownTable
                    record={record}
                    assetsOrLiabilities="liabilities"
                  />
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default NetWorthTableRow
