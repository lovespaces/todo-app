import TaskProgressButton from "./TaskProgButton";
import DeleteButton from "./DeleteButton";
import type { GetDist } from "../types/db";

function TaskDiv({ data, selectMode, setSelect }: { data: GetDist, selectMode: boolean, setSelect: (item: number, isDelete: boolean) => void }) {

    const formatDate = (dateStr: string) => dateStr.replace(/-/g, '/');

    return (
        <>
            <div className="flex flex-col gap-6">
                {data.map((task) => (
                    <div className="flex items-center gap-2" key={task.id}>
                        { selectMode ? <DeleteButton taskId={task.id} setSelect={setSelect} /> : <TaskProgressButton isToggle={task.is_completed} taskId={task.id} />}
                        <div className={`flex-1 flex flex-col ${task.is_completed ? "opacity-50" : "opacity-100"}`}>
                            <p className={`font-bold ${task.is_completed ? "line-through" : ""}`}>{task.name}</p>
                            <div className="flex justify-between opacity-75">
                                <p>{task.description}</p>
                                <p className="select-none">
                                    {formatDate(task.when_created)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default TaskDiv;
