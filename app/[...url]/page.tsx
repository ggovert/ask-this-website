{/*Catch all route segment
You should use async in your Next.js component or function when working with data or dynamic parameters that require asynchronous resolution.
Use async when fetching data, server side function like: getserversideprops, work in duynamic routes, and dynamic data depends on aync operationn like database query
No need to use async if passed on data is static
Use async only when you need to handle asynchronous operations like data fetching, I/O-bound tasks, or resolving dynamic parameters that are not immediately available. Avoid overusing it for static or synchronous scenarios.
Using redis to know which website has been indexed */}

import { ragChat } from "../lib/rag-chat";
import { redis } from "../lib/redis";
import { ChatWrapper } from "../components/ChatWrapper";
import { cookies } from "next/headers";



interface PageProps {
    params:Promise< {
        url: string | string[] | undefined
    }>
}

function reconstructUrl({ url }: { url: string[] }) {
    const decodedComponents = url.map((component) => decodeURIComponent(component));

    return decodedComponents.join("/");
}


const Page =  async ({ params }: PageProps) => {


    const { url } = await params;
    {/*Ensure params.url is available before using it*/}
    if (!url || !Array.isArray(url)) {
        throw new Error("URL parameters are malformed or unavailable.");
    }

    if (url){
        console.log("params.url", url)
    }
    const reconstructedUrl = reconstructUrl({
        url: url as string[]
    })

    {/*construct a unique sessionId by the url and cookie for each website */}
    const sessionCookie = (await cookies()).get("sessionId")?.value;
    const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(/\//g, "")


    const isAlredayIndexed = await redis.sismember("indexed-websites", reconstructedUrl);


    const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId })


    console.log("isAlredayIndexed", isAlredayIndexed);


    if(!isAlredayIndexed) {
        {/* use redis to know which website has been indexed */}
        await ragChat.context.add({
            type: "html",
            source: reconstructedUrl,
            config: {chunkOverlap:50, chunkSize:200},

        });

        await redis.sadd("indexed-websites", reconstructedUrl);

    }

    return (
    <ChatWrapper sessionId={sessionId} initialMessages={initialMessages}/>);
}

export default Page