import Link from "next/link"
import { Button } from "@/components/ui/button"

export const BackBtn = ({backhref, backlabel}) => {
    return (
        <Button variant="link" className="flex items-center gap-x-2 w-full">
            <Link href={backhref}>
                {backlabel}
            </Link>
        </Button>
    )
}