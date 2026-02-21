import { useQueryClient } from "@tanstack/react-query";
import { client } from "../api/client";

function TaskProgressButton({ isToggle, taskId }: { isToggle: boolean, taskId: number }) {
    const queryClient = useQueryClient();

    const handleClick = async () => {
        await client.db.completed[":id"].$patch({
            param: { id: taskId.toString() },
            json: { is_completed: !isToggle }
        })

        await queryClient.invalidateQueries({ queryKey: ['data'] })
    }

    return <>
        <button onClick={handleClick} className={`${isToggle ? 'bg-white' : 'bg-transparent'} w-9 h-9 border rounded hover:cursor-pointer gap-2`}></button>
    </>
}

export default TaskProgressButton;
