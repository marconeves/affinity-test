
import React from 'react'
import posed from "react-pose"

// ON AND OFF TRANSITIONS
const List = posed.div({
    open: { y: 0, opacity: 1, applyAtStart: { display: 'block' }, },
    closed: { y: 30, opacity: 0, applyAtEnd: { display: 'none' }, },
});

const Profile = posed.div({
    open: { y: 0, opacity: 1, applyAtStart: { display: 'block' }, },
    closed: { y: 30, opacity: 0, applyAtEnd: { display: 'none' }, },
});

class UserFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: [],
            showProfile: false,
            profileData: [],
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            filtered: this.props.items
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filtered: nextProps.items
        });
    }

    // SEARCH INPUT FUNCTION
    handleChange(e) {
        let currentList = [];
        let newList = [];

        if (e.target.value !== "") {
            currentList = this.props.items;

            newList = currentList.filter(item => {
                var nameComplete = item.first_name + " " + item.last_name;

                const lc = nameComplete.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lc.includes(filter);
            });
        } else {
            newList = this.props.items;
        }
        this.setState({
            filtered: newList
        });
    }

    // GO BACK BUTTON
    returnToList() {
        this.setState(() => ({
            showProfile: false,
            addClass: true,
        }));
    }

    // SHOW INDIVIDUAL USER INFO FUNCTION
    showUser(e) {
        this.setState(() => ({
            showProfile: true,
            addClass: true,
        }));

        let currentList = [];
        let newList = [];

        if (e.target.id !== "") {

            currentList = this.props.items;

            newList = currentList.filter(item => {
                return item.id === (e.target.id);

            });

            this.setState({
                profileData: newList,
            });
        } else {
            newList = this.state.filtered;
        }
    }

    // SHOW ONLY MALE
    filterMale() {

        let currentList = [];
        let newList = [];

            currentList = this.props.items;

            newList = currentList.filter(item => {
                return item.gender === 'male';

            });

            this.setState({
                filtered: newList,
            });
    }

    // SHOW ONLY FEMALE
    filterFemale() {

        let currentList = [];
        let newList = [];

        currentList = this.props.items;

        newList = currentList.filter(item => {
            return item.gender === 'female';

        });

        this.setState({
            filtered: newList,
        });
    }

    // FILTER BY AGE
    filterAge(e) {

        let currentList = [];
        let newList = [];

        if (e.target.textContent === "15-25") {

            currentList = this.props.items;

            newList = currentList.filter(item => {
                return item.dob <= '2005-01-01' && item.dob >= '1995-01-01';
            });

            this.setState({
                filtered: newList,
            });

        } else if (e.target.textContent === "26-35") {
            currentList = this.props.items;

            newList = currentList.filter(item => {
                return item.dob <= '1995-01-01' && item.dob >= '1985-01-01';
            });

            this.setState({
                filtered: newList,
            });
        } else if (e.target.textContent === "36-80") {
            currentList = this.props.items;

            newList = currentList.filter(item => {
                return item.dob <= '1985-01-01' && item.dob >= '1905-01-01';
            });

            this.setState({
                filtered: newList,
            });
        } else {
            newList = this.state.filtered;
        }

    }

    render() {
        return (
            <div>

                {/* USERS LIST */}
                <List id="list" pose={this.state.showProfile === true ? 'closed' : 'open'} >
                    <input type="text" className="input form-control" onChange={this.handleChange} placeholder="Search..." />
                    <div className="container">
                        <div className="row">
                            <div className="section-title">Users list</div>
                            <div className="mini-info">Click on the name to see the full profile</div>
                            <div className="filter-section">Show only &nbsp;
                                <span onClick={() => this.filterMale()}>Male</span>
                                <span onClick={() => this.filterFemale()}>Female</span>
                            </div>
                            <div className="filter-section">Age between &nbsp;
                                <span onClick={(e) => this.filterAge(e)}>15-25</span>
                                <span onClick={(e) => this.filterAge(e)}>26-35</span>
                                <span onClick={(e) => this.filterAge(e)}>36-80</span>
                            </div>
                            <li className="user-list-header">
                                <div className="thumbnail">
                                    #
                                </div>
                                <div className="user-info">Name &nbsp;</div>
                                <div className="user-info">Email &nbsp;</div>
                            </li>
                            <div className="user-list">
                                {this.state.filtered.map(item => (
                                    <li className="user" key={item.id}>
                                        <div className="thumbnail">
                                            <img src={item._links.avatar.href} alt="img"/>
                                        </div>
                                        <div className="user-info" id={item.id} onClick={(e) => this.showUser(e)}>{item.first_name}&nbsp;{item.last_name} </div>
                                        <div className="user-other-info">{item.email} &nbsp;</div>
                                    </li>
                                ))}
                            </div>
                        </div>
                    </div>
                </List>

                {/* INDIVIDUAL PROFILE */}
                <Profile className="container" id="profile" pose={this.state.showProfile === true ? 'open' : 'closed'} >
                    <div className="row">
                        <div className="button" onClick={() => this.returnToList()}>Go back</div>
                        <div className="user-list">
                            {this.state.profileData.map(item => (
                                <div className="user" key={item.id} onClick={(e) => this.showUser(e)}>
                                    <div className="profile-intro">
                                        <div className="thumbnail">
                                            <img src={item._links.avatar.href} alt="img"/>
                                        </div>
                                        <div className="user-info">{item.first_name}&nbsp;{item.last_name} </div>
                                    </div>
                                    <li className="user-list-header">
                                        <div className="user-info">More info</div>
                                    </li>
                                    <div className="user-other-info"><span>Email:&nbsp;</span>{item.email}</div>
                                    <div className="user-other-info"><span>Gender:&nbsp;</span>{item.gender}</div>
                                    <div className="user-other-info"><span>Dob:&nbsp;</span>{item.dob}</div>
                                    <div className="user-other-info"><span>Phone:&nbsp;</span>{item.phone}</div>
                                    <div className="user-other-info"><span>Website:&nbsp;</span>{item.website}</div>
                                    <div className="user-other-info"><span>Address:&nbsp;</span>{item.address}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Profile>


            </div>
        )
    }
}


export default UserFilters