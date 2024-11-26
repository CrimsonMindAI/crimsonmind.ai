import * as React from "react"
import Layout from "../components/layout"

export default function ContactPage() {
    return (
        <Layout>

            <div className="grid gap-4 mb-4 w-full">
                <div className="w-full">
                    <h1 className="text-4xl inline-block mb-4">
                        Contact<br/>
                    </h1>

                    <p className="text-2xl mb-6">
                        CrimsonMind was created by Joe Buckle from&nbsp;
                        <a href="https://white-fire.co.uk" target="_blank">
                            White Fire Web Design
                        </a>,
                        a web development company based in the UK.
                    </p>

                    <p className="text-2xl mb-6">
                        For all enquiries, please contact us at&nbsp;
                        <a href="mailto:hello@white-fire.co.uk">hello@white-fire.co.uk</a>.
                    </p>
                </div>
            </div>

        </Layout>
    )
}