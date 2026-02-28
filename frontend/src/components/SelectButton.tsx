function SelectButton({ onClick, isSelected }: { onClick: () => void, isSelected: boolean }) {
    return <>
        <button onClick={onClick} className="bg-white text-black hover:cursor-pointer hover:bg-gray-100 font-bold rounded w-1/5 select-none">{isSelected ? "完了 ✅" : "削除 🗑️"}</button>
    </>
}

export default SelectButton;
