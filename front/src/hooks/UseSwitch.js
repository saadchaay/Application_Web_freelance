import {useState} from "react"
//pour controller les Switchs du formulaires
export default function useSwitch(value1,value2) {
   const [value,setValue] = useState(value1)
   function onChange() {
      let nextValue =(value===value1)?value2:value1
      setValue(nextValue)
   }
   return {
      "value" :value,
      "onChange" : onChange
   }
}
