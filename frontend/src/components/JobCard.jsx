import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


function JobCard(props) {
    return (
        //   <Card>
        //       <CardHeader>
        //           <CardTitle>Google</CardTitle>
        //           <CardDescription>India</CardDescription>
        //       </CardHeader>
        //       <CardContent>
        //           <CardTitle>Frontend Engineer</CardTitle>
        //           <p>This is a job posting looking to hire SDE-III</p>
        //       </CardContent>
        //       <CardFooter className='flex gap-2'>
        //           <div className='rounded-full border p-2 text-[#6A38C2]'>
        //               <p>10 Positions</p>
        //           </div>

        //           <div className='rounded-full border p-2 text-[#be2d5b]'>
        //               <p>FullTime</p>
        //           </div>

        //           <div className='rounded-full border p-2 text-[#2fe935]'>
        //               <p>30 LPA</p>
        //           </div>
        //       </CardFooter>
        //   </Card>


        <Card>
            <CardHeader>
                <CardTitle>{props.companyTitle}</CardTitle>
                <CardDescription>{props.location }</CardDescription>
            </CardHeader>
            <CardContent>
                <CardTitle>{props.role }</CardTitle>
                <p>{props.roleDescription }</p>
            </CardContent>
            <CardFooter className='flex gap-2'>
                <div className='rounded-full border p-2 text-[#6A38C2]'>
                    <p>{ props.positions}</p>
                </div>

                <div className='rounded-full border p-2 text-[#be2d5b]'>
                    <p>{ props.contract}</p>
                </div>

                <div className='rounded-full border p-2 text-[#2fe935]'>
                    <p>{ props.package}</p>
                </div>
            </CardFooter>
        </Card>
    )
}

export default JobCard