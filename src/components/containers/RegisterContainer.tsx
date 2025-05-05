import { ReactNode } from "react"

const RegisterContainer = ({children}: {children: ReactNode}) => {
    return(
        <section className="flex flex-col bg-zinc-700 items-center justify-between max-w-xl rounded-md w-full my-7 mx-2 p-4">
            {children}
        </section>
    )
}

export default RegisterContainer