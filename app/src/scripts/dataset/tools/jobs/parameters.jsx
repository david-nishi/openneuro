import React from 'react';
import Select from 'react-select';

const JobParameters = ({parameters, subjects, onChange, onRestoreDefaults, parametersMetadata}) => {

    if (Object.keys(parameters).length === 0) {return <noscript />;}
    const parameterInputs = Object.keys(parameters).map((parameter) => {
        let input;
        if (parameter.indexOf('participant_label') > -1) {
            // Adapt the Select's onChange call to match the expected input event
            let onSelectChange = (value) => {
                // Extract list from Select's simpleValue
                let selected = value.split(',');
                let event = {target: {value: selected}};
                return onChange(parameter, event);
            };
            input = <Select multi simpleValue value={parameters[parameter]} placeholder="Select your subject(s)" options={subjects} onChange={onSelectChange} />;
        } else if(parametersMetadata[parameter].type === 'file') {
            input = <input className="form-control" 
                        type="file" 
                        name={parameter} 
                        onChange={onChange.bind(null, parameter)} />;
        } else if(parametersMetadata[parameter].type === 'checkbox') {
            let onCheckChange = (e) => {
                // using checked property for checkbox values
                let event = {target: {value: e.target.checked}};
                return onChange(parameter, event);
            };
            input = <input className="form-control"
                        type="checkbox"
                        name={parameter}
                        onChange={onCheckChange} />;
        } else {
            input = <input className="form-control"
                           value={parameters[parameter]}
                           onChange={onChange.bind(null, parameter)}/>;
        }
        return (
            <div className={parametersMetadata[parameter] && parametersMetadata[parameter].required ? 'required-param' : null} id={parametersMetadata[parameter].hidden ? 'hidden' :null} key={parameter}>
                <div className="parameters form-horizontal">
                    <div className="form-group" key={parameter}>
                        <label className="sr-only">{parameter}</label>
                        <div className="input-group">
                            <div className="input-group-addon">{parameter}</div>
                            <div className="clearfix">
                                {input}
                                <span className="help-text">{parametersMetadata[parameter] ? parametersMetadata[parameter].description: parameter}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div>
            <br /><hr /><br />
            <div className="row">
                <div className="col-xs-6">
                    <h5>Parameters</h5>
                </div>
                <div className="col-xs-6 default-reset">
                    <button className="btn-reset" onClick={onRestoreDefaults}>Restore Default Parameters</button>
                </div>
            </div>
            {parameterInputs}
        </div>
    );

};

JobParameters.propTypes = {
    onChange: React.PropTypes.func,
    onRestoreDefaults: React.PropTypes.func,
    parameters: React.PropTypes.object,
    parametersMetadata: React.PropTypes.object,
    subjects: React.PropTypes.array
};

JobParameters.defaultProps = {
    parameters: {},
    parametersMetadata: {}
};

export default JobParameters;
