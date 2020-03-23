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
        let ps=[10,20,40,60,100];
        return <select name="" id="" onChange={this.props.changePageSize}> {
            ps.map((d,index)=>{
            return <option key={index} value={d}>{d}</option>
        })
        }
        </select>
    };

    totalPage=()=>{
        return Math.ceil(this.props.totalCount / this.props.pageSize);
    };

    createButton=()=>{
      let pg=[];
      for(let i=1; i<this.totalPage()+1; i++)
          pg.push(i);
      let a=pg.slice(1,5);
      let b=pg.slice(this.props.page-2,this.props.page-1+2);
      let c=pg.slice(this.totalPage()-5,this.totalPage());
      let d=pg.slice(1,this.totalPage());

        if(this.totalPage()>=8&&this.props.page<4){
            return a.map(d=>{
                return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
            });
        }
        else if(this.totalPage()>=8&&this.props.page<this.totalPage()-3){
            return b.map(d=>{
                return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
            });
        }

        else if(this.totalPage()>=8&&this.props.page*1>=this.totalPage()-4){
            return c.map(d=>{
                return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
            });
        }

        else{
            return d.map(d=>{
                return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
            });
        }
    };

    // createButton=()=>{
    //     let pg=[];
    //     for(let i=1; i<this.totalPage()+1; i++)
    //         pg.push(i);
    //     let a=pg.slice(this.props.page-1,this.props.page-1+2);
    //     let b=pg.slice(this.props.page-2,this.totalPage());
    //     let c=pg.slice(this.totalPage()-4,this.totalPage());
    //     let d=pg.slice(this.props.page-2,this.props.page-1+2);
    //     let e=pg.slice(this.totalPage()-3,this.totalPage());
    //     let f=pg.slice(this.totalPage()-2,this.totalPage());
    //     let g=pg.slice(this.totalPage()-1,this.totalPage());
    //     if(this.props.page*1<=this.totalPage()-4&&this.props.page*1===1){
    //     return a.map(d=>{
    //         return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
    //     });
    //     }
    //
    //     else if(this.props.page*1===this.totalPage()-3){
    //         return b.map(d=>{
    //             return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
    //         });
    //     }
    //
    //     else if(this.props.page*1<=this.totalPage()-4&&this.props.page*1>1){
    //         return d.map(d=>{
    //             return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
    //         });
    //     }
    //
    //     else if(this.totalPage()===4){return c.map(d=>{
    //         return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
    //     });
    //     }
    //
    //     else if(this.totalPage()===3){return e.map(d=>{
    //         return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
    //     });
    //     }
    //
    //     else if(this.totalPage()===2){return f.map(d=>{
    //         return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
    //     });
    //     }
    //
    //     else if(this.totalPage()===1){return g.map(d=>{
    //         return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
    //     });
    //     }
    //
    //     else{
    //         return c.map(d=>{
    //             return <button onClick={this.props.changePage} value={d} key={d}>{d}</button>
    //         });
    //     }
    //
    //
    // };

    render() {
        return (
            <div>
                <span>Showing {this.props.page*this.props.pageSize-(this.props.pageSize-1)} to {this.props.page*this.props.pageSize<=this.props.totalCount?this.props.page*this.props.pageSize:this.props.totalCount} of {this.props.totalCount} entries.</span>
                <div className={styles.pagination}>
                    Page:{this.props.page}
                    {this.props.page*1===1
                        ?<button disabled style={{cursor:"not-allowed"}} key="leftBtn" value="leftBtn"><i className="fas fa-angle-double-left"/></button>
                        :<button key="leftBtn" value="leftBtn" onClick={() => this.props.changePage(-1)}><i className="fas fa-angle-double-left"/></button>
                    }
                    {<button onClick={this.props.changePage} key={1} value={1}>{1}</button>}
                    {this.totalPage()>=8&&this.props.page>=4?<button key="f1">...</button>:null}
                    {this.createButton()}
                    {this.totalPage()>=7&&this.props.page*1 <= this.totalPage()-4 ? <button key="f2">...</button> : null}
                    {this.totalPage()>=7&&this.props.page*1<this.totalPage()-3?<button onClick={() => this.props.changePage(this.totalPage(), true)} key={this.totalPage()} value={this.totalPage()}>{this.totalPage()}</button>:null}
                    {this.props.page*1===this.totalPage()*1
                        ?<button disabled style={{cursor:"not-allowed"}} key="rightBtn" value="rightBtn"><i className="fas fa-angle-double-right"/></button>
                        :<button key="rightBtn" value="rightBtn" onClick={() => this.props.changePage(1)}><i className="fas fa-angle-double-right"/></button>
                    }
                </div>
                <div className={styles.pageSize}>
                    Page Size:{this.PageSizes()}
                </div>
            </div>
        );
    }
}

export default Pagination;
