import { Subscription, UserDetail } from "@/types"
import { User } from "@supabase/auth-helpers-nextjs"
import { createContext, useContext, useEffect, useState } from "react"
import {useSessionContext, useUser as useSupaUser} from "@supabase/auth-helpers-react" 

type UserContextType = {
    accessToken: string | null
    user: User | null
    userDetail: UserDetail | null
    isLoading: boolean
    subscription: Subscription | null
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined
)

export interface Props {
    [propName: string]: any
}

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext()
    const user = useSupaUser()
    const accessToken = session?.access_token ?? null
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [userDetail, setUserDetail] = useState<UserDetail | null>(null)
    const [subscription, setSubscription] = useState<Subscription | null>(null)

    const getUserDetail = () => supabase.from('user').select('*').single()
    const getSubscription = () => supabase.from('subscriptions').select('*, prices(*, products(*))').in("status", ['trialing', 'active']).single()

    useEffect(()=> {
        if (user && !isLoadingData && !userDetail && !subscription) {
            setIsLoadingData(true)

            Promise.allSettled([getUserDetail(), getSubscription()]).then(
                (results) => {
                    const userDetailPromise = results [0]
                    const subscriptionPromise = results [1]

                    if(userDetailPromise.status === 'fulfilled') {
                        setUserDetail(userDetailPromise.value.data as UserDetail)
                    }

                    if(subscriptionPromise.status === "fulfilled") {
                        setSubscription(subscriptionPromise.value.data as Subscription)
                    }

                    setIsLoadingData(false)
                }
            )
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetail(null)
            setSubscription(null)
        }
    }, [user, isLoadingUser])

    const value = {
        accessToken,
        user,
        userDetail,
        isLoading: isLoadingUser || isLoadingData,
        subscription
    }

    return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
    const context = useContext(UserContext)
        if (context === undefined) {
            throw new Error ('useUser must be used within a MyUserContextProvider')
        }
        return context
}

