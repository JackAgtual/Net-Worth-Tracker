import AssetLiabilityForm from './AssetLiabilityForm'
import InputNewRecord from './InputNewRecord'
import { useState } from 'react'

type InputDataProps = {
  userId: string
}

function InputData({ userId }: InputDataProps) {
  const [inputtingNewRecord, setInputtingNewRecord] = useState(false)

  return (
    <>
      {inputtingNewRecord ? (
        <AssetLiabilityForm
          userId={userId}
          setInputtingNewRecord={setInputtingNewRecord}
        />
      ) : (
        <InputNewRecord setInputtingNewRecord={setInputtingNewRecord} />
      )}
    </>
  )
}

export default InputData
