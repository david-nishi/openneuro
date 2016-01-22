// dependencies -------------------------------------------------------

import React      from 'react';
import Reflux     from 'reflux';
import adminStore from './admin.store';
import actions    from './admin.actions';
import Input      from '../common/forms/input.jsx';
import {Panel}    from 'react-bootstrap';
import WarnButton from '../common/forms/warn-button.jsx';

let Blacklist = React.createClass({

	mixins: [Reflux.connect(adminStore)],

// life cycle events --------------------------------------------------

	render() {
		let showDeleteBtn = this.state.showDeleteBtn;
		let blacklistForm = this.state.blacklistForm;
		let noBlacklist = <div className="no-results">There are no blocked users</div>;
		let users = this.state.blacklist.map((user, index) => {

			return (
			    <div className="fadeIn user-panel clearfix" key={user._id}>
                    <div className="col-xs-5 user-col">
                    	<h3>
                    		<div className="userName">
								<span>{user.firstname}</span> &nbsp;
								<span>{user.lastname}</span>
							</div>
                    	</h3>
                    	<h3 className="user-email">{user._id}</h3>
                    </div>
                    <div className="col-xs-5 user-col">
	                    <div>{user.note}</div>
                    </div>
                    <div className="col-xs-2 last admin-tools-bar">
	                <div className="tools clearfix">
	                    <div className="tool">
		                    <WarnButton message="Unblock this User" className="btn btn-admin warning" confirm="Yes Unblock" action={actions.unBlacklistUser.bind(this, user._id)} />
	                    </div>
                    </div>
                    </div>
                    
                </div>
			);
		});

		return (
			<div className="panel-teasers-list fadeIn inner-route admin-blacklist clearfix">
				<h2>Blocked Users</h2>
				<button className="btn-blue" onClick={actions.blacklistModal} >
					<span>Block a User</span>
				</button>
				<div>
					<div className="col-xs-12 users-panel-wrap ">
						<div className="fadeIn user-panel-header clearfix" >
							<div className="col-xs-5 user-col"><label>User</label></div>
		                    <div className="col-xs-5 user-col"><label>Notes</label></div>
		                    <div className="col-xs-2 user-col"><label>Actions</label></div>
	                	</div>
	                    {this.state.blacklist.length == 0 ? noBlacklist : users}
					</div>
				</div>
			</div>
    	);
	},

// custom methods -----------------------------------------------------

	_blacklistError() {
		return this.state.blacklistError ? <div className="alert alert-danger">{this.state.blacklistError}</div> : null;
	},

	_inputChange (e) {actions.inputChange('blacklistForm', e.target.name, e.target.value);},

});

export default Blacklist;