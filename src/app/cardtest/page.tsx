import {Tasks} from "@/components/composite/Tasks";

export default function Page(){
    return (
    <Tasks 
    task={{
      Email: 'cfi@smail.iitm.ac.in' ,
      workspace: 'CFI W&B and Techsoc',
      title: 'Coding',
      description: 'Hackathon',
      status: 'Completed',
      priority: 'High'
      }}/> )
  
}