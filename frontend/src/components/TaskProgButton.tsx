import { useQueryClient } from "@tanstack/react-query";
import { CompleteTask } from "../api/complete";

function TaskProgressButton({ isToggle, taskId }: { isToggle: boolean, taskId: number }) {
    const queryClient = useQueryClient();

    const handleClick = async () => {
        await CompleteTask(taskId, !isToggle);

        await queryClient.invalidateQueries({ queryKey: ['data'] })
    }

    return <>
        <button onClick={handleClick} className={`${isToggle ? 'bg-white' : 'bg-transparent'} w-9 h-9 border-2 rounded hover:cursor-pointer gap-2`}></button>
    </>
}

export default TaskProgressButton;
