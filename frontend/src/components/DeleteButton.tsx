import { useState } from "react";

function DeleteButton({ taskId, setSelect }: { taskId: number, setSelect: (item: number, isDelete: boolean) => void }) {
    const [isSelected, setSelected] = useState(false);

    const select = (taskId: number) => {
        setSelect(taskId, !isSelected);
        setSelected(!isSelected);
    }
    
    return <>
        <button onClick={() => select(taskId)} className={`${isSelected ? "bg-red-500" : "bg-none"} w-9 h-9 border-2 border-red-500 rounded-4xl hover:cursor-pointer gap-2`}></button>
    </>
}

export default DeleteButton;
