
import {
    Carousel,
    CarouselContent,
} from "@/components/ui/carousel"
import CarouselUiItem from "./CarouselUiItem"


export default function AnalyticsSwiper({ customers }) {
  return (
      <div className="flex-1 w-[50%] h-full overflow-hidden">
          <Carousel opts={{
              align: "start",
          }}
              className="w-full ">
              <CarouselContent className="h-full ">


                  <CarouselUiItem
                      title="My Customers"
                      total={customers?.length}
                      percentage="6%"
                      analytics_status="up"
                  />

                  <CarouselUiItem
                      title="New Requests"
                      total={15}
                      percentage="6%"
                      analytics_status="down"
                      chartColor='red'
                  />


                  <CarouselUiItem
                      title="Unread notifications"
                      total={15}
                      percentage="6%"
                      analytics_status="down"
                      chartColor='blue'
                  />
              </CarouselContent>
          </Carousel>
      </div>
  )
}
