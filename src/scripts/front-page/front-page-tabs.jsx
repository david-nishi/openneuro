// dependencies -------------------------------------------------------

import React       from 'react';
import Reflux      from 'reflux';
import userStore   from '../user/user.store.js';

let FrontPageTabs = React.createClass({

    mixins: [Reflux.connect(userStore)],

// life cycle events --------------------------------------------------

    getInitialState () {
        return {
            currentTab: null
        };
    },

    render () {
        return (
            <div id="data-tabs">
                <ul className="nav nav-tabs">{this._tabs()}</ul>
                {this._tabContent(this.state.currentTab)}
            </div>
        );
    },

// template functions -------------------------------------------------------

    _tabs () {
        return this._tabData.map((tab, index) => {
            return (
                <li key={index}>
                    <div className={this.state.currentTab == index ? 'active thumbnail' : 'thumbnail'} onClick={this._showTabContent.bind(this, index)}>
                        <img src={tab.icon} alt={tab.header} />
                        <div className="caption">
                            <h3>{tab.header}</h3>
                            <p>{tab.abstract}</p>
                        </div>
                        <div className="more"><span className="text">{this.state.currentTab == index ? 'less': 'more'}</span></div>
                    </div>
                </li>
            );
        });
    },

// custom methods -------------------------------------------------------

    _tabContent (currentTab) {
        if (currentTab == null) {
            return false;
        } else {
            let tab = this._tabData[currentTab];
            return(
                <div className="tab-content">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="img-wrap"><img src={tab.firstImage} /></div>
                                <div className="caption">
                                    <h3>{tab.firstHeader}</h3>
                                    <p>{tab.firstDescription}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="img-wrap"><img src={tab.secondImage} /></div>
                                <div className="caption">
                                    <h3>{tab.secondHeader}</h3>
                                    <p>{tab.secondDescription}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    },

    _showTabContent (tab) {
        if (tab == this.state.currentTab) {
            this.setState({currentTab: null});
        } else {
            this.setState({currentTab: tab});
        }
    },

// data -----------------------------------------------------------------

    _tabData: [
        {
            header:            'Get Data',
            abstract:          'Browse and download datasets from contributors all over the world.',
            icon:              './assets/tab-get_data.png',
            firstHeader:       'Browse Data',
            firstDescription:  <span>Browse and explore public datasets and analyses from a wide range of global contributors. Our collection continues to grow as more and more datasets become <a href="http://bids.neuroimaging.io/">BIDS</a> compatible.</span>,
            firstImage:        './assets/tab-content_image.png',
            secondHeader:      'Download Data',
            secondDescription: 'Download and use public data to create new datasets and run your own analyses.',
            secondImage:       './assets/tab-content_image.png'
        },
        {
            header:            'Share Data',
            abstract:          'Upload your data and collaborate with your colleagues or share it with users around the world.',
            icon:              './assets/tab-share_data.png',
            firstHeader:       'Validate',
            firstDescription:  <span>Validate your datasets to assure they are <a href="http://bids.neuroimaging.io/">BIDS</a> compliant and compatible with our pipelines. This standardization means you can use anyone's data and know exactly what to expect.</span>,
            firstImage:        './assets/tab-content_image.png',
            secondHeader:      'Collaborate',
            secondDescription: 'Privately share your data so your colleagues can view and edit your work. Publish your datasets for anyone to view, download and run analyses on.',
            secondImage:       './assets/tab-content_image.png'
        },
        {
            header:            'Use Data',
            abstract:          'Use our available pipelines to process any data on the site.',
            icon:              './assets/tab-use_data.png',
            firstHeader:       'Snapshot',
            firstDescription:  'Create snapshots of your datasets to ensure past analyses remain reproducible as your datasets grow and change. Publish any of your snapshots while you continue work on your original data behind the scenes.',
            firstImage:        './assets/tab-content_image.png',
            secondHeader:      'Analyze',
            secondDescription: 'Use our simple web interface to run your analysis at TACC\'s high performance computing center. We\'ll notify you when it\'s complete so you can return to review the results.',
            secondImage:       './assets/tab-content_image.png'
        }
    ]
});

export default FrontPageTabs;
