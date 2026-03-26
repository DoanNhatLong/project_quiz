import {useDispatch, useSelector} from "react-redux";
import {fetchAllQuizzes} from "../../redux/quizSlice.js";
import {useEffect} from "react";

export default function AdminExam(){
    const dispatch=useDispatch();
    const {items} = useSelector((state)=>state.quizzes)
    useEffect(() => {
        dispatch(fetchAllQuizzes());
    }, [dispatch]);
    return(
        <>
            <pre>{JSON.stringify(items, null, 2)}</pre>
        </>
    )
}