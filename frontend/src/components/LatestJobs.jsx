import React from 'react'
import JobCard from './JobCard'

function LatestJobs() {
    const jobs = [
        {
            role: 'Frontend Developer',
            roleDescription: 'This is a job posting looking to hire SDE-III',
            positions: '10 Positions',
            contract: 'FullTime',
            companyTitle: 'Google',
            location: 'Remote',
            package: '100k'

        },
        {
            role: 'Frontend Developer',
            roleDescription: 'This is a job posting looking to hire SDE-III',
            positions: '10 Positions',
            contract: 'FullTime',
            companyTitle: 'Google',
            location: 'Remote',
            package: '100k'

        },
        {
            role: 'Frontend Developer',
            roleDescription: 'This is a job posting looking to hire SDE-III',
            positions: '10 Positions',
            contract: 'FullTime',
            companyTitle: 'Google',
            location: 'Remote',
            package: '100k'

        },
        {
            role: 'Frontend Developer',
            roleDescription: 'This is a job posting looking to hire SDE-III',
            positions: '10 Positions',
            contract: 'FullTime',
            companyTitle: 'Google',
            location: 'Remote',
            package: '100k'

        },
        {
            role: 'Frontend Developer',
            roleDescription: 'This is a job posting looking to hire SDE-III',
            positions: '10 Positions',
            contract: 'FullTime',
            companyTitle: 'Google',
            location: 'Remote',
            package: '100k'

        },
        {
            role: 'Frontend Developer',
            roleDescription: 'This is a job posting looking to hire SDE-III',
            positions: '10 Positions',
            contract: 'FullTime',
            companyTitle: 'Google',
            location: 'Remote',
            package: '100k'

        },
        
        
    ]
    return (

        <div className='flex flex-col py-10'>
            
            <h2 className='mx-20 font-bold text-3xl my-5'><span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-20'>
                {
                    jobs.map((job, index) => (
                        <JobCard key={index} companyTitle={job.companyTitle} location={job.location} role={job.role} roleDescription={ job.roleDescription} positions={job.positions} contract={job.contract} package={job.package} />
                    ))
                }

            </div>
            
        </div>
    )
}

export default LatestJobs