import { ResponsiveDialog } from "@/components/responsive-dialog";

interface NewMeetingDialogProps{
  open:boolean
  onOpenChange:(open:boolean)=>void
}
export const NewMeetingDialog = ({open,onOpenChange}:NewMeetingDialogProps)=>{
  return(
    <ResponsiveDialog 
    title="New Agent"
    description="Create a new Meetings "
    open={open} onOpenChange={onOpenChange}>

   TOdo meetings
    </ResponsiveDialog>
  
  )
}