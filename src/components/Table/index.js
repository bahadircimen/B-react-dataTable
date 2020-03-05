import React, {Component} from 'react';
import styles from "./styles.scss";
import image from './sort.png';
import Pagination from "../Pagination";
class Table extends Component {
    constructor(props) {
        super(props);
        if(!props.columns.every((el) => "key" in el))
            console.warn("missing key");
        this.state = {
            text:"",
            sortOrder:"",
            sortText:"",
            sortImg:"",
            theme:""
        }
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

    renderTableHeader = (event) => {
        return this.props.columns.map(d => {
            console.log(d.key);
            return(
            d.sortable===true
                ?
                <td key={d.key} onClick={this.sortChange}>{d.key.toUpperCase()}
                <span>
                    {d.key===this.state.sortText ?
                <i data-key={d.key} className={"fas fa-sort"+this.state.sortImg+" fa-xs"}/>:
                        <i data-key={d.key} className={"fas fa-sort fa-xs"}/>}
                </span>
                </td>
                :
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

    compare=(key, order = "desc")=> {
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
        let nextSort;
        let sortimg;
        if(event.target.getAttribute("data-key")!==this.state.sortText){nextSort = "asc"; sortimg="-down"}
        else if(event.target.getAttribute("data-key")===this.state.sortText && this.state.sortOrder==="asc") {nextSort= "desc"; sortimg="-up"}
        else if(event.target.getAttribute("data-key")===this.state.sortText && this.state.sortOrder==="desc"){nextSort="asc"; sortimg="-down"}
        this.setState({
            sortImg: sortimg,sortOrder: nextSort,sortText: event.target.getAttribute("data-key")
        })
    };

    textSubmit=(event)=> {
        event.preventDefault();
    };

    textChange=(event)=> {
        this.setState({text: event.target.value.toUpperCase()});
        event.preventDefault();
    };

    changeTheme = (event) =>{
        this.setState({
            theme: event.target.value
        })
    };
    //
    // createCookie=(cookieName,cookieValue,daysToExpire)=>
    // {
    //     let {getTime, setTime, toGMTString} = new Date();
    //     setTime(getTime()+(daysToExpire*24*60*60*1000));
    //     document.cookie = cookieName + "=" + cookieValue + "; expires=" + toGMTString();
    // };
    // accessCookie=(cookieName)=>
    // {
    //     let name = cookieName + "=";
    //     let allCookieArray = document.cookie.split(';');
    //     for(let i=0; i<allCookieArray.length; i++)
    //     {
    //         let temp = allCookieArray[i].trim();
    //         if (temp.indexOf(name)===0)
    //             return temp.substring(name.length,temp.length);
    //     }
    //     return "";
    // };
    //
    // checkCookie=()=>
    // {
    //     let theme = this.accessCookie("themeCookie");
    //     theme===""||theme!==this.state.theme ?this.createCookie("themeCookie", [this.state.theme], 1):null;
    // };

    checkTheme=()=>{
        return this.state.theme||"";
    };

    render() {
        return (
            <div id="div" className={"src-components-Table-___styles__"+this.checkTheme()+"___2bhYl"}>
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
                <Pagination
                    pageSize={this.props.pageSize}
                    totalCount={this.props.totalCount}
                    changePage={this.props.changePage}
                    changePageUp={this.props.changePageUp}
                    changePageDown={this.props.changePageDown}
                    changePageSize={this.props.changePageSize}
                    page={this.props.page}
                />
                <span>Showing {this.props.page*10-9} to {this.props.page*10} of {this.props.totalCount} entries.</span>
                <div>
                    <select name="" id="theme" onChange={this.changeTheme}>
                        <option value="selectTheme">Select Theme</option>
                        <option value="">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default Table;