function TaskProgressButton({ isToggle }: { isToggle: boolean }) {
    const handleClick = () => { // completeかどうかをprops経由でApp.tsxから取得、条件でPATCHを使って更新 + スタイル変更
        alert("handle!");
    }

    return <>
        <button onClick={handleClick} className={`${isToggle ? 'bg-white' : 'bg-transparent'} w-9 h-9 border rounded hover:cursor-pointer gap-2`}></button>
    </>
}

export default TaskProgressButton;