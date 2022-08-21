import React from 'react';
import { getProjects } from '../service';

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        getProjects()
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        items: response.data
                    });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
        }
    

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading... </div>
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.title}  {new Date(item.created_at).toLocaleString()}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}


export default Project;