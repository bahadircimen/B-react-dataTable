import React, {Component} from 'react';
import styles from './styles.scss';


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'Wasif', age: 21, email: 'wasif@email.com' },
                { name: 'Ali', age: 19, email: 'ali@email.com' },
                { name: 'Saad', age: 16, email: 'saad@email.com' },
                { name: 'Asad', age: 25, email: 'asad@email.com' },
                { name: 'alpkan', age: 21, email: 'wasif@email.com' },
                { name: 'barış', age: 19, email: 'ali@email.com' },
                { name: 'merve', age: 16, email: 'saad@email.com' },
                { name: 'bahadır', age: 25, email: 'asad@email.com' },
                { name: 'kenan', age: 21, email: 'wasif@email.com' },
                { name: 'tanzer', age: 19, email: 'ali@email.com' },
                { name: 'ruken', age: 16, email: 'saad@email.com' },
                { name: 'berk', age: 25, email: 'asad@email.com' },
                { name: 'serkan', age: 25, email: 'asad@email.com' },

            ]
        }
    }

    getKeys = () =>{
        return Object.keys(this.state.data[0]);
    };

    getHeader = () =>{
        let keys = this.getKeys();
        return keys.map((key, index)=>{
            return <th key={key}>{key.toUpperCase()}</th>
        })
    };

    tableData() {
        return this.state.data.map((d, index) => {
            return (
                <tr key={index}>
                    <td>{d.name}</td>
                    <td>{d.age}</td>
                    <td>{d.email}</td>
                    <td>{index}</td>
                </tr>
            )
        })
    }


    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            {this.getHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.tableData()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;