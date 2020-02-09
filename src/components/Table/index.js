import React, {Component} from 'react';
import styles from './styles.scss';

const RenderData = (state) =>{
    return state.keys.map((key)=>{
        return <td key={state.data[key]}>{state.data[key]}</td>
    })
};

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

            ],
        }
    }

    /*****dynamic   column 2**/
    tableValues = () => {
            return Object.values(this.state.data);
    };

    tableA = () => {
        return this.tableValues().map((d,index) => {
            return (
                    <td key={index}>{d}</td>
            )
        })
    };

    tableKeys = () => {
        return Object.keys(this.state.data[0]);
    };

    tableHeader = () => {
        return this.tableKeys().map((key) => {
            return <th key={key}>{key.toUpperCase()}</th>
        })
    };

    /**manuel column
     tableData = () => {
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
    }; */

    tableData = () => {
        return this.state.data.map((d, index)=>{
            return <tr key={index}>
                <RenderData key={index} data={d} keys={this.tableKeys()} />
            </tr>
        })
    };

    /****tableB = () => {
        return this.state.data.map((d,index)=> {
            return (
                <tr key={index}>
                    <td>{this.tableKeys().map}</td>
                </tr>
            )
        })
    };
*/

    render() {
        console.log(this.tableA());
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            {this.tableHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.tableData()}
                    </tbody>
                    <tfoot>
                    <tr>
                        {this.tableHeader()}
                    </tr>
                    </tfoot>
                </table>
                    Showing {this.state.data.length} entries.
            </div>
        );
    }
}

export default Table;
