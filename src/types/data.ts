import { Timestamp } from 'firebase/firestore'

export type UserRecord = {
  username: string
}

export type Data = {
  name: string
  amount: number
}

export type SetData = React.Dispatch<React.SetStateAction<Data[]>>

export type RecordData = {
  assets: Data[]
  liabilities: Data[]
  displayDate: string
  date: Timestamp
  netWorth: number
}

export type Record = RecordData & { id: string }
