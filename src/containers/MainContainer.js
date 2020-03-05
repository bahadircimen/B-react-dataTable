import React, {Component, Fragment} from 'react';
import Table from "../components/Table";
import styles from "./styles.scss";
import store from "../store";
import Axios from "axios";

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
            theme:"dark",
        }
    }

    changePageUp=()=>{
       this.setState({page:this.state.page*1+1})
    };

    changePageDown=()=>{
        this.setState({page:this.state.page-1})
    };

    changePage=(event)=>{
        this.setState({page:event.target.value})
    };

    changePageSize=(event)=>{
        let page=((this.state.page*1)*(this.state.pageSize*1))-(this.state.pageSize*1)+1;
        this.setState({pageSize:event.target.value*1},()=>
                    this.setState({page:Math.ceil(page/(this.state.pageSize*1))})
        );
    };

   /* changePageSize=(event)=>{
        let page=(this.state.page*1)*(this.state.pageSize*1);
        this.setState(prevState=>
            ({pageSize:event.target.value},()=>
                this.setState(this.state.pageSize>=prevState.pageSize
                    ?{page:Math.ceil(page/(this.state.pageSize*1))}
                    :{page:Math.floor(page/(this.state.pageSize*1))}
                    )
            )
        );
    };*/

    async componentDidMount() {
        let url="http://jsonplaceholder.typicode.com/posts";
        Axios.get(url, {
            params: {
                _start: (this.state.page-1)*this.state.pageSize,
                _limit:this.state.pageSize*1
            }
        }).then(obj => {
            let data = obj.data;
            this.setState({data:data})
        });
        }



    /*async componentDidMount() {
        this.mounted = true;
        let res = await store.getOtherData({
			pageSize: this.state.pageSize,
            page: this.state.page
		});
            //.catch((err) => {
             //   console.error({err});
            //});
        //console.log(res.headers["x-total-count"]);
        if(res && res.data && this.mounted){
            let data = res.data;
            this.setState({data: data})
        }

        this.setState({totalCount:res.headers["x-total-count"]})



        // store.getOtherData()
        // 	.then((res)=>{
        // 		this.setState({data: res.data})
        // 		console.log(res);
        // 	})
        // 	.catch((err)=>{
        // 		console.log(err);
        // 	});
    }*/

    componentDidUpdate(prevProps, prevState) {
    this.state.page !== prevState.page||this.state.pageSize!==prevState.pageSize? this.componentDidMount():null

    }

    componentWillUnmount() {
        this.mounted = false;

    }


    render() {
        return (
            <Fragment>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.colMd9}>
                            <Table
                                pageSize={this.state.pageSize}
                                totalCount={this.state.totalCount}
                                page={this.state.page}
                                changePage={this.changePage}
                                changePageUp={this.changePageUp}
                                changePageDown={this.changePageDown}
                                changePageSize={this.changePageSize}
                                theme={this.state.theme}
                                data={this.state.data}
                                columns={this.state.columns}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MainContainer;
