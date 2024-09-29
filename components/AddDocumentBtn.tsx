'use client'

import Image from "next/image"
import { Button } from "./ui/button"

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {

    const addDocumentHandler = async () => {
        // Add document logic here
        console.log('Add document clicked', userId, email)
    }



    return (
        <Button
            type="submit"
            onClick={addDocumentHandler}
            className="gradient-blue flex gap-1 shadow-md"
        >
            <Image
                src="/assets/icons/add.svg"
                alt="Add"
                width={24}
                height={24}
            />
            <p className="hidden sm:block">Create a blank document</p>
        </Button>
    )
}

export default AddDocumentBtn