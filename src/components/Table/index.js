import React, {Component} from 'react';
import styles from "./styles.scss";
import image from './sort.png';
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:"",
            sortOrder:"asc",
            sortText:"",
            css:"./styles.scss"
        }
    }
    selectTheme=()=>{
        let d= document.getElementById("theme").value;
        if(d!="renk secin"){document.bgColor=d;
        document.cookie="theme = "+d+"experies = Sun, 15 Jul 2025 00:00:01 GMT"}

    }

    tableValues = () => {
        let arr = [];
        this.props.data.sort(this.compare(this.state.sortText,this.state.sortOrder)).map((row) => {
            let rowData = [];
            this.props.columns.map((column) => {
                rowData.push({
                    key: column.key,
                    sortable: column.sortable,
                    searchable: column.searchable,
                    texts: row[column.key]
                })
            });
            arr.push(rowData);
        });
        return arr
    };

    renderTableHeader = () => {
        return this.props.columns.map(d => {
            return(
            d.sortable===true ?
                <td key={d.key} onClick={this.sortChange} >{d.key.toUpperCase()}<span id={d.key}><img id={d.key}
                    src={image}/>
                </span></td> :
                <td key={d.key}>{d.key.toUpperCase()}</td>
        )
        })
    };

    tableSearch = () => {
        return this.tableValues().filter((row)=>{
            return row.some((cell)=>{
                return cell.searchable===true&&cell.texts.toString().toUpperCase().includes(this.state.text)
            })
        })
    };

    renderTableBody=()=>{
        return this.tableSearch().map((row,index)=>{
            return (<tr key={index}>
                {row.map(cell=>{
                    return <td key={cell.key}>
                        {cell.texts}
                    </td>
                })}
            </tr>);
        })

    };

    compare=(key, order)=> {
        return  (a, b)=> {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }
            const keyA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const keyB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (keyA > keyB) {
                comparison = 1;
            } else if (keyA < keyB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    };

    sortChange = (event) => {
        const { sortOrder } = this.state;
        let nextSort;
        sortOrder === "asc" ? nextSort = "desc" : nextSort= "asc";
        this.setState({
            sortOrder: nextSort,sortText: event.target.id
        })
    };

    textSubmit=(event)=> {
        event.preventDefault();
    };

    textChange=(event)=> {
        this.setState({text: event.target.value.toUpperCase()});
        event.preventDefault();
    };

    render() {
        return (
            <div>
                <form onSubmit={this.textSubmit}>
                    <label>
                        Search:
                        <input type="text" value={this.state.text} onChange={this.textChange} />
                    </label>
                </form>
                <table>
                    <thead>
                    <tr>
                        {this.renderTableHeader()}

                    </tr>
                    </thead>
                    <tbody>
                        {this.renderTableBody()}
                    </tbody>
                    <tfoot>
                    <tr>
                        {this.renderTableHeader()}
                    </tr>
                    </tfoot>
                </table>
                Showing {this.props.data.length} entries.
            </div>
        );
    }
}

export default Table;