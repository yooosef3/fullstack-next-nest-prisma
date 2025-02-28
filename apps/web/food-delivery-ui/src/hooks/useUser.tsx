import { GET_USER } from "@/graphql/actions/getUser.action";
import { useQuery } from "@apollo/client";

export default function useUser() {
    const { loading, data } = useQuery(GET_USER);
    return {
        loading,
        user: data?.getLoggedInUser?.user
    }
}
