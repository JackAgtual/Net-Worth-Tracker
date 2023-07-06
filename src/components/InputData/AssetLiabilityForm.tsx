import { useState } from 'react'
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Grid,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import TableInput from './TableInput'
import { DataArray } from '../../types/data'
import { FirebaseControllerType } from '../../services/firebase/firebase'

type AsssetLiabilityFormProps = {
  firebaseController: FirebaseControllerType
  userId: string
  setInputtingNewRecord: React.Dispatch<React.SetStateAction<boolean>>
}

function AssetLiabilityForm({
  userId,
  firebaseController,
  setInputtingNewRecord,
}: AsssetLiabilityFormProps) {
  const [assets, setAssets] = useState<DataArray>([])
  const [liabilities, setLiabilities] = useState<DataArray>([])
  const [date, setDate] = useState(new Date())

  const handleAssetsAndLiabilitiesSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInputtingNewRecord(false)
    firebaseController.addRecordToUser({ userId, date, assets, liabilities })
  }

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault()
    const [year, month, day] = e.target.value.split('-')
    setDate(new Date(Number(year), Number(month) - 1, Number(day)))
  }

  const handleCancelInput = () => {
    setAssets([])
    setLiabilities([])
    setDate(new Date())
    setInputtingNewRecord(false)
  }

  return (
    <Paper elevation={4} sx={{ p: 3, my: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 4,
        }}
      >
        <Typography variant="h4" component="h2">
          Input Assets and Liabilities
        </Typography>
        <IconButton onClick={handleCancelInput}>
          <CloseIcon />
        </IconButton>
      </Box>
      <form onSubmit={handleAssetsAndLiabilitiesSubmit}>
        <Grid container columns={1} spacing={3}>
          <Grid item xs={1}>
            <TextField
              required
              type="date"
              size="small"
              onChange={handleDateChange}
            ></TextField>
          </Grid>
          <Grid item xs={1}>
            <TableInput tableName="Assets" tableRows={assets} setTableRows={setAssets} />
          </Grid>
          <Grid item xs={1}>
            <TableInput
              tableName="Liabilities"
              tableRows={liabilities}
              setTableRows={setLiabilities}
            />
          </Grid>
          <Grid item xs={1}>
            <Button type="submit" variant="contained">
              Save record
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default AssetLiabilityForm
