import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SERVER_PATH } from "@/constants/paths"

interface TImage {
    shape: string,
    url: string,
    fallback: string,
}

const TImage = ({ ...dt }: TImage) => {
    return (
        <td scope="col" className="ps-4 py-1 flex gap-3 items-center">
            <Avatar className={dt.shape}>
                <AvatarImage src={SERVER_PATH + dt.url} alt={dt.fallback} />
                <AvatarFallback>{dt.fallback}</AvatarFallback>
            </Avatar>

            <p className="mb-0 font-semibold">{dt.fallback}</p>
        </td>
    )
}

export default TImage