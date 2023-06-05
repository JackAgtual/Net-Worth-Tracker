import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import TableInput from './TableInput'
import { DataArray } from '../types/data'
import { FirebaseControllerType } from '../services/firebase/firebase'

type AsssetLiabilityFormProps = {
  firebaseController: FirebaseControllerType
  userId: string
}

function AssetLiabilityForm({ userId, firebaseController }: AsssetLiabilityFormProps) {
  const [assets, setAssets] = useState<DataArray>([])
  const [liabilities, setLiabilities] = useState<DataArray>([])

  const handleAssetsAndLiabilitiesSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    assets.forEach((asset) => {
      firebaseController.addDocumentToUserAssets(userId, asset)
    })
    liabilities.forEach((liability) => {
      firebaseController.addDocumentToUserLiabilities(userId, liability)
    })
  }

  return (
    <>
      <h2>Input Assets and Liabilities</h2>
      <form onSubmit={handleAssetsAndLiabilitiesSubmit}>
        <TextField type="date" size="small"></TextField>
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
