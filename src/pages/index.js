import * as React from "react"

import Layout from "../components/layout"

import ProjectBox from "../components/patterns/ProjectBox/ProjectBox";

export default function IndexPage() {
    return (
        <Layout>

            <div className="grid gap-4 mb-4 w-full">
                <div className="w-full">
                    <h1 className="text-8xl font-bold inline-block mb-4">
                        CrimsonMind<br/>
                    </h1>

                    <p className="text-2xl mb-6">
                        CrimsonMind was founded in 2024 by <a href="">Joe Buckle</a>, a software developer
                        with over 20 years of experience, primarily in the online
                        publishing sector, to explore how AI can transform both
                        business and personal life.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 mb-4 w-full">
                <div className="w-full">

                    <h3 className="text-4xl font-bold inline-block mb-6">
                        Why?<br/>
                    </h3>

                    <p className="text-2xl mb-6">
                        CrimsonMind emerged from a deep fascination
                        with the groundbreaking advancements in AI chat
                        technology and the boundless possibilities they
                        unlock. In this exciting phase of its infancy,
                        it offers an unparalleled canvas for exploration,
                        experimentation, and innovation.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 mb-4 h-screen w-full">
                <div className="w-full">

                    <h3 className="text-4xl font-bold inline-block mb-6">Projects</h3>

                    <div className="grid grid-cols-2 gap-8 w-full">
                        <ProjectBox link={"/projects/describe-image"} title={"Describe Image"}
                                    description={"Upload your image to see how AI describes it."}/>

                        <p className="text-2xl mb-6">
                            ... and more to come.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}