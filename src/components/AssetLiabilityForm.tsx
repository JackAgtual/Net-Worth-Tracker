import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import TableInput from './TableInput'
import { Data } from '../types/data'

function AssetLiabilityForm() {
  const [assets, setAssets] = useState<Data>([])
  const [liabilities, setLiabilities] = useState<Data>([])

  const handleAssetsAndLiabilitiesSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Submit')
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
