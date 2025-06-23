"use client"

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/error-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/components/data-pagination";
import { meetings } from "@/db/schema";

export const MeetingsView= ()=>{
  const router = useRouter()
  const [filters,setFilters] = useMeetingsFilters()
   console.log("Current filters:", filters);
  const trpc = useTRPC();
  const  {data} =  useSuspenseQuery(trpc.meetings.getMany.queryOptions({...filters}))
  return(

    <div className=" flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4 ">
      <DataTable data={data.items} columns={columns}
       onRowClick={(row)=> router.push(`/meetings/${row.id}`)}/>
      <DataPagination
      page={filters.page}
      totalPages={data.totalPages}
      onPageChange={(page)=>setFilters({page})}
      />
      {data.items.length === 0 && (<EmptyState
           title="Create your first Meetin"
           description="Shcedule to join meeting"/>)}


    </div>
  )
}
export const MeetingsViewLoading =()=>{return(
     <LoadingState title="Loading Agents" description="please wait..."/>
  )}


  export const MeetingsViewError =()=>{return(
     <ErrorState title="Error loading Agents" description="Something went Wrong"/>
  )}