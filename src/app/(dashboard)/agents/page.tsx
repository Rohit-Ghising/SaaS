
import { AgentsView, AgentViewError, AgentViewLoading } from "@/modules/agents/ui/views/agents-view"
import { getQueryClient ,trpc} from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"
import { AgentsListHeader } from "@/modules/agents/ui/components/list-headers"

const Page = ()=>{
  const  queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())
  return (
    <>
    <AgentsListHeader/>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentViewLoading/>}>
      <ErrorBoundary fallback={<AgentViewError/>}>
<AgentsView/>
      </ErrorBoundary>
      
      </Suspense>
    </HydrationBoundary>
    </>
    
  )
}
export default Page