import AssetLiabilityForm from './AssetLiabilityForm'
import InputNewRecord from './InputNewRecord'
import { FirebaseControllerType } from '../../services/firebase/firebase'
import { useState } from 'react'

type InputDataProps = {
  firebaseController: FirebaseControllerType
  userId: string
}

function InputData({ firebaseController, userId }: InputDataProps) {
  const [inputtingNewRecord, setInputtingNewRecord] = useState(false)

  return (
    <>
      {inputtingNewRecord ? (
        <AssetLiabilityForm
          userId={userId}
          firebaseController={firebaseController}
          setInputtingNewRecord={setInputtingNewRecord}
        />
      ) : (
        <InputNewRecord setInputtingNewRecord={setInputtingNewRecord} />
      )}
    </>
  )
}

export default InputData
