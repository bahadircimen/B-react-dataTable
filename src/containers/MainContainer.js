import React, {Component, Fragment} from 'react';
import Table from "../components/Table";
import styles from "./styles.scss";
import store from "../store";
import Axios from "axios";
import Pagination from "../components/Pagination";
import Card from "../components/Card";

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {key: "id", sortable: true, searchable: true},
                {key: "title", sortable: true, searchable: true},
                {key: "body", sortable: false, searchable: true}
            ],
            data: [],
            totalCount:"100",
            page:"1",
            pageSize:"10",
            theme:"light",
        }
    }

    changeTheme = (event) =>{
        this.setState({
            theme: event.target.value
        })
    };

    changePageUp=()=>{
       this.setState({page:this.state.page*1+1})
    };

    changePageDown=()=>{
        this.setState({page:this.state.page-1})
    };

    changePage=(change, isPageNumber = false)=>{
        let {page} = this.state;
        this.setState({ page: isPageNumber ? change : page + change });


        // let val=event.target.value;
        // console.log(val);
        // if (val===null)
        // this.setState({page:this.state.page-1});
        // else if (val==="rightBtn")
        // this.setState({page:this.state.page*1+1});
        // else
        // this.setState({page:event.target.value})
    };

    changePageSize=(event)=>{
        this.setState({pageSize:event.target.value, page:1});
    };

    async componentDidMount() {
        let res = await store.getOtherData({page: this.state.page, pageSize: this.state.pageSize});
        let totalCount = res.headers["x-total-count"];
        let data = res.data;
        this.setState({data, totalCount})
    }
    // async componentDidMount() {
    //     let res = await store.getData();
    //     let data = res.data;
    //     this.setState({data});
    // }



    componentDidUpdate(prevProps, prevState) {
    this.state.page !== prevState.page||this.state.pageSize!==prevState.pageSize? this.componentDidMount():null

    }

    componentWillUnmount() {
        this.mounted = false;

    }

    render() {
        console.log(this.state.data)
        let {theme} = this.state;
        return (
            <Fragment>
                <div className={styles[`container${theme}`]}>
                    <div className={styles.row}>
                        <div className={styles.colMd9}>
                            <Table
                                theme={this.state.theme}
                                changeTheme={this.changeTheme}
                                data={this.state.data}
                                columns={this.state.columns}
                            />
                            <Pagination
                                page={this.state.page}
                                pageSize={this.state.pageSize}
                                totalCount={this.state.totalCount}
                                changePage={this.changePage}
                                changePageUp={this.changePageUp}
                                changePageDown={this.changePageDown}
                                changePageSize={this.changePageSize}
                            />
                        </div>
                            {/*{*/}
                            {/*    this.state.data.map((d,index)=>{*/}
                            {/*        return <div key={d.id} className={styles.colMd3}>*/}
                            {/*            <Card*/}
                            {/*                author={d.author}*/}
                            {/*                download_url={d.download_url}*/}
                            {/*                width={d.width}*/}
                            {/*                height={d.height}*/}
                            {/*            />*/}
                            {/*        </div>*/}
                            {/*    })*/}
                            {/*}*/}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MainContainer;
