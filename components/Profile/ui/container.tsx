

export default function ProfileContainer({ children } : {
    children: React.ReactNode
}){

    return(
        <article className="p-4 w-72 h-96 flex flex-col items-center justify-center bg-lime-400 gap-y-4 rounded-xl">
            {children}
        </article>
    )

}