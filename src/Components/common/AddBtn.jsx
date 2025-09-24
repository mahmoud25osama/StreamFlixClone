import { FaPlus } from 'react-icons/fa'
import useMyList from '@/CustomHooks/useMyList.jsx'

function AddBtn({ title, id, type }) {
    const { handleMyListToggle, isInMyList } = useMyList()

    const inList = isInMyList(id, type)

    return (
        <button
            onClick={() => handleMyListToggle(title, id, type)}
            className={`group cursor-pointer flex items-center justify-center gap-3 font-semibold text-lg px-8 py-3 rounded-md transition-all duration-200 backdrop-blur-sm border ${
                inList
                    ? 'bg-white text-black border-white hover:bg-gray-200'
                    : 'bg-gray-600/70 text-white border-white/30 hover:bg-gray-600/50'
            }`}
        >
            <FaPlus
                className={`group-hover:scale-110 transition-transform duration-200 ${
                    inList ? 'text-black' : 'text-white'
                }`}
            />
            {inList ? 'Remove from My List' : 'Add to My List'}
        </button>
    )
}

export default AddBtn
