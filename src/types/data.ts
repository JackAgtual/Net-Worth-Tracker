export type Data = {
  name: string
  amount: number
}

export type DataArray = Data[]

export type SetData = React.Dispatch<React.SetStateAction<DataArray>>
