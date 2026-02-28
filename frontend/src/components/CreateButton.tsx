function CreateButton({ onClick }: { onClick: () => void }) {
    return <>
        <button onClick={onClick} className="bg-white text-black hover:cursor-pointer hover:bg-gray-100 font-bold rounded w-1/5 select-none">作る 🛠️</button>
    </>
}

export default CreateButton;
