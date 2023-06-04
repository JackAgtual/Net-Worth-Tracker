import { Button, TextField } from '@mui/material'
import TableInput from './TableInput'

function AssetLiabilityForm() {
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
        <TableInput tableName="Assets" />
        <h3>Liabilities</h3>
        <TableInput tableName="Liabilities" />
        <Button type="submit">Add Data</Button>
      </form>
    </>
  )
}

export default AssetLiabilityForm
