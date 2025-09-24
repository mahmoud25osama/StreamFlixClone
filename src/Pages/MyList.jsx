import { useMyList } from '../CustomHooks/useMyList'
import LoadingSpinner from '../Components/common/LoadingSpinner'
import ErrorMessage from '../Components/common/ErrorMessage'
import CardUi from '@/Components/common/Card'

function MyList() {
    const { myList, loading } = useMyList()

    if (loading) {
        return <LoadingSpinner />
    }

    if (myList.length == 0) {
        return <ErrorMessage />
    }

    return (
        <div className="min-h-screen bg-black text-white pt-20 px-4 md:px-16">
            <div className=" md:px-16 mb-10">
                <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                    <span className="w-2 h-8 bg-red-600 rounded"></span>
                    My List
                </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {myList.map((item) => {
                    const details = item.details
                    return <CardUi item={details} type={details.type} />
                })}
            </div>
        </div>
    )
}

export default MyList
