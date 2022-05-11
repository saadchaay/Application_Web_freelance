import React from 'react'
 
const Views = (props) => { 
    return( 
        <>
        <div className="col-xl-8">
        {/* Dashboard Box */}
            <div className="dashboard-box main-box-in-row">
                <div className="headline">
                    <h3><i className="icon-feather-bar-chart-2" /> Your Profile Views</h3>
                    <div className="sort-by">
                        <select className="selectpicker hide-tick">
                            <option>Last 6 Months</option>
                            <option>This Year</option>
                            <option>This Month</option>
                        </select>
                    </div>
                </div>
                <div className="content">
                {/* Chart */}
                    <div className="chart">
                        <canvas id="chart" width={100} height={45} />
                    </div>
                </div>
            </div>
            {/* Dashboard Box / End */}
        </div>
        </> 
    ) 
} 
export default Views