
import { useState } from "react/cjs/react.development"
// https://api.github.com/search/users?q=coderhdy
function useGetData() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFirst, setIsFirst] = useState(true);
    const [isErr, setIsErr] = useState(false);
    const searchData = tip => {
        if (isFirst) {
            setIsFirst(false);
        }
        setIsErr(false);
        setIsLoading(true);
        fetch(`/api/search/users?q=${tip}`)
            .then(res => res.json())
            .then(res => {
                setData(res.items)
                setIsLoading(false);
            })
            .catch(rea => setIsErr(true))
    }
    return {
        data,
        searchData,
        isLoading,
        isFirst,
        isErr,
    }
}

export default useGetData;
