import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
const Category = () => {
  const categories = [
    "web developer",
    "flutter developer",
    "react js ",
    "full stack developer",
    "Laravel developer",
    "nextjs developer",
    "react native",
  ];
  return (
    <div className="py-12 w-full mx-auto flex justify-center items-center">
      <Carousel className="w-full max-w-lg">
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
              <Button className="bg-orange-600 flex items-center justify-center text-white rounded-full hover:bg-orange-800">
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
export default Category;
