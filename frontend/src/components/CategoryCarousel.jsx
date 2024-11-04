import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const category = [
    "Frontnd Developer",
    "Backend Developer",
    "Data Scientist",
    "Graphic Designer",
    "Full Stack Developer",
]

function CategoryCarousel() {
    return (
        <div>
            <Carousel className='w-full max-w-xl mx-auto my-20'>
                <CarouselContent>
                    {
                        category.map((category, index) => (
                            <CarouselItem className='md:basis-1/2 lg-basis-1/3'>
                                <Button variant='outline' className='rounded-full'>
                                    {category}
                                </Button>
                            </CarouselItem>

                        ))
                    }

                </CarouselContent>
                <CarouselPrevious />
               <CarouselNext/>
            </Carousel>
        </div>
    )
}

export default CategoryCarousel