import ItemTable from './ItemTable'
import { Collapse, Box, Typography, Grid } from '@mui/material'
import { Record } from '../../types/data'

type NetWorthBreakdownProps = {
  open: boolean
  record: Record
}

function NetWorthBreakdown({ open, record }: NetWorthBreakdownProps) {
  return (
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
            <ItemTable record={record} assetsOrLiabilities="assets" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ItemTable record={record} assetsOrLiabilities="liabilities" />
          </Grid>
        </Grid>
      </Box>
    </Collapse>
  )
}

export default NetWorthBreakdown
