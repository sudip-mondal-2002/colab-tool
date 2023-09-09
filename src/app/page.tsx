import {Dashboard} from "@/components/containers/Dashboard";
import { WorkspaceProvider } from "@/providers/WorkspaceProvider";

export default async function Home() {
    return <WorkspaceProvider><Dashboard /></WorkspaceProvider>
}
