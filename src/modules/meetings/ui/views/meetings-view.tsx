"use client"

import { ErrorState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView= ()=>{
  const trpc = useTRPC();
  const  {data} =  useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))
  return(

    <div className="overflow-x-scroll">


    </div>
  )
}
export const MeetingsViewLoading =()=>{return(
     <LoadingState title="Loading Agents" description="please wait..."/>
  )}


  export const MeetingsViewError =()=>{return(
     <ErrorState title="Error loading Agents" description="Something went Wrong"/>
  )}