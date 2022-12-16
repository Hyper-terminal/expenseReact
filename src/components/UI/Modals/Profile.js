export default function Profile(props) {

    const clickHandler = () => {
        props.onClick()
    }

    return (
        <section className="ph3 ph5-ns pv5">
            <article className="mw8 center br2 ba b--light-blue bg-lightest-blue">
                <div className="dt-ns dt--fixed-ns w-100">
                    <div className="pa3 pa4-ns dtc-ns v-mid">

                        <div>
                            <h2 className="fw4 blue mt0 mb3">
                                Profile Incomplete{" "}
                            </h2>
                            <p className="black-70 measure lh-copy mv0">
                                Your profile is incomplete! Please complete it
                                by clicking on the link.
                            </p>
                        </div>
                    </div>
                    <div className="pa3 relative pa4-ns dtc-ns v-mid">
                        <div
                            onClick={clickHandler}
                            className="no-underline pointer f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br2"
                        >
                            Complete Profile
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
}
