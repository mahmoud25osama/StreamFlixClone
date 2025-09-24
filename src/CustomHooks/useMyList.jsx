import MyListContext from '@/Contexts/myList/MyListContext.jsx'
import { useContext } from 'react'

function UseMyList() {
    const context = useContext(MyListContext)
    if (!context) {
        throw new Error('useMyList must be used within an AuthProvider')
    }
    return context
}

export default UseMyList
