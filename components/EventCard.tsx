import Link from "next/link";
import Image from "next/image";
import {EventItem} from "@/lib/constants";
const EventCard = ( eventItem: EventItem) => {
    return (
        <Link href={`events/${eventItem.slug}`} id={'event-card'} >
            <Image src={eventItem.image} alt={eventItem.title} width={410} height={300} className={'poster'} />

            <div className="flex flex-row gap-2">
                <Image src={'/icons/pin.svg'} alt={'location'} width={14} height={14} />
                <p>Location</p>
            </div>
            <p className={'title'}>{eventItem.title}</p>

            <div className={'datetime'}>
                <div className="flex flex-row gap-2">
                    <Image src={'/icons/calendar.svg'} alt={'date'} width={14} height={14} />
                    <p>{eventItem.date}</p>
                </div>
            </div>
            <div className={'datetime'}>
                <div className="flex flex-row gap-2">
                    <Image src={'/icons/clock.svg'} alt={'time'} width={14} height={14} />
                    <p>{eventItem.time}</p>
                </div>
            </div>
        </Link>
    )
}
export default EventCard
