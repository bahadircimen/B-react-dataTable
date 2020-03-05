import React, {Component} from 'react';
import styles from "./styles.scss";
import store from "../../store";

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    PageSizes=()=>{
        let ps=[5,10,20,40,60,100]
        return ps.map((d,index)=>{
            return <button key={index} value={d} onClick={this.props.changePageSize}>{d}</button>
        })
    };

    totalPage=()=>{
        return Math.ceil(this.props.totalCount / this.props.pageSize);
    };

    createButton=()=>{
        let pg=[];
        for(let i=1; i<this.totalPage()+1; i++)
            pg.push(i);
        let a=pg.slice(this.props.page-1,this.props.page-1+2);
        let b=pg.slice(this.props.page-2,this.totalPage());
        let c=pg.slice(this.totalPage()-4,this.totalPage());
        let d=pg.slice(this.props.page-2,this.props.page-1+2);
        let e=pg.slice(this.totalPage()-3,this.totalPage());
        let f=pg.slice(this.totalPage()-2,this.totalPage());
        let g=pg.slice(this.totalPage()-1,this.totalPage());
        if(this.props.page*1<=this.totalPage()-4&&this.props.page*1===1){
        return a.map(d=>{
            return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
        });
        }

        else if(this.props.page*1===this.totalPage()-3){
            return b.map(d=>{
                return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
            });
        }

        else if(this.props.page*1<=this.totalPage()-4&&this.props.page*1>1){
            return d.map(d=>{
                return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
            });
        }

        else if(this.totalPage()===4){return c.map(d=>{
            return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
        });
        }

        else if(this.totalPage()===3){return e.map(d=>{
            return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
        });
        }

        else if(this.totalPage()===2){return f.map(d=>{
            return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
        });
        }

        else if(this.totalPage()===1){return g.map(d=>{
            return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
        });
        }

        else{
            return c.map(d=>{
                return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
            });
        }


    };

    render() {
        console.log(this.totalPage())
        return (
            <div>
                <div className={styles.pagination}>
                    {this.props.page*1===1
                        ?<button disabled style={{cursor:"not-allowed"}} key="leftBtn"><i className="fas fa-angle-double-left"/></button>
                        :<button key="leftBtn" onClick={this.props.changePageDown}><i className="fas fa-angle-double-left"/></button>
                    }
                    {this.createButton()}
                    {this.props.page*1<this.totalPage()-3?<button key="...">...</button>:null}
                    {this.props.page*1<this.totalPage()-3?<button onClick={this.props.changePage} key={this.totalPage()} value={this.totalPage()}>{this.totalPage()}</button>:null}
                    {this.props.page*1===this.totalPage()*1
                        ?<button disabled style={{cursor:"not-allowed"}} key="rightBtn"><i className="fas fa-angle-double-right"/></button>
                        :<button key="rightBtn" onClick={this.props.changePageUp}><i className="fas fa-angle-double-right"/></button>
                    }
                    Page:{this.props.page}
                </div>
                <div className={styles.pageSize}>
                    Page Size:{this.PageSizes()}
                </div>
            </div>
        );
    }
}

export default Pagination;