import { WorkspaceView } from '@/components/containers/WorkspaceView'
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
export default function Page({ params}: { params: { workspaceId: string } }) {
    const token = cookies().get("token")?.value
    if (!token) {
        return redirect("/auth/signin")
    }
    return <WorkspaceView workspaceId={params.workspaceId} />
}