import { ErrorState } from "@/components/empty-state"





export const CancelState = ()=>{
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <ErrorState
      image="/cancelled.svg"
      title ="MEEEITNG is active"
      description="This meeting was Cancelled"/>
      

      </div>
  )
}