
import { EmptyState } from "@/components/error-state"
import { Button } from "@/components/ui/button"
import { BanIcon, VideoIcon } from "lucide-react"
import Link from "next/link"
interface Props{
  meetingId:string
  
}




export const ActiveState = ({meetingId,}:Props)=>{
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
      image="/upcoming.svg"
      title ="MEEEITNG is active"
      description="Once you start this meeting a summary willl apaper here"/>
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        
        <Button asChild className="w-full lg:w-auto">
          <Link href ={`/call/${meetingId}`}>
             <VideoIcon/>
          JOIN Meeting
          </Link>
       
        </Button>

      </div>

    </div>
  )
}