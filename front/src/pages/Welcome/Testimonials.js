import React from 'react'
// import {useQuery} from "@apollo/react-hooks"
// import gql from "graphql-tag"
import Skeleton from 'react-loading-skeleton'

const Testimonials = (props) => {
    return(
        <>
            <div className="section gray padding-top-65 padding-bottom-55">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            {/* Section Headline */}
                            <div className="section-headline centered margin-top-0 margin-bottom-5">
                                <h3>Testimonials</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fullwidth-carousel-container margin-top-20">
                    <div className="testimonial-carousel testimonials">
                        <TestimonialItem loading/>
                        <TestimonialItem loading/>
                        <TestimonialItem loading/>
                        <TestimonialItem loading/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Testimonials

const TestimonialItem = (props) => {
    const {loading} = props
    if(loading){
        return(
            <>
            <div className="fw-carousel-review">
                <div className="testimonial-box">
                    <div className="testimonial-avatar">
                        <Skeleton circle width={70} height={70}/>
                    </div>
                    <div className="atestimonial-author">
                        <h4><Skeleton  width={300}/></h4>
                        <span><Skeleton width={140}/></span>
                    </div>
                    <div className="testimonial">
                        <Skeleton count={3}/>
                    </div>
                </div>
            </div>
            </>
        )
    }
    return(
        <>
        <div className="fw-carousel-review">
            <div className="testimonial-box">
                <div className="testimonial-avatar">
                    <img src="images/user-avatar-small-02.jpg" alt="" />
                </div>
                <div className="testimonial-author">
                    <h4>Sindy Forest</h4>
                    <span>Freelancer</span>
                </div>
                <div className="testimonial">Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.</div>
            </div>
        </div>
        </>
    )
}
