import { ReactNode } from "react"

const BodyContainer = ({children}: {children: ReactNode}) => {
    return(
        <div className="flex flex-col items-center justify-between min-w-full min-h-screen bg-zinc-600">
            {children}
        </div>
    )
}

export default BodyContainer