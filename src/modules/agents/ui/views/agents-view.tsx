"use client"
import { EmptyState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
// import { ResponsiveDialog } from "@/components/responsive-dialog"
// import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { DataTable } from "../components/data-table"
import { columns} from "../components/columns"
import { useAgentsFilters } from "../../hooks/use-agents-filters"
import { DataPagination } from "../components/data-pagination"
import { useRouter } from "next/navigation"
import { ErrorState } from "@/components/empty-state"



export const AgentsView = ()=>{
  const router = useRouter()
  const [filters,setFilters]= useAgentsFilters()
  const trpc = useTRPC()
  const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions({
    ...filters
      }));

  
  
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      {/* <ResponsiveDialog title="Resposive Test"description="Resposive description" open
      onOpenChange={()=>{}}>
        <Button>
          Some Action
        </Button>
      </ResponsiveDialog> */}
     <DataTable data={data.items} columns={columns}
     onRowClick={
      
      (row)=> router.push(`/agents/${row.id}`)}/>
     <DataPagination page={filters.page }
     totalPages={data.totalPages}
     onPageChange= {(page)=>setFilters({page})}/>
     {data.items.length === 0 && (<EmptyState 
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