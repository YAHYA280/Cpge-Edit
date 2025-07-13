import Hero from "./Hero";
import Reviews from "./Reviews";
import SuspensText from "./SuspensText";

export default function Template() {
    return (
        <main className="flex flex-col gap-[40px]">
            <Hero/>
            <Reviews/>
            <SuspensText/>
        </main>
    )
}
