import React, {Component} from 'react';

class Table1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns:[
                {key:"name", text:"İsim", sortable:true, searchable:true},
                {key:"age", text:"Yaş", sortable:true, searchable:true},
                {key:"email", text:"E-mail", sortable:false, searchable:true}
            ],
            data: [
                { name: 'Wasif', age: 25, email: 'wasif@email.com' },
                { name: 'Ali', age: 19, email: 'ali@email.com' },
                { age: 11, name: "Saad", email: 'saad@email.com' },
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

    tableHeader=()=>{
        this.state.columns.map((d,index)=>{
            return(<td key={d.key}>{d.text}</td>)
        })
    };

    getKeys=()=>{
        return Object.keys(this.state.data[0]);
    };

    render() {
        console.log(this.tableHeader);
        console.log(this.getKeys);
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            {this.tableHeader()}
                        </tr>
                    </thead>
                    <tbody>
                    {this.table}
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


export default Table1;