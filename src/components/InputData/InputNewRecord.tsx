import { Button } from '@mui/material'

type InputNewRecordProps = {
  setInputtingNewRecord: React.Dispatch<React.SetStateAction<boolean>>
}

function InputNewRecord({ setInputtingNewRecord }: InputNewRecordProps) {
  return (
    <>
      <Button onClick={() => setInputtingNewRecord(true)} variant="contained">
        Record net worth
      </Button>
    </>
  )
}

export default InputNewRecord
