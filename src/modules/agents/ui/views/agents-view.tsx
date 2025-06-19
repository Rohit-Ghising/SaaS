"use client"
import { EmptyState, ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
// import { ResponsiveDialog } from "@/components/responsive-dialog"
// import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { DataTable } from "../components/data-table"
import { columns} from "../components/columns"


export const AgentsView = ()=>{
  const trpc = useTRPC()
  const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  
  
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      {/* <ResponsiveDialog title="Resposive Test"description="Resposive description" open
      onOpenChange={()=>{}}>
        <Button>
          Some Action
        </Button>
      </ResponsiveDialog> */}
     <DataTable data={data} columns={columns}/>
     {data.length === 0 && (<EmptyState 
     title="Create your first Agent"
     description="Create an agent to join meeting"/>)}
    </div>
  )
}
export const AgentViewLoading =()=>{return(
     <LoadingState title="Loading Agents" description="please wait..."/>
  )}


  export const AgentViewError =()=>{return(
     <ErrorState title="Error loading Agents" description="Something went Wrong"/>
  )}