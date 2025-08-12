import { QueryClient, isServer} from "@tanstack/react-query"

function makeQueryClinet () {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
            }
        }
    })
}



let browserQueryClient:QueryClient  | undefined;

export function getQueryClient () {
    if(isServer){
        return makeQueryClinet()
    }
    if(!browserQueryClient){
        browserQueryClient = makeQueryClinet()
    }
    return browserQueryClient
}



