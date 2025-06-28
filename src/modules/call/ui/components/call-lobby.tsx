
// import { Button } from "@/components/ui/button"
// import { authClient } from "@/lib/auth-client"
// import { generateAvatarUri } from "@/lib/avatar"
// import { DefaultVideoPlaceholder, StreamVideoParticipant, ToggleAudioPreviewButton, ToggleVideoPreviewButton, useCallStateHooks, VideoPreview } from "@stream-io/video-react-sdk"
// import { LogInIcon } from "lucide-react"
// import Link from "next/link"
// // import "@stream-io/video-react-sdk/dist/css/style.css"
// // import "@stream-io/video-react-sdk/dist/css/style.css";

// interface Props{
//   onJoin:()=> void}
   
//   const DisabledVideoPreview =()=>{
//     const {data} = authClient.useSession()
//     return(
//       <DefaultVideoPlaceholder participant={{
//         name:data?.user.name ??"",
//         image:data?.user.image?? generateAvatarUri({seed:data?.user.name ??"",
//           variant:"initials"
//         })
//       }as StreamVideoParticipant
//     }/>
//     )


//   }
//  const AllowBrowserPermissions = ()=>{
//   return(
//     <p>
//       Plesase grant accss
//     </p>
//   )
//  }




//   export const CallLobby =({onJoin}:Props)=>{

//     const {useCameraState,useMicrophoneState} = useCallStateHooks()

//   const {hasBrowserPermission:hasMicPermission}=useMicrophoneState()
//   const {hasBrowserPermission:hasCameraPermission}=useCameraState()
//   const hasBrowserMediaPermission = hasCameraPermission && hasMicPermission
//     return (
//       <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
//         <div className="py-4 px-8 flex flex-1 items-center justify-center">
//           <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
//             <div className="flex flex-col gap-y-2 text-center">
//               <h6 className="text-lg font-medium">ready to join?</h6>
//               <p className="text-sm">set rp your call before joining</p>
//             </div>
//             <VideoPreview  DisabledVideoPreview={ 
//               hasBrowserMediaPermission ?DisabledVideoPreview:AllowBrowserPermissions
//             }/>
//           </div>
//           <div className="flex gap-x-2 ">
//             <ToggleAudioPreviewButton/>
//             <ToggleVideoPreviewButton/>
//           </div>
//           <div className="flex gap-x-2 justify-between w-full">
//             <Button  asChild variant='ghost'>
//               <Link href="/meetings">
//                Cancel
//               </Link>
             
//             </Button>
//             <Button onClick={onJoin}>
//               <LogInIcon/>
//               Join Call
//             </Button>

//           </div>
//         </div>
//       </div>
//     )
//   }
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { generateAvatarUri } from "@/lib/avatar"
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk"
import { LogInIcon } from "lucide-react"
import Link from "next/link"
import "@stream-io/video-react-sdk/dist/css/styles.css"

interface Props {
  onJoin: () => void
}

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession()
  return (
    <DefaultVideoPlaceholder
      participant={{
        name: data?.user.name ?? "",
        image: data?.user.image ?? generateAvatarUri({
          seed: data?.user.name ?? "",
          variant: "initials"
        }),
        userId: data?.user.id ?? "anonymous",
        sessionId: "preview",
      } as StreamVideoParticipant}
    />
  )
}

const AllowBrowserPermissions = () => (
  <div className="text-center p-4 bg-background rounded-lg">
    <p className="text-sm text-muted-foreground">
      Please grant camera and microphone permissions
    </p>
  </div>
)

export const CallLobby = ({ onJoin }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks()
  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState()
  const { hasBrowserPermission: hasCameraPermission } = useCameraState()
  const hasBrowserMediaPermission = hasCameraPermission && hasMicPermission

  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
      <div className="py-4 px-8 flex flex-col items-center justify-center gap-6 max-w-md w-full">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-8 w-full shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Ready to join?</h6>
            <p className="text-sm text-muted-foreground">
              Set up your audio and video before joining
            </p>
          </div>
          
          <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden">
            <VideoPreview
              DisabledVideoPreview={
                hasBrowserMediaPermission ? DisabledVideoPreview : AllowBrowserPermissions
              }
            />
          </div>

          <div className="flex gap-x-4">
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>
        </div>

        <div className="flex gap-x-4 w-full">
          <Button asChild variant="outline" className="flex-1">
            <Link href="/meetings">
              Cancel
            </Link>
          </Button>
          <Button onClick={onJoin} className="flex-1 gap-2">
            <LogInIcon className="h-4 w-4" />
            Join Call
          </Button>
        </div>
      </div>
    </div>
  )
}