"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client"; 


export default function Home()  {
   const [email ,setEmail] = useState("");
   const [name ,setName] = useState("");
   const [password ,setPassword] = useState("");
   const onSubmit = ()=>{
     console.log("Submitting signup with", {name, email,password });
    authClient.signUp.email({
    name,email,password
   },
  {
    onError:()=>{window.alert("someyhomng went wrong")},
     onSuccess:()=>{window.alert('Success')}

  },
  
   
  
  )}
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Input placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <Input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <Input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <Button onClick={onSubmit}>
            Create User
          </Button>
    
    </div>
  )
}
