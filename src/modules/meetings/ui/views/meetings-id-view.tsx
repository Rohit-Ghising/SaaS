"use client"
import { ErrorState } from "@/components/empty-state"
import { LoadingState } from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { MeetingIdViewHeader } from "../components/meeting-id-view-header"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useConfirm } from "../../hooks/use-confirm"
import { UpdateMeetingDialog } from "../components/update-meeting-dialog "
import { useState } from "react"
import { UpcomingState } from "../components/upcomming-state"


interface Props{
  meetingId:string
}
export const MeetingIdView = ({meetingId}:Props)=>{
  const [updateMeetingDialogOpen,setUpdateMeetingDialogOpen] = useState(false)
    const trpc= useTRPC()
    const router = useRouter()
    const [RemoveConfirmation, confirmRemove] = useConfirm("Are you sure?","The following action will remove this meeting.")
    const queryClient = useQueryClient()
    const {data} = useSuspenseQuery(trpc.meetings.getOne.queryOptions({id:meetingId}))

    const removeMeeting = useMutation(trpc.meetings.remove.mutationOptions({
      onSuccess:()=>{
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
        router.push("/meetings")
        //TODO Invalidate free tier usage
      },
     
    }))
     const handleRemoveMeeting = async ()=>{
      const ok = await confirmRemove()
      if(!ok) return
      await removeMeeting.mutateAsync({id:meetingId})
     }
     const isActive = data.status ==="active"
     const isUpcoming = data.status ==="upcoming"
     const isCompleted = data.status ==="completed"
     const isCancelled = data.status ==="cancelled"
     const isProcessing = data.status ==="processing"


  return(
  
    <>
    <RemoveConfirmation/>
    <UpdateMeetingDialog open={updateMeetingDialogOpen} onOpenChange={setUpdateMeetingDialogOpen} initialValues={data}/>
    <div className="flex-1 py-4 px-4 flex flex-col gap-y-4">
      <MeetingIdViewHeader
      meetingId={meetingId}
      meetingName={data.name}
      onRemove={handleRemoveMeeting}
      onEdit={()=>setUpdateMeetingDialogOpen(true)}/>
      { isCancelled &&  <div>  Cancelled</div> }
      { isCompleted &&  <div>  Completed</div> }
      { isProcessing &&  <div>  Processing</div> }
      { isUpcoming&&  (<UpcomingState meetingId={meetingId} onCancelMeeting={()=>{}} isCancelling={false}/>)}
      { isActive&&  <div>  Active</div> }
      
    </div>
    </>
  )

}
export const MeetingsIdViewLoading =()=>{return(
     <LoadingState title="Loading Meeting" description="please wait..."/>
  )}


  export const MeetingsIdViewError =()=>{return(
     <ErrorState title="Error loading Meetings" description="Something went Wrong"/>
  )}