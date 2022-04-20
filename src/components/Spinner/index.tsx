import './spinner.css'

const Spinner = () => {
    return (
        <div className="loaderparent">
            <div className="loaderimg" style={{ backgroundImage: "url(/static/images/loader.gif)" }}></div>
            <div className="loadermsg">Please wait...<br />We are working on your request.</div>
        </div>
    );
};

export default Spinner;
