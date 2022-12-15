
import classes from "./Profile.module.css";

export default function Profile(props) {
    return (
        <section className="ph3 ph5-ns pv5">
            <article className="mw8 center br2 ba b--light-blue bg-lightest-blue">
                <div className="dt-ns relative dt--fixed-ns w-100">
                    <div className="pa3 pa4-ns dtc-ns v-mid">
                        <button
                            onClick={props.onClose}
                            type="button"
                            className={classes.close}
                        >
                            X
                        </button>
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
                        <a
                        href=""
                            onClick={props.onButtonClick}
                            className="no-underline f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br2"
                        >
                            Complete Profile
                        </a>
                    </div>
                </div>
            </article>
        </section>
    );
}
