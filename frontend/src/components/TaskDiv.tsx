import TaskProgressButton from "./TaskProgButton";
import type { Dist } from "../types/db";

type Props = {
    data: Dist
}

function TaskDiv({ data }: Props) {

    return (
        <>
            <div className="flex flex-col gap-6">
                {data.map((task) => (
                    <div className="flex items-center gap-2" key={task.id}>
                        <TaskProgressButton isToggle={task.is_completed} taskId={task.id} />
                        <div className="flex-1 flex flex-col">
                            <p className="font-bold">{task.name}</p>
                            <div className="flex justify-between opacity-75">
                                <p>{task.description}</p>
                                <p className="select-none">
                                    {task.when_created}
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
