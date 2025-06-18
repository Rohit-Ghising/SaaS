"use client"
import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
// import { ResponsiveDialog } from "@/components/responsive-dialog"
// import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
export const AgentsView = ()=>{
  const trpc = useTRPC()
  const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  
  
  return (
    <div>
      {/* <ResponsiveDialog title="Resposive Test"description="Resposive description" open
      onOpenChange={()=>{}}>
        <Button>
          Some Action
        </Button>
      </ResponsiveDialog> */}
      {JSON.stringify(data,null,2)}
    </div>
  )
}
export const AgentViewLoading =()=>{return(
     <LoadingState title="Loading Agents" description="please wait..."/>
  )}


  export const AgentViewError =()=>{return(
     <ErrorState title="Error loading Agents" description="Something went Wrong"/>
  )}