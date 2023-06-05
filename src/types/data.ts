import { Timestamp } from 'firebase/firestore'

export type Data = {
  name: string
  amount: number
}

export type DataArray = Data[]

export type SetData = React.Dispatch<React.SetStateAction<DataArray>>

export type RecordData = {
  assets: Data[]
  liabilities: Data[]
  displayDate: string
  date: Timestamp
}

export type Record = RecordData & { id: string }
