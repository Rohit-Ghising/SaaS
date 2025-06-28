"use client"
import { ErrorState } from "@/components/empty-state"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { CallProvider } from "../components/call-provider"


interface Props{
  meetingId:string
}
export const CallView = ({meetingId}:Props)=>{
  const trpc = useTRPC()
  const {data} = useSuspenseQuery(trpc.meetings.getOne.queryOptions({id:meetingId}))
  if (data.status==="completed"){
    <div className="flex h-screen  items-center justify-center">
      <ErrorState title="Meeitng has ended" description="You can no longer join that neeting"/>
    </div>
  }
  return <CallProvider meetingId={meetingId} meetingName={data.name}/>
}