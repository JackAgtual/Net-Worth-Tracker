import { useState } from 'react'
import { Button, TextField } from '@mui/material'
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
    firebaseController.addRecordToUser(userId, date, assets, liabilities)
  }

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault()
    const [year, month, day] = e.target.value.split('-')
    setDate(new Date(Number(year), Number(month) - 1, Number(day)))
  }

  return (
    <>
      <h2>Input Assets and Liabilities</h2>
      <form onSubmit={handleAssetsAndLiabilitiesSubmit}>
        <TextField
          required
          type="date"
          size="small"
          onChange={handleDateChange}
        ></TextField>
        <h3>Assets</h3>
        <TableInput tableName="Assets" tableRows={assets} setTableRows={setAssets} />
        <h3>Liabilities</h3>
        <TableInput
          tableName="Liabilities"
          tableRows={liabilities}
          setTableRows={setLiabilities}
        />
        <Button type="submit">Add Data</Button>
      </form>
    </>
  )
}

export default AssetLiabilityForm
