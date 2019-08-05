import React, {Component} from 'react';
import './App.css';
import UserFilters from './components/UserFilters';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount() {

       fetch('https://gorest.co.in/public-api/users', {

           method: 'get',
           headers: new Headers({
               'Authorization': 'Bearer eoxf6VjfPv8TAOTUyfiYqBppy88-vSQXEeLi',
           }),
       })
           .then(res => res.json())
           .then(
               (data) => {
                   this.setState({
                       isLoaded: true,
                       list: data.result
                   });
               },

               (error) => {
                   this.setState({
                       isLoaded: true,
                       error
                   });
               }
           )

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <section className="section">
                        <div className="title">Lista pesquisável com nome e thumb de utilizadores</div>
                        <UserFilters className="col" items={this.state.list} />
                    </section>
                </div>
            </div>
        );
    }
}

export default App;