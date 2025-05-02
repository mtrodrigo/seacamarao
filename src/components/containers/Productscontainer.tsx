import { ReactNode } from "react"

const Productscontainer = ({children}: {children: ReactNode}) => {
    return(
        <main className="flex flex-col items-center justify-between max-w-6xl w-full my-7 mx-2">
            {children}
        </main>
    )
}

export default Productscontainer
