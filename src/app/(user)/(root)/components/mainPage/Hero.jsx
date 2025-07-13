import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton";
import HtmlLink from "@/app/assets/smallComponents/HtmlLink";
import { ArrowWithoutLineIcon, NormalArrowIcon, StartUpIcon, SupportIcon } from "@/constants/Icons";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { AnimatedGradientTextDemo } from "@/app/assets/components/AnimatedGradientTextDemo";
import GradualSpacing from "@/components/magicui/gradual-spacing";


const texts = [
  'Always, Your Future Is',
  'In Your Hands',
  'Only',
]

export default function Hero() {
  return (
    <div className="mt-5 w-full x-white-space relative">
      <div className="flex flex-col gap-10 items-center justify-center text-[30px] md:text-[50px] lg:text-[60px] font-bold text-center relative">

        <AnimatedGradientTextDemo />
       
        <div>
          {
            texts.map((item) => (
              <GradualSpacing
                key={item}
                className="font-display text-center  tracking-[-0.1em]  text-black dark:text-white md:text-7xl md:leading-[5rem]"
                text={item}
              />
            ))
          }

        </div>



        <div className="flex items-center gap-5 mt-5">

          <HtmlLink
            href={'/login'}
            text={"Let's get started"}
            icon={<StartUpIcon />}
            className="py-2 px-3 rounded-xl h-10 bg-own_primary-1 text-dark-1 "
          />

          <HtmlLink
            href={'/'}
            text="Need Support"
            icon={<SupportIcon />}
            className="py-2 px-3 rounded-xl h-10 border-1"
          />
        </div>
      </div>
    </div>
  )
}
