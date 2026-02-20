import TaskProgressButton from "./TaskProgButton";

function TaskDiv() {
    const tasksExample = [
        {
            id: 1,
            name: "タスク①",
            description: "a",
            isCompleted: false,
            whenCreated: "2024/01/02",
        },
        {
            id: 2,
            name: "タスク②",
            description: "b",
            isCompleted: false,
            whenCreated: "2024/01/03",
        },
        {
            id: 3,
            name: "タスク③",
            description: "c",
            isCompleted: true,
            whenCreated: "2024/01/04",
        },
    ];

    return (
        <>
            <div className="flex flex-col gap-6">
                {tasksExample.map((task) => (
                    <div className="flex items-center gap-2" key={task.id}>
                        <TaskProgressButton isToggle={task.isCompleted} />
                        <div className="flex-1 flex flex-col">
                            <p className="font-bold">{task.name}</p>
                            <div className="flex justify-between opacity-75">
                                <p>{task.description}</p>
                                <p className="select-none">
                                    {task.whenCreated}
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
