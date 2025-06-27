
import { EmptyState } from "@/components/error-state"





export const ProcessingState = ()=>{
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
      image="/processing.svg"
      title ="MEEEITNG is completed"
      description="This meeting was processing]"/>
      

      </div>
  )
}