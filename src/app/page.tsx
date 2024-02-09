import AppWrapper from "./components/AppWrapper"
import GetData from "./components/GetData"
export default function page() {
  return (
        <AppWrapper elems={<GetData />} />
  )
}
