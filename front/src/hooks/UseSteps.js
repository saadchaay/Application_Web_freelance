import {useState} from "react"

//pour controller les etapes d'inscription
export default function useSteps(initialValue,minValue,maxValue) {
   const [step,setStep] = useState(initialValue)
   function NextStep() {
       if(step < maxValue ){
           setStep(step + 1)
       }
   }
   function PrevStep() {
       if(step > minValue){
           setStep(step - 1)
       }
   }
   const to = ()=>(stp)=> {
       if((minValue <= stp)&&(stp<=maxValue)){
           setStep(stp);
       }
   }
   return {
      "value" : step,
      "next" : NextStep,
      "prev" : PrevStep,
      to
   }
}
