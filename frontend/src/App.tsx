import CreateButton from "./components/CreateButton";
import TaskDiv from "./components/TaskDiv";
import { hc } from "hono/client";
import type { AppType } from "@backend/index";
import { useEffect } from "react";

const client = hc<AppType>(import.meta.env.VITE_API_URL);

function App() {
    // useEffectじゃなくてqueryを使う
    // TaskDivにデータを送るようにして、TaskDiv.tsx内で扱えるようにする
    const fetchApi = async () => {
        const res = await client.db.$get();
        const data = await res.json();
        console.log(data);
    }

    useEffect(() => {
        fetchApi();
    }, [])

    return (
        <>
            <div className="bg-gray-800 text-white flex min-h-screen w-dvw justify-center items-center">
                <div className="flex justify-center h-lvh flex-col w-full max-w-127.5 gap-4">
                    <div>
                        <p className="font-rnro text-2xl select-none">
                            タスクアプリ
                        </p>
                        <p className="font-mono opacity-75 select-none">
                            made with ❤️.
                        </p>
                    </div>
                    <div className="flex justify-end-safe h-[2.5em]">
                        <CreateButton />
                    </div>
                    <TaskDiv />
                </div>
            </div>
        </>
    );
}

export default App;
