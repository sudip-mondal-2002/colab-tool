import {Dashboard} from "@/components/containers/Dashboard";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function Home() {
    const token = cookies().get("token")?.value
    if (!token) {
        return redirect("/auth/signin")
    }
    return <Dashboard />
}
