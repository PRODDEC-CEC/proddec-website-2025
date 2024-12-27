import { Metadata } from "next"

export async function generateMetadata({params}) {
    const {slug} = await params

    return {
        title: `${slug} • Event - PRODDEC CEC`
    }
}

export default async function EventDetails({params}) {
    const {slug} = await params
    return <div>Event Name: {slug}</div>
    
}