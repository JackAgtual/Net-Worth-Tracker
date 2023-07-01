import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { Data, SetData } from '../../types/data'

type TableInputProps = {
  tableName: string
  tableRows: Data[]
  setTableRows: SetData
}

function TableInput({ tableName, tableRows, setTableRows }: TableInputProps) {
  const addTableRow = () => {
    setTableRows((prevRows) => [...prevRows, { name: '', amount: 0 }])
  }

  const removeTableRow = (rowIdx: number) => {
    setTableRows((prevRows) => {
      const newRows = [...prevRows]
      newRows.splice(rowIdx, 1)
      return newRows
    })
  }

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rowIdx: number
  ) => {
    setTableRows((prevRows) => {
      const newRows = [...prevRows]
      newRows[rowIdx].name = e.target.value
      return newRows
    })
  }

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rowIdx: number
  ) => {
    setTableRows((prevRows) => {
      const newRows = [...prevRows]
      newRows[rowIdx].amount = Number(e.target.value)
      return newRows
    })
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{tableName}</TableCell>
            <TableCell>Value</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell>
                  <TextField
                    variant="standard"
                    size="small"
                    type="text"
                    value={row.name}
                    onChange={(e) => handleNameChange(e, idx)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    size="small"
                    type="number"
                    value={row.amount}
                    onChange={(e) => handleAmountChange(e, idx)}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => removeTableRow(idx)}>Delete</Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Button onClick={addTableRow}>{`Add ${tableName}`}</Button>
    </>
  )
}

export default TableInput
