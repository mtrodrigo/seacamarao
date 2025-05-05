import { ReactNode } from "react"

const LoginContainer = ({children}: {children: ReactNode}) => {
    return(
        <section className="flex flex-col bg-zinc-700 items-center justify-between max-w-xs rounded-md w-full my-7 mx-2 py-4">
            {children}
        </section>
    )
}

export default LoginContainer