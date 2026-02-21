import CreateButton from "./components/CreateButton";
import TaskDiv from "./components/TaskDiv";
import { useQuery} from "@tanstack/react-query";
import type { Dist } from "./types/db";
import { client } from "./api/client";

function App() {
    const fetchApi = async (): Promise<Dist> => {
        const res = await client.db.$get();
        if (!res.ok) {
            throw new Error("failed");
        }
        const data = await res.json();
        return data as unknown as Dist;
    }

    const { data, error, isLoading } = useQuery({queryKey: ['data'], queryFn: fetchApi})

    if (isLoading) return <div>loading</div>;
    if (error) return <div>error check log</div>;

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
                    <TaskDiv data={data ?? []}/>
                </div>
            </div>
        </>
    );
}

export default App;
