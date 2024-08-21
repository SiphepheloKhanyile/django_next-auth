
interface RequestBody {
    username:  string[];
    email:     string[];
    password:  string[];
    password2: string[];
}

type responseData = {
    id: number,
    name: string,
    email: string,
    accessToken: string
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json();

    const res = await fetch("http://localhost:8000/account/register/", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
    });

    const user: responseData = await res.json();
    if (res.ok) {
        return new Response(JSON.stringify(user), {
            status: res.status
        })
    }

    return new Response(JSON.stringify(user), {
        status: res.status
    })
}
