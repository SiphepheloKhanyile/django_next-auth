import { UserInfo } from "@/types/interfaces";

export async function POST(request: Request) {
    const body = await request.json();
    const userToken = body.userToken;

    const res = await fetch("http://localhost:8000/account/info/", {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Token ${userToken}`,
         },
    });
    const user: UserInfo = await res.json();

    return new Response(JSON.stringify(user), {
        status: res.status
    })
}
